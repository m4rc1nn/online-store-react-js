import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
let cart = require('../components/CartComponent/CartModule');

const Container = styled.div`
    margin: auto;
    margin-top: 50px;
    width: 70%;
    display: flex;
    color: #000;
`
const ImageContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MoreImage = styled.div`
    min-width: 150px;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const SmallImage = styled.img`
    width: 150px;
    height: 150px;
    background-color: #ccc;
`

const MainImage = styled.img`
    max-width: 75%;
`

const Content = styled.div`
    width: 50%;
    padding: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Title = styled.span`
    font-size: 2.5em;
    font-weight: 700;
`

const Brand  = styled.span`
    font-size: 1em;
    font-weight: 900;
    color: #888;
`

const Price  = styled.span`
    font-size: 2em;
    font-weight: 900;
    color: #888;
`

const Description = styled.p`
    margin-top: 50px;
    font-size: 1.2em;
    color: #222;
`

const SizePicker = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Size = styled.div`
    background-color: ${props => props.bgColor};
    border: 1px solid ${props => props.borderColor};
    color: ${props => props.fontColor};
    margin: 0 10px;
    padding: 5px;
    font-size: 1.4em;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        cursor: pointer;
        border: 1px solid #222;
    }
`

const ButtonContainer = styled.div`
    margin-top: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SizeInfo = styled.span`
    font-size: 1em;
    color: #000;
    margin: auto;
`

const Button = styled.div`
`

function kebabCase(text){
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
}


class Product extends Component {
    state = {
        itemId: 0,
        itemName: '',
        itemBrand: '',
        itemDescription: '',
        itemCategory: '',
        itemPrice: 0,
        itemDiscount: 0,
        itemSizes: new Map(),
        itemImages: [],
        pickedSize: '',
        sizeInfo: '',

    }    

    pickSize(size){
        this.setState({pickedSize: size})
        if(this.state.itemSizes.get(size) <= 5){
            this.setState({sizeInfo: 'Zostało mało sztuk tego rozmiaru.'});
        } else {
            this.setState({sizeInfo: ''});
        }
    }

    addToCart(){
        if(this.state.pickedSize != ''){
            cart.addItem(this.state.itemId, this.state.itemName, this.state.pickedSize, this.state.itemDiscount > 0 ? this.state.itemDiscount : this.state.itemPrice, 1, this.state.itemImages[0]);
        } 
    }

    async componentDidMount(){
        const {pathname} = this.props.location;
        this.setState({itemName: pathname.split('/')[2]});
        fetch(`http://localhost:8080/api/product/${pathname.split('/')[2]}`, {
            method: 'GET'
        }).then(x => x.json()).then(response => {
            if(response.status != 200){
                window.location.href = '/';
                return;
            }
            this.setState({itemId: response.product.id, itemName: response.product.name, itemBrand: response.product.brand, itemDescription: response.product.description,itemCategory: response.product.category, itemPrice: response.product.price, itemDiscount: response.product.newPrice});
            fetch(`http://localhost:8080/api/product/${this.state.itemId}/sizes`, {
                method: 'GET'
            }).then(x => x.json()).then(response => {
                let sizes = this.state.itemSizes;
                response.sizes.forEach((size) => { 
                    sizes.set(size.size, size.stock);
                })
                this.setState({itemSizes: sizes});
            })
            fetch(`http://localhost:8080/api/product/${this.state.itemId}/images`, {
                method: 'GET'
            }).then(x => x.json()).then(response => {
                let images = this.state.itemImages;
                response.images.forEach((image) => { 
                    images.push(image.imageUrl);
                })
                this.setState({itemImages: images});
            })
        });
    }

    render() {
        let sizes = [];
        this.state.itemSizes.forEach((stock, size) => {
            console.log(stock, size)
            if(this.state.pickedSize == size){
                sizes.push(<Size bgColor='#222' fontColor='#fff' borderColor='#222' onClick={() => this.pickSize(size)}>{size}</Size>)
            } else {
                sizes.push(<Size bgColor='#fff' fontColor='#000' borderColor='#222' onClick={() => this.pickSize(size)}>{size}</Size>)
            }       
        })
        console.log(this.state.itemImages[0])
        return (
            <div>
                <HeaderComponent />
                <Container>
                    <ImageContainer>
                        <MoreImage>
                            <SmallImage src={this.state.itemImages[0]} />
                            <SmallImage src={this.state.itemImages[0]} />
                            <SmallImage src={this.state.itemImages[0]} />
                            <SmallImage src={this.state.itemImages[0]} />
                                                     
                        </MoreImage>
                        <MainImage src={this.state.itemImages[0]} />
                    </ImageContainer>
                    <Content>
                        <Brand>{this.state.itemBrand}</Brand>
                        <Title>{this.state.itemName}</Title>
                        <Price>{this.state.itemPrice}zł</Price>
                        <span style={{fontSize: 21, marginTop: 10, marginBottom: 15}}>Dostępne rozmiary:</span>
                        <SizePicker>
                            {sizes}
                        </SizePicker>
                        {this.state.sizeInfo != '' ? <SizeInfo>{this.state.sizeInfo}</SizeInfo>: <SizeInfo>&#8199;</SizeInfo>}
                        <hr></hr>
                        <Description>{this.state.itemDescription}</Description>
                        <ButtonContainer>
                            <Button onClick={() => this.addToCart()} className='btn btn-success'>DODAJ DO KOSZYKA</Button>
                        </ButtonContainer>  
                    </Content>
                </Container>
            </div>
        );
    }
}

export default Product;
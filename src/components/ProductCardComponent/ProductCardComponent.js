import React, { Component } from 'react'
import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: rgb(245, 245, 245);
    }
`

const Card = styled.div`
    min-height: 250px;
    width: 200px;
    height: 300px;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    margin: 20px 10px;
    z-index: 10;
`

const DiscountBlock = styled.div`
    position: absolute;
    width: 70%;
    background-color: #DE6449;
    color: #FFFFF2;
    text-align: center;
    padding: 1px;
    font-weight: 700;
    border: 2px solid #EF755A;
    margin-top: 10px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.7;
`

const Image = styled.img`
    padding-top: 25px;
    width: auto;
    max-height: 150px;
`

const Title = styled.p`
    width: 95%;
    margin: 15px auto 0 auto;
    text-align: center;
    font-size: 20px;
`

const Brand = styled.p`
    margin: 0;
    text-align: center;
    color: rgb(200, 200, 200);
    font-size: 15px;
`

const Price = styled.p`
    font-weight: 700;
    color: #000;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
`

const Sup = styled.sup`
    text-decoration: line-through;
`

function kebabCase(text){
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
}

class ProductCardComponent extends Component {
    state = {
        hover: false
    }

    onEnter = () => {
        this.setState({hover: true})
    } 

    onLeave = () => {
        this.setState({hover: false})
    }

    redirect(link){
        window.location.href = link;
    }

    render(){
        const {name, id, brand, price, discountPrice, imageUrl} = this.props;
        return(
                <Card onClick={() => this.redirect('/produkt/' + id + '/' + kebabCase(name))} className='container-fluid' onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>
                    <GlobalStyle />
                    {discountPrice > 0 && discountPrice < price && !this.state.hover > 0 ? <DiscountBlock>ZNIŻKA</DiscountBlock> : ''}
                    <div className='d-flex justify-content-center'>
                        <Image src={imageUrl}></Image>
                    </div>
                    <div>
                        <Title className='font-weight-bold text-dark text-center'>{name}</Title>
                        <Brand>{brand}</Brand>
                    </div>
                    <div>
                        <Price>{discountPrice < price && discountPrice > 0 ? parseFloat(discountPrice).toFixed(2) : parseFloat(price).toFixed(2)}zł {discountPrice < price && discountPrice > 0 ? <Sup>{parseFloat(price).toFixed(2)}zł</Sup> : ''}</Price>
                    </div>
                </Card>
        )
    }
}

export default ProductCardComponent;

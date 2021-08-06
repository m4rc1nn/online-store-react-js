import React, { Component } from 'react';
import styled from 'styled-components';
let cart = require('./CartModule');

const Panel = styled.div`
    position: absolute;
    height: 100vh;
    width: 400px;
    right: -10px;
    top: -5px;
    background-color: #fff;
    z-index: 100;
    color: #000;
    display: flex;
    align-items: center;
    flex-direction: column;
    &:hover{
        cursor: default;
    }
`

const Blur = styled.div`
    background-color: #000;
    position: absolute;
    height: 100vh;
    width: 100vw;
    right: -10px;
    top: -5px;
    z-index: 100;
    opacity: .5;
    &:hover{
        cursor: default;
    }
`

const Title = styled.span`
    margin-left: 3px;
    margin-top: 25px;
    font-size: 2em;
    &:hover{
        cursor: pointer;
    }
`

const Description = styled.span`
    margin-left: 3px;
    margin-top: 25px;
    font-size: 1em;
    &:hover{
        cursor: pointer;
    }
`

const ItemBox = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;
`

const ItemContainer = styled.div`
    background-color: #ddd;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;
`

const Upper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
`

const ImageBox = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 50px;
    height: 100%;
    padding: 5px 0px;
`

const NameBox = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
`

const ItemName = styled.span`
    font-size: .7em;
    padding: 0 5px;
    margin-left: 5px;
    text-align: center;
`

const Size = styled.span`
    font-size: .7em;
    padding: 0 5px;
    margin-left: 5px;
    text-align: center;
`

const Bottom = styled.div`
    display: flex;
    width: 100%;
    padding-bottom: 5px;
`

const Price = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .7em;
    font-weight: 900;
`

const RemoveBox = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        cursor: pointer;
    }
`

const PayButton = styled.div`
    margin-bottom: 100px;
`

const TrashImg = styled.img`
    width: 75px;
    
`

function kebabCase(text){
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
}

class CartPanel extends Component {
    render() {
        let items = [];
        cart.getItems().forEach((item, index) => {
            items.push(
                <ItemContainer key={index}>
                    <Upper>
                        <ImageBox>
                            <Image src={item.image}></Image>
                        </ImageBox>
                        <NameBox>
                            <ItemName>{item.name}</ItemName>
                            <Size>Rozmiar: <span style={{fontWeight: 900}}>{item.size}</span></Size>
                        </NameBox>                      
                    </Upper>
                    <Bottom>
                        <Price>{item.price.toFixed(2)}zł</Price>
                        <RemoveBox onClick={() => cart.removeItem(item.id, item.name, item.size, item.price, 1)}>
                            <svg color="#1A1A1A" width="16px" height="16px" viewBox="0 0 16 16" role="img" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H2.5C2.22386 2 2 2.22386 2 2.5C2 2.77614 2.22386 3 2.5 3H13.5C13.7761 3 14 2.77614 14 2.5C14 2.22386 13.7761 2 13.5 2H10.5C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H5.5ZM12 5H4V13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13V5ZM4 4H3V5V13C3 14.1046 3.89543 15 5 15H11C12.1046 15 13 14.1046 13 13V5V4H12H4ZM6.5 6C6.77614 6 7 6.22386 7 6.5V12.5C7 12.7761 6.77614 13 6.5 13C6.22386 13 6 12.7761 6 12.5L6 6.5C6 6.22386 6.22386 6 6.5 6ZM10 6.5C10 6.22386 9.77614 6 9.5 6C9.22386 6 9 6.22386 9 6.5V12.5C9 12.7761 9.22386 13 9.5 13C9.77614 13 10 12.7761 10 12.5V6.5Z" fill="inherit"></path></svg>
                        </RemoveBox>
                    </Bottom>
                </ItemContainer>
            )
        })
        return (
            <div>
                <Blur onClick={() => this.props.close()} />
                <Panel>
                    <Title>Koszyk</Title>
                    <Description>Ilość przedmiotów: <span style={{fontWeight: 900}}>{cart.getItems().length}</span></Description>
                    <ItemBox>
                        {items}
                    </ItemBox>
                    {items.length > 0 ? <PayButton className='btn btn-success'>Przejdź do płatności</PayButton> : <span>Brak przedmiotów w koszyku.</span>}
                </Panel> 
            </div>
                   
        );
    }
}

export default CartPanel;
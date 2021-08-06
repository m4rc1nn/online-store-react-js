import React, { Component } from 'react';
import styled from 'styled-components';
import CartPanel from './CartPanel';
let cart = require('./CartModule');

const Div = styled.div`
    position: relative;
`

const Icon = styled.img`
  width: 30px;
`

const BasketCount = styled.span`
  background-color: red;
  color: #fff;
  border-radius: 10px;
  padding: 0px 5px;
  font-size: .8em;
  position: absolute;
  bottom: -10px;
  right: -10px;
`

class CartComponent extends Component {

    state = {
        items: cart.getItems(),
        cartPanel: false
    }

    interval = setInterval(() => {
        this.setState({items: cart.getItems()});
    }, 50)

    showPanel(){
        this.setState({cartPanel: true});
    }

    hidePanel(){
        this.setState({cartPanel: false});
    }

    render() {
        return (
            <div>
                {this.state.cartPanel ? <CartPanel close={() => this.hidePanel()} /> : 
                    <Div>
                        <Icon onClick={() => this.showPanel()} src={'/assets/basket.svg'}></Icon>
                        <BasketCount>{this.state.items.length}</BasketCount>                                 
                    </Div>
                } 
            </div>
        );
    }
}

export default CartComponent;
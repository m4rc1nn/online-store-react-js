import React, { Component } from 'react';
import styled from 'styled-components';
import AddItemComponent from '../ItemComponents/AddItemComponent';

const Title = styled.span`
    font-weight: 900;
    font-size: 2.5em;
    color: #000;
    margin-left: 10px;
`

const ItemsBox = styled.div`
    width: 50%;
`

const AddItemBox = styled.div`
    width: 25%;
`

class ProductsComponent extends Component {
    render() {
        return (
            <div>
                <Title>Asortyment</Title>
                <AddItemBox>
                    <ItemsBox></ItemsBox>
                    <AddItemComponent />
                </AddItemBox>
            </div>
        );
    }
}

export default ProductsComponent;
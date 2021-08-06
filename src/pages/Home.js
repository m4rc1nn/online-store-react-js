import React, { Component } from 'react'
import ProductCardComponent from '../components/ProductCardComponent/ProductCardComponent';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import styled from 'styled-components';

const ProductContainer = styled.div`
  width: 75%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const Img = styled.img`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

class Home extends Component {

  state = {
    items: []
  }

  async componentDidMount(){
    fetch('http://localhost:8080/api/products', {
      method: 'GET'
    }).then(x => x.json()).then(response => {
      response = response.products;
      let items = this.state.items;
      [...response].forEach((item, index) => {
        items.push(<ProductCardComponent key={index} id={item.id} name={item.name} price={item.price} discountPrice={item.discountPrice} imageUrl={item.imageUrl} />)
      })
      this.setState({items: items});
    });
  }

  render(){
    return(
      <div>
        <HeaderComponent />
        <Img style={{height: 350}} src='/assets/baner.png'></Img>
        <ProductContainer>
          {this.state.items}
        </ProductContainer>
      </div>
    )
  }
}

function kebabCase(text){
  return text.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
}

export default Home;

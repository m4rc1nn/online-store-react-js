import React, { Component } from 'react'
import ProductCardComponent from '../components/ProductCardComponent/ProductCardComponent';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: rgb(245, 245, 245);
    }
`

const ProductContainer = styled.div`
  width: 75%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

class Category extends Component {

  state = {
    items: []
  }

  async componentDidMount(){
    const {pathname} = this.props.location;
    const category = pathname.split('/')[2];
    await fetch(`http://localhost:8080/api/products/${category}`, {
      method: 'GET'
    }).then(x => x.json()).then(response => {
      response = response.products;
      let items = this.state.items;
      [...response].forEach((item, index) => {
        items.push(<ProductCardComponent key={index} name={item.name} price={item.price} discountPrice={item.discountPrice} />)
      })
      this.setState({items: items});
    });
  }

  render(){
    return(
      <div>
        <GlobalStyle />
        <HeaderComponent />
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

export default Category;

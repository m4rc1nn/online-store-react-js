import React, { Component } from 'react';
import styled from 'styled-components';
import CartComponent from '../CartComponent/CartComponent'

const Nav = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-bottom: 20px;
`

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const MobileBox = styled.div`
z-index: 100;
  width: 100%;
  display: none;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

const HamburgerBox = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 20px;
  position: relative;
`

const Hamburger = styled.div`
  position: absolute;
  background-color: #000;
  width: 50px;
  height: 6px;
  &:after{
    position: absolute;
    content: '';
    top: 16px;
    background-color: #000;
    width: 50px;
    height: 6px;
  }

  &:before{
    position: absolute;
    content: '';
    top: -16px;
    background-color: #000;
    width: 50px;
    height: 6px;
  }
`

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const Category = styled.span`
  @media only screen and (min-width: 769px) {
    padding: 0px 20px;
    font-size: 1.5em;
    font-weight: 500;
    border-bottom: 2px solid #fff;
    &:after {
      content: '';
      display: block;
      width: 0px;
      height: 3px;
      background: #000;
      transition: width .3s;
    }
    &:hover:after {
      width: 100%;
    }
    &:hover{
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 768px) {
    text-align: center;
    width: 100%;
    padding: 5px 10px;
    border-bottom: 1px solid #9da2bf;
    font-size: 2em;
    font-weight: 500;
  }
`

const Logo = styled.span`
  margin: 0px 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  font-weight: 900;
  &:hover{
    cursor: pointer;
  }
`

const IconsBox = styled.div`
  margin: 0px 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

const IconBox = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 20px;
  &:hover{
    cursor: pointer;
    background-color: #ccc;
  }
`

const Div = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
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
`

const Menu = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 90;
`

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 90px;
`

class Header extends Component {
    state = {
      categories: [],
      navItems: [],
      menu: false
    }

    toggleMenu(){
      this.setState({menu: !this.state.menu})
    }

    redirect(link){
      window.location.href = link;
    }

    async componentDidMount(){
      fetch(`http://localhost:8080/api/categories`, {
          method: 'GET'
      }).then(x => x.json()).then(response => {
        response = response.categories;
        let navItems = [];
        response.forEach((category, index) => {
          console.log(category)
          navItems.push(<Category key={index} onClick={() => this.redirect(`/kategoria/${category.pluralName}`)}>{category.pluralName.toUpperCase()}</Category>)
        })
        this.setState({navItems: navItems});
      })
    }

    render() {
        return (
          <Nav>
            {!this.state.menu ? '' : 
              <Menu>
                <MobileContainer>
                  {this.state.navItems}
                </MobileContainer>
              </Menu>
            }
            <MobileBox>
              <Logo>Marka</Logo>
              <HamburgerBox onClick={() => this.toggleMenu()}>
                <Hamburger></Hamburger>
              </HamburgerBox>
            </MobileBox>
            <Box>
              <Logo onClick={() => this.redirect('/')}>Marka</Logo>  
              <IconsBox>
                <IconBox>
                  <Icon src={'/assets/user.svg'}></Icon>
                </IconBox>
                <IconBox>
                  <CartComponent></CartComponent>
                </IconBox>                
              </IconsBox>
            </Box>
            <CategoryBox>
              <Div></Div>
              <Div>{this.state.navItems}</Div>
              <Div>
                <input placeholder='Wyszukaj...' className='form-control' style={{width: 200}}></input>
                <button style={{marginLeft: 5}} className='btn btn-secondary'>
                  <img style={{width: 20}} src={'/assets/loupe.svg'}></img>
                </button>
              </Div>         
            </CategoryBox>
          </Nav>
        );
    }
}

export default Header;
import React, { Component } from 'react';
import styled from 'styled-components';

import StartComponent from '../components/AdminPanelComponent/NavComponents/StartComponent';
import ProductsComponent from '../components/AdminPanelComponent/NavComponents/ProductsComponent';

const Container = styled.div`
    display: flex;
    min-height: 100vh;
`

const Panel = styled.div`
    width: 15vw;
    min-height: 100vh;
    background-color: #777c99;
    color: #fff;
`

const Content = styled.div`
    width: 85vw;
    background-color: ghostwhite;
`

const TitleBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 50px;
`

const Title = styled.span`
    font-size: 1em;
    text-align: center;
    padding: 5px 9px;
    border-radius: 10px;
    background-color: #306fc2;
    color: #fff;
    font-weight: 900;
`

const NavItem = styled.div`
    width: 100%;
    padding: 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    border-bottom: 1px solid #9da2bf;
    &:hover{
        background-color: #9da2bf;
        cursor: pointer;
    }
`

const IconBox = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Icon = styled.img`

`

const TextBox = styled.div`
    width: 70%;
`

const Text = styled.span`
    font-size: .8em;
    text-align: left;
    text-transform: uppercase;
    white-space: nowrap;
    font-weight: 700;
`


const Logout = styled.div`
    text-align: center;
    margin-right: 0;
`

class MainAdminPanel extends Component{

    state = {
        content: ''
    }

    setContent(content){
        this.setState({content: content})
    }

    logout(){
        sessionStorage.setItem('token', '');
        window.location.href = '/auth';
    }

    componentDidMount(){
        const token = sessionStorage.getItem('token');
        fetch('http://localhost:8080/api/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        }).then(res => res.json()).then(data => {
            if(data.status != 200){
                window.location.href = '/auth';
            }
        })
    }    

    render(){
        //<Logout className='btn btn-danger' onClick={() => this.logout()}>Wyloguj</Logout>
        return (
            <Container>
                <Panel>
                    <TitleBox>
                        <Title>Twój sklep</Title>
                    </TitleBox> 
                    <NavItem onClick={() => this.setContent('start')}>
                        <IconBox>
                            <Icon width='26px' src={'/assets/home.svg'}></Icon>
                        </IconBox>
                        <TextBox>
                            <Text>Strona główna</Text>
                        </TextBox>
                    </NavItem>
                    <NavItem onClick={() => this.setContent('sale')}>
                        <IconBox>
                            <Icon width='26px' src={'/assets/basket2.svg'}></Icon>
                        </IconBox>
                        <TextBox>
                            <Text>Sprzedaż</Text>
                        </TextBox>
                    </NavItem>
                    <NavItem onClick={() => this.setContent('products')}>
                        <IconBox>
                            <Icon width='26px' src={'/assets/assortment.svg'}></Icon>
                        </IconBox>
                        <TextBox>
                            <Text>Asortyment</Text>
                        </TextBox>
                    </NavItem>     
                    <NavItem onClick={() => this.setContent('tools')}>
                        <IconBox>
                            <Icon width='26px' src={'/assets/assortment.svg'}></Icon>
                        </IconBox>
                        <TextBox>
                            <Text>Narzędzia</Text>
                        </TextBox>
                    </NavItem>             
                </Panel>
                <Content>
                    {this.state.content == 'start' ? <StartComponent /> : 
                    this.state.content == 'products' ? <ProductsComponent /> : 
                    '' 
                    }
                </Content>
            </Container>
        );
    }
}

export default MainAdminPanel;

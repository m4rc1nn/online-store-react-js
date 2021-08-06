import React, { Component } from 'react';
import RegisterComponent from '../components/AuthComponent/RegisterComponent';
import LoginComponent from '../components/AuthComponent/LoginComponent';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    20deg,
    hsl(150, 60%, 65%),
    hsl(270, 64%, 60%)
  );
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 20%;
  min-width: 300px;
  padding: 50px 0;
  background-color: #222;
  border-radius: 50px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Span = styled.span`
  width: 150px;
  text-align: center;
  cursor: pointer;
  color: ${props => props.color};
  font-weight: ${props => props.weight};
  color: #fff;
`;

class AuthComponent extends Component{
  state = {
    showForm: 'login'
  }

  handleClick = (form) => {
    this.setState({showForm: form});
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
        if(data.status == 200){
            window.location.href = 'auth/adminpanel';
        }
    })
}

  render(){
    const {showForm} = this.state;
    return (
      <FullScreen>
        <Container>
          <Div>
            <Span weight={showForm == 'login' ? 900 : 0} onClick={() => this.handleClick('login')}>ZALOGUJ SIĘ</Span>
            <Span weight={showForm == 'register' ? 900 : 0} onClick={() => this.handleClick('register')}>ZAREJESTRUJ SIĘ</Span>
          </Div>
          
          {showForm == 'login' ? <LoginComponent/> : <RegisterComponent />}
        </Container>
      </FullScreen> 
    );
  }
}

export default AuthComponent;

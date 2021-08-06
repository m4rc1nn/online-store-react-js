import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.div`
    margin: 0 auto;
    width: 170px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

class LoginForm extends Component{

    state = {
        message: '',
        messageStatus: 'text-danger'
    }

    userRef = React.createRef();
    passwordRef = React.createRef();

    handleClick = () => {
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.userRef.current.value,
                password: this.passwordRef.current.value
            }) 
        }).then(res => res.json()).then(data => {
            if(data.status != 200){
                this.setState({message: 'Podano złe dane logowania'});
            } else {
                sessionStorage.setItem('token', data.token);
                window.location.href = '/auth/adminpanel';
            }
        })
    }

    render(){
        const {message, messageStatus} = this.state;

        return (
            <Form>
                <input required className="form-control" type='text' placeholder="Podaj login" ref={this.userRef} /> <br />
                <input required className="form-control" type='password' placeholder="Podaj hasło" ref={this.passwordRef} /> <br />
                <button className="btn btn-primary" onClick={this.handleClick}>Zaloguj się</button>
                <span className={`text-center ${messageStatus}`}>{message}</span>
            </Form>    
        );
    }
}

export default LoginForm;

import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.div`
    margin: 0 auto;
    width: 170px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

class RegisterForm extends Component{

    state = {
        message: '',
        messageStatus: 'text-danger'
    }

    //userRef = React.createRef();
    //emailRef = React.createRef();
    //passwordRef = React.createRef();
    //passwordTwoRef = React.createRef();
    
/*
    handleClick = () => {
        const userInput = this.userRef.current.value;
        const emailInput = this.emailRef.current.value;
        const password = this.passwordRef.current.value;
        const passwordTwo = this.passwordTwoRef.current.value;

        if(password != passwordTwo) {
            this.setState({message: 'Hasła nie są takie same.', messageStatus: 'text-danger'});
        }
    }
    */
    render(){
        //const {message, messageStatus} = this.state;

        return (
            <Form>
                {/*
                <input required className="form-control" type='text' placeholder="Podaj nowy login" ref={this.userRef} /> <br />
                <input required className="form-control" type='email' placeholder="Podaj nowy email" ref={this.emailRef} /> <br />
                <input required className="form-control" type='password' placeholder="Podaj nowe hasło" ref={this.passwordRef} /> <br />
                <input required className="form-control" type='password' placeholder="Podaj nowe hasło ponownie" ref={this.passwordTwoRef} /> <br />
                <button className="btn btn-primary" onClick={this.handleClick}>Zarejestruj się</button>
                <span className={`text-center ${messageStatus}`}>{message}</span>*/}
                <span className='text-center text-danger'>Funkcja rejestrowania nie jest dostępna.</span>
            </Form>
        );
    }
}

export default RegisterForm;

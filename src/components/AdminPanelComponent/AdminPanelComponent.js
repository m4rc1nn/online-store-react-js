import React, { Component } from 'react';
import AdminPanel from '../../pages/AdminPanel'

class AdminPanelComponent extends Component{
    state = {
        show: 0
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
            } else {
                this.setState({show: 1})
            }
        })
    }
    render(){
        return (
            <div>
                {this.state.show ? <AdminPanel /> : <span>Autoryzowanie...</span>}
            </div>
        );
    }
}

export default AdminPanelComponent;

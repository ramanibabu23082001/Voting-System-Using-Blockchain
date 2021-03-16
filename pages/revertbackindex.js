import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
//import Layout from '../../components/Layout';
import authenticate from '../ethereum/authenticationinstance';
import web3 from '../ethereum/web3';
//import { Router } from '../../routes';
//var pef =require('./hlo.html');
//import NewComponent from './new';

class Signup extends Component {
  //state = {
    //minimumContribution: '',
    //errorMessage: '',
    //loading: false
  //};

  onSubmit = async event => {
    event.preventDefault();

   // this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
     console.log(accounts[0]);
     //const signup  = await authenticate.methods.signup("ragul").send({
      //from:accounts[0]
   // });  
  //const login  = await authinstance.methods.login("ukkl").call();
   // const manager = await factory.methods.getuser().call();
   //console.log(signup); 
   const login  = await authenticate.methods.login("jll").call();
   console.log(login);  
   // Router.pushRoute('/');
    } catch (err) {
    //  this.setState({ errorMessage: err.message });
    console.log(err);
    }

    //this.setState({ loading: false });
  };
 
  render() {
    return (
    
      <button onClick={this.onSubmit} >signup</button>
    )
  }
}

export default Signup;

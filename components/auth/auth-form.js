import { useState, useRef, Component } from 'react';//ref is state for storing input variable
import { signIn } from 'next-auth/client';
//import { Router } from 'next/router';
import classes from './auth-form.module.css';
import authinstance from '../../ethereum/authenticationinstance';
import web3 from "../../ethereum/web3";
//import { useHistory } from "react-router-dom";
import {Router} from "../../routes";
//give request to api (like node js)
//its for mongodb database storation
// async function createUser(email, password) {
//   // const response = await fetch('/api/auth/signup', {
//   //   method: 'POST',
//   //   body: JSON.stringify({ email, password }),
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   // });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Something went wrong!');
//   }

//   return data;
// }

class AuthForm extends  Component
{
 
//  const emailInputRef = useRef();//store email
 // const addressInputRef = useRef();//store password

  //const [isLogin, setIsLogin] = useState(true);//use state for declare state variable
 // const router = useRouter();
 state = {
  isLogin:true,
  email:'',
  address:''
};

switchAuthModeHandler  = event => {
  
  this.setState(prevState =>//prevState used to get the prevstate od the variable
    ({isLogin:!prevState.isLogin}));
  }

   submitHandler = async event  =>{
//    let history = useHistory();
    event.preventDefault();

    //const enteredEmail = emailInputRef.current.value;//curreent value of this email
    //const enteredAddress = addressInputRef.current.value;//cuurent value of this password

    // optional: Add validation
    const {isLogin}=this.state
    if (isLogin) {
      const { email,address} =this.state;
      const resul = await signIn('credentials', {//if is errorresult contain error msg otherwise object stored
        redirect: false,//if login fails not want to redirect error page //bcz next go to error page make it of it make false
        email: email,
        address: address,
        person: "user"
      });
   console.log(resul);
      if (!resul.error) {
        console.log("sdfa");
        // set some auth state
  //      Router.push('/profile');//redirection not use window.href it will replace the url
  //  history.push('/profile');
  Router.replaceRoute('/profile');     
}
    } 
    else {
      try {
        const {email} =this.state;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        console.log(email);
        const result = await authinstance.methods.signup(email).send({
          from : accounts[0]
        });
        console.log(result);
       this.setState({isLogin:true,email:'',address:''})
      } catch (error) {
        console.log(error);
      }
    }
  }
   render(){
  return (
    <section className={classes.auth}>
      <h1>{this.state.isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={this.submitHandler}>
        <div className={classes.control}>
          <label htmlFor='Address'>Your Address</label>
          <input type='string' 
          value={this.state.address}
          onChange={event =>
            this.setState({ address: event.target.value })}
          required  />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            value={this.state.email}
          onChange={event =>
            this.setState({ email: event.target.value })}
            required
          
          />
        </div>
        <div className={classes.actions}>
          <button>{this.state.isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={this.switchAuthModeHandler}
          >
            {this.state.isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
   }
}

export default AuthForm;

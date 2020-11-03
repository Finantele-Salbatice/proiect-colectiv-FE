import * as React from 'react';
import Register from "../components/login/Register"
import axios, { AxiosInstance } from "axios"

export interface RegisterPageProps {
    
}
 
export interface RegisterPageState {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    passwordConfirm: string;
    errors:any;
}

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
    instance: AxiosInstance;

    constructor(props : RegisterPageProps) {
        super(props);
        this.state = {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            passwordConfirm: '',
            errors : {
                firstNameError: '',
                lastNameError: '',
                emailError: '',
                passwordError: '',
                passwordConfirmError: '',
              }
        };
        this.instance = axios.create({
            baseURL : 'http://localhost:3000',
        })
    }

    handleChange = (data:any) => {
        this.setState({
            ...data
        })
    }

    submit = async () => {
        console.log("ma inregistrez");
    }

    
  
      validate = () => {
        var validator = require('validator');
        var val = true;
  
        var firstNames = this.state.firstName.replaceAll(' ', '');
        
        if(!validator.isAlpha(firstNames)) {
          this.state.errors.firstNameError = "First name is invalid";
          val = false;
        }
        else {
          this.state.errors.firstNameError = '';
        }
  
        if(!validator.isAlpha(this.state.lastName)) {
          this.state.errors.lastNameError = "Last name invalid";
          val = false;
        }
        else {
          this.state.errors.lastNameError = '';
        }
  
        if(!validator.isEmail(this.state.email)) {
          this.state.errors.emailError = 'E-mail invalid';
          val = false;
        }
        else {
          this.state.errors.emailError = '';
        }
  
        if((this.state.password.length === 0 || this.state.passwordConfirm.length === 0) 
          || (this.state.password !== this.state.passwordConfirm)) {
          this.state.errors.passwordError = 'Passwords must be  identical';
          this.state.errors.passwordConfirmError = 'Passwords must be identical';
          val = false;
        }
        else {
          this.state.errors.passwordError = '';
          this.state.errors.passwordConfirmError = '';
        }
  
        return val;
  
      }

    render() {
        return (
            <div>
                <Register {...this.state} handleChange={this.handleChange} submit = {this.submit}> </Register>
            </div>
        )
    }
}

export default RegisterPage;
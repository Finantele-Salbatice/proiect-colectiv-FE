import React, { Component } from 'react';

import {Button,TextField} from "@material-ui/core"
import "../../css/login/main.css"
import "../../css/login/util.css"


export interface LoginFormProps {
    password: String;
    email: String;
    handleChange(data: any):void;
}
 
export interface LoginFormState {

}

class LoginForm extends Component < LoginFormProps,LoginFormState>{
    
    handleData = (type:any) =>(data:any) =>{
       this.props.handleChange({
           [type] : data.target.value
       })
    }

    setPassword = ()=>{

        
    }
    
    validateForm = ()=>{
        
    }

    finisj = ()=>{
        
    }

    
    
    render() {
        const {email, password} = this.props;
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form">
                            <span className="login100-form-logo">
                                <img src="../../../public/cangur.jpg"></img>
                            </span>
        
                            <span className="login100-form-title p-b-34 p-t-27">
                                Log in
                            </span>
        
                            <div className="wrap-input100 validate-input" data-validate = "Enter username">
                                <input className="input100" type="text" name="username" placeholder="Username" onChange={this.handleData("email")} />
                                <span className="focus-input100"></span>
                            </div>
        
                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                <input className="input100" type="password" name="pass" placeholder="Password"/>
                                <span className="focus-input100"></span>
                            </div>
        
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Login
                                </button>
                            </div>
        
                            <div className="text-center p-t-90">
                                <a className="txt1" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default LoginForm;
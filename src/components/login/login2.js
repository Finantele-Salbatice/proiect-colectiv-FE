import React, { Component } from 'react';

class Login2 extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            dragos:"gay ca asa a zis Iulius",
            email:null,
            password:null
        }
    }
    state = {  }


    setEmail = (email)=>{
        this.setState({
            ...this.state,
            email: email
        })

    }

    setPassword = ()=>{

        console.log("Cea");
    }
    
    validateForm = ()=>{
        console.log("Validare");
    }

    finisj = ()=>{
        console.log(this.state.email)
    }
    
    
    render() {
        const {email, password} = this.state;
        return (
            <div className="Login">
              <form>
                <div controlId="email" bsSize="large">
                  <label>Email</label>
                  <input
                    autoFocus
                    type="email"
                    value={email}
                    onChange={e => this.setEmail(e.target.value)}
                  />
                </div>
                <div controlId="password" bsSize="large">
                  <label>Password</label>
                  <input
                    value={password}
                    onChange={e => this.setPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <div className="buttonLogin">
                    <button block bsSize="large" type="submit" onClick={() =>this.finisj()}>
                    Login
                    </button>
                </div>
                <div class="forgotPass">
                        <a class="txt1" href="#">
                            Forgot Password?
                        </a>
                    </div>
                <div class="forgotPass">
                        <a class="txt1" href="#">
                            Sing in.
                        </a>
                    </div>
              </form>
            </div>
        );
    }
}
 
export default Login2;
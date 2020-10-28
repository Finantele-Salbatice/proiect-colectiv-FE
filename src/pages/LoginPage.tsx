import * as React from 'react';
import LoginForm from '../components/login/LoginForm'

export interface LoginPageProps {
    
}
 
export interface LoginPageState {
    password: string;
    email: string;
}
 
class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            password:'',
            email:'' 
        };
    }



    handleChange = (data:any)=>{
        this.setState({
            ...data
        })
    }

    render() { 
        return (<LoginForm {...this.state} handleChange={this.handleChange}></LoginForm>  );
    }
}
 
export default LoginPage;
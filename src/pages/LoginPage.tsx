import * as React from 'react';
import Login from "../components/login/Login"
import axios, { AxiosInstance } from "axios"

export interface LoginPageProps {
    
}
 
export interface LoginPageState {
    password: string;
    email: string;
    isError: boolean;
}
 
class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    instance: AxiosInstance;
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            password:'',
            email:'',
            isError: false
        };
        this.instance = axios.create({
            baseURL: 'http://localhost:3000',
          });
    }



    handleChange = (data:any)=>{
        this.setState({
            ...data,
            isError: false
        })
    }

    clearUserData() {
        this.setState({
            email: '',
            password: ''
        });
    }

    submit  = async ()=>{
        try {
            const result = await this.instance.post("/login",this.state);
            const data = result.data;
            console.log("E bine,",data);
        } catch(error) {
            const {response} = error;
            console.log(response.data); // make some text appear if this error is received
            this.setState({
                isError: true
            });
            this.clearUserData();
        }
    }

    render() { 
        return (
        <div>
            <Login {...this.state} handleChange={this.handleChange} submit={this.submit}></Login>
        </div>
         );
        
    }
}
 
export default LoginPage;
import * as React from 'react';
import Login from "../components/login/Login"
import axios, { AxiosInstance } from "axios"

export interface LoginPageProps {
    
}
 
export interface LoginPageState {
    password: string;
    email: string;
}
 
class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    instance: AxiosInstance;
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            password:'',
            email:'' 
        };
        this.instance = axios.create({
            baseURL: 'https://localhost:3000',
          });
    }



    handleChange = (data:any)=>{
        this.setState({
            ...data
        })
    }

    submit  = async ()=>{
        console.log("ma logez");
        try{
            const result =await this.instance.post("/login",this.state);
            const data = result.data;
            console.log("E bine,",data);
        }catch(err){
            console.log(err)
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
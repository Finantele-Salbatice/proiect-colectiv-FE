import axios, { AxiosInstance } from 'axios';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ResetPass from '../components/login/ResetPass';
import validator from 'validator';

const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;

interface ResetPassPageProps extends RouteComponentProps{}

interface ResetPassPageState{
    email : string;
    isError : boolean;
    errMessage : string;
}

class ResetPassPage extends React.Component<ResetPassPageProps,ResetPassPageState>{
    
    instance : AxiosInstance;
    
    constructor(props : ResetPassPageProps){
        super(props);

        this.state = {
            email : '',
            isError : false,
            errMessage : ''
        };
        
        this.instance = axios.create({
            baseURL : SNOWPACK_PUBLIC_API_URL,         
        });
    }

    handleChange = (data : any) => {
        this.setState({
            ...data,
            isError : false,
            errMessage : ''
        });
    }

    clearData = () => {
        this.setState({
            email : '',
            isError : true,
            errMessage : "The e-mail address doesn't exist !"
        })
    }

    submit = async () => {
        if(!validator.isEmail(this.state.email)){
            this.setState({
                isError : true,
                errMessage : "E-mail address doesn't have a valid format!"
            });
            return;
        }
        const body = {
            email : this.state.email
        }
        try{
            const result = await this.instance.post('/reset',body);
            this.setState({
                isError : false,
                errMessage : ''
            });
            console.log(result);
            this.props.history.push('/');
        }catch(err){
            const errResponse = err;
            console.log(errResponse);
            this.setState({
                isError : true,
                errMessage : `${errResponse.message}`
            });
            
            this.clearData();
        }
    }

    render(){
        return (
            <div>
                <ResetPass
                {...this.state} 
                handleChange = { this.handleChange }
                submit = { this.submit }
                />
            </div>
        );
    }
}

export default withRouter(ResetPassPage);
import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;
import ActivateAccountSuccess from '../components/login/ActivateAccountSuccess';
import ActivateAccountFail from '../components/login/ActivateAccountFail';
import { CircularProgress } from '@material-ui/core';

interface MatchParams {
	token: string;
}

interface ActivateAccountPageProps extends RouteComponentProps<MatchParams> {}

interface ActivateAccountPageState {
	result: boolean;
	isLoading: boolean;
}

class ActivateAccountPage extends React.Component<ActivateAccountPageProps, ActivateAccountPageState> {
    instance: AxiosInstance;

    constructor(props: ActivateAccountPageProps) {
    	super(props);
    	this.state = {
    		result: true,
    		isLoading:true,
    	};

    	this.instance = axios.create({
    		baseURL: SNOWPACK_PUBLIC_API_URL,
    	});

    	this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    async getResult() {
    	try {
    		const { token } = this.props.match.params;
    		await this.instance.post('/activate', {
    			token,
    		});
    		this.setState({
    			isLoading:false,
    		});
    	} catch (err) {
    		this.setState({
    			result:false,
    			isLoading:false,
    		});
    	}
    }

    async componentDidMount() {
    	await this.getResult();
    }

    redirectToLogin() {
    	this.props.history.push('/');
    }

    render() {
    	if (this.state.isLoading) {
    		return (
    			<CircularProgress style={{
    				marginLeft:'48%', marginTop:'20%',
    			}}/>
    		);
    	}
    	if (this.state.result) {
    		return (
    			<div>
    				<ActivateAccountSuccess
    					{...this.state}
    					redirect={this.redirectToLogin}
    				></ActivateAccountSuccess>
    			</div>
    		);
    	} else {
    		return (
    			<div>
    				<ActivateAccountFail
    					redirect={this.redirectToLogin}
    				></ActivateAccountFail>
    			</div>
    		);
    	}
    }
}

export default withRouter(ActivateAccountPage);
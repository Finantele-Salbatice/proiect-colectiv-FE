import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;
import ActivateAccountSuccess from 'src/components/login/ActivateAccountSuccess';
import ActivateAccountFail from 'src/components/login/ActivateAccountFail';

interface MatchParams {
    token: string;
}

export interface ActivateAccountPageProps extends RouteComponentProps<MatchParams> {}

export interface ActivateAccountPageState {
    result: boolean;
}

class ActivateAccountPage extends React.Component<ActivateAccountPageProps, ActivateAccountPageState> {
    instance: AxiosInstance;

    constructor(props: ActivateAccountPageProps) {
    	super(props);

    	this.state = {
    		result: true,
    	};

    	this.instance = axios.create({
    		baseURL: SNOWPACK_PUBLIC_API_URL,
    	});
    }

    getResult = async()  => {
    	try {
    		const { token } = this.props.match.params;
    		await this.instance.post('/activate', {
    			token,
    		});
    	} catch (err) {
    		this.setState({
    			result:false,
    		});
    	}
    }

    componentDidMount() {
    	this.getResult();
    }

    redirectToLogin() {
    	this.props.history.push('/');
    }

    render() {
    	if (this.state.result) {
    		return (
    			<div>
    				<ActivateAccountSuccess redirect={this.redirectToLogin}
    					{...this.state}
    				></ActivateAccountSuccess>
    			</div>
    		);
    	} else {
    		return (
    			<div>
    				<ActivateAccountFail redirect={this.redirectToLogin}
    					{...this.state}
    				></ActivateAccountFail>
    			</div>
    		);
    	}
    }

}

export default withRouter(ActivateAccountPage);
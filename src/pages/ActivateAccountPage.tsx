import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ActivateAccountSuccess from 'src/components/login/ActivateAccountSuccess';
import ActivateAccountFail from 'src/components/login/ActivateAccountFail';
import ServiceApi from 'src/remote/ServiceApi';

interface MatchParams {
    token: string;
}

interface ActivateAccountPageProps extends RouteComponentProps<MatchParams> {}

interface ActivateAccountPageState {
    result: boolean;
}

class ActivateAccountPage extends React.Component<ActivateAccountPageProps, ActivateAccountPageState> {
	private service: ServiceApi;
	constructor(props: ActivateAccountPageProps) {
    	super(props);
    	this.state = {
    		result: true,
    	};

		this.service = new ServiceApi();
    	this.redirectToLogin = this.redirectToLogin.bind(this);
	}

	async getResult() {
    	try {
    		const { token } = this.props.match.params;
    		await this.service.activateAccountRequest(token);
    	} catch (err) {
    		this.setState({
    			result:false,
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
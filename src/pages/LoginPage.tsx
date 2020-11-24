import * as React from 'react';
import Login from 'src/components/login/Login';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ServiceApi from 'src/remote/ServiceApi';

interface LoginPageProps extends RouteComponentProps {}

interface LoginPageState {
	password: string;
	email: string;
	isError: boolean;
	errorMessage: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
	private service: ServiceApi;
	constructor(props: LoginPageProps) {
		super(props);
		this.state = {
			password: '',
			email: '',
			isError: false,
			errorMessage: 'Parola nu este corecta.',
		};
		this.service = new ServiceApi();
	}

	handleChange = (data: any) => {
		this.setState({
			...data,
			isError: false,
		});
	};
	clearUserData() {
		this.setState({
			password: '',
			isError: true,
		});
	}

	submit = async() => {
		try {
			const result = await this.service.loginRequest(this.state);
			const token = result.data;
			localStorage.setItem('token', token);
			this.props.history.push('/main');
		} catch (error) {
			//const { response } = error;
			this.setState({
				isError: true,
			});
			this.clearUserData();
		}
	};

	render() {
		return (
			<div>
				<Login
					{...this.state}
					handleChange={this.handleChange}
					submit={this.submit}
				></Login>
			</div>
		);
	}
}

export default withRouter(LoginPage);

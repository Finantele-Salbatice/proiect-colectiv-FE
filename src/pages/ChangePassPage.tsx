import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ChangePass from 'src/components/login/ChangePass';
import validator from 'validator';
import ServiceApi from 'src/remote/ServiceApi';

interface RouteParams {
	token: string;
}
interface ChangePassPageProps extends RouteComponentProps<RouteParams> {}

interface ChangePassPageState {
	newpass: string;
	confnewpass: string;
	token: string;
	isError: boolean;
	errMessage: string;
}

class ChangePassPage extends React.Component<ChangePassPageProps, ChangePassPageState> {
	private service : ServiceApi;

	constructor(props: ChangePassPageProps) {
		super(props);
		this.service = new ServiceApi();
		this.state = {
			newpass: '',
			confnewpass: '',
			token: this.props.match.params.token,
			isError: false,
			errMessage: '',
		};
	}

	handleChange = (data: any) => {
		this.setState({
			...data,
			isError: false,
			errMessage: '',
		});
	};

	clearData = () => {
		this.setState({
			newpass: '',
			confnewpass: '',
			isError: true,
			errMessage: 'Cannot update the password !',
		});
	};

	submit = async() => {
		if (this.state.token === '') {
			this.setState({
				isError: true,
				errMessage: 'Cannot found token',
			});
			return;
		}
		if (this.state.newpass !== this.state.confnewpass) {
			this.setState({
				isError: true,
				errMessage:
					'New password field and confirm new password field must e identical!',
			});
			return;
		}
		if (!validator.isAlphanumeric(this.state.newpass)) {
			this.setState({
				isError: true,
				errMessage: 'Password format not valid!',
			});
			return;
		}
		const body = {
			token: this.state.token,
			password: this.state.newpass,
		};
		try {
			await this.service.changeRequest(body);
			this.setState({
				isError: false,
				errMessage: '',
			});
			this.props.history.push('/');
		} catch (err) {
			const errResponse = err;
			this.setState({
				isError: true,
				errMessage: `${errResponse.message}`,
			});

			this.clearData();
		}
	};

	render() {
		return (
			<div>
				<ChangePass
					{...this.state}
					handleChange={this.handleChange}
					submit={this.submit}
				/>
			</div>
		);
	}
}

export default withRouter(ChangePassPage);

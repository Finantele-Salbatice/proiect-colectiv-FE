import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ResetPass from 'src/components/login/ResetPass';
import validator from 'validator';
import ServiceApi from 'src/remote/ServiceApi';

interface ResetPassPageProps extends RouteComponentProps {}

interface ResetPassPageState {
	email: string;
	isError: boolean;
	errMessage: string;
}

class ResetPassPage extends React.Component<
	ResetPassPageProps,
	ResetPassPageState
> {
	private service : ServiceApi;

	constructor(props: ResetPassPageProps) {
		super(props);
		this.state = {
			email: '',
			isError: false,
			errMessage: '',
		};
		this.service = new ServiceApi();
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
			email: '',
			isError: true,
			errMessage: 'The e-mail address doesn\'t exist !',
		});
	};

	submit = async() => {
		if (!validator.isEmail(this.state.email)) {
			this.setState({
				isError: true,
				errMessage: 'E-mail address doesn\'t have a valid format!',
			});
			return;
		}
		const body = {
			email: this.state.email,
		};
		try {
			await this.service.resetRequest(body);
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
				<ResetPass
					{...this.state}
					handleChange={this.handleChange}
					submit={this.submit}
				/>
			</div>
		);
	}
}

export default withRouter(ResetPassPage);

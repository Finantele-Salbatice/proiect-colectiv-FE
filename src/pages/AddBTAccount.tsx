import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse } from 'qs';
import axios, { AxiosInstance } from 'axios';
// eslint-disable-next-line @typescript-eslint/naming-convention
const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;

interface MatchParams {
	id: string;
}

interface ActivateAccountPageProps extends RouteComponentProps<MatchParams> {}

interface ActivateAccountPageState {
	redirect: boolean;
}

class AddBTAccount extends React.Component<ActivateAccountPageProps, ActivateAccountPageState> {
	instance: AxiosInstance;
	constructor(props: ActivateAccountPageProps) {
		super(props);
		this.state = {
			redirect: false,
		};
		this.instance = axios.create({
			baseURL: SNOWPACK_PUBLIC_API_URL,
		});
	}

	async callback(params: any) {
		await this.instance.post('/account/btcallback', params);
		this.props.history.push('/main');
	}

	async componentDidMount() {
		const query = parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		});
		await this.callback(query);
	}

	render() {
		return (
			<div>
				<h1>
						Loading...
				</h1>
			</div>
		);
	}
}

export default withRouter(AddBTAccount);
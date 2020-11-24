import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse } from 'qs';
import ServiceApi from 'src/remote/ServiceApi';

interface MatchParams {
	id: string;
}

interface ActivateAccountPageProps extends RouteComponentProps<MatchParams> {}

interface ActivateAccountPageState {
	redirect: boolean;
}

class AddBTAccount extends React.Component<ActivateAccountPageProps, ActivateAccountPageState> {
	private service : ServiceApi;
	constructor(props: ActivateAccountPageProps) {
		super(props);
		this.state = {
			redirect: false,
		};
		this.service = new ServiceApi();
	}

	async callback(params: any) {
		await this.service.addBTAccountRequest(params);
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
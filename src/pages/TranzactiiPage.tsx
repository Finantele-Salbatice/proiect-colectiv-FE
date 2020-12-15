import * as React from 'react';
import NavBar from 'src/components/NavBar';
import MyAppBar from 'src/components/AppBar';
import Tranzactii from '../components/Tranzactii';
import ServiceApi from 'src/remote/ServiceApi';
import type { User } from 'src/entity/User';

export interface TranzactiiPageProps {
	classes: any;
}

export interface TranzactiiPageState {
	list: any;
	isLoading: boolean;
	pageTitle: string;
	user?: User | null;
}

class TranzactiiPage extends React.Component<TranzactiiPageProps, TranzactiiPageState> {
	private service: ServiceApi;
	constructor(props: TranzactiiPageProps) {
		super(props);
		this.state = {
			list: [],
			isLoading: true,
			pageTitle: 'Tranzactii',
			user: null,
		};
		this.service = new ServiceApi();
	}

	getUserInfo = async() => {
		const user = localStorage.getItem('user');
		if (user !== null) {
			return JSON.parse(user);
		}
		const result = await this.service.userInfoRequest();
		localStorage.setItem('user',JSON.stringify(result.data));
		return result.data;
	}

	async componentDidMount() {
		const user = await this.getUserInfo();
		this.setState({
			...this.state,
			user: user,
		});
		const data = await this.service.getAllTransactions({
			skip: 0, limit:9999,
		});
		this.setState({
			...this.state,
			isLoading: false,
			list:data.data,
		});
	}

	render() {
		return (
			<div>
				<div>
					<MyAppBar
						pageTitle={this.state.pageTitle}
						firstname={this.state.user?.first_name}
						lastname={this.state.user?.last_name}
					/>
				</div>
				<div>
					<NavBar />
				</div>
				<Tranzactii rows={this.state.list}> </Tranzactii>
			</div>
		);
	}
}

export default TranzactiiPage;
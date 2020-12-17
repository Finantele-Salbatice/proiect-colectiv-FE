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
	from: Date;
	to: Date;
	pageTitle: string;
	user?: User | null;
}

class TranzactiiPage extends React.Component<TranzactiiPageProps, TranzactiiPageState> {
	private service: ServiceApi;
	constructor(props: TranzactiiPageProps) {
		super(props);
		const date = new Date();
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		this.state = {
			list: [],
			to: date,
			from: firstDay,
			pageTitle:'Tranzactii',
			user:null,
		};
		this.service = new ServiceApi();
	}

	async componentDidMount() {
		const user = await this.getUserInfo();
		const  data = await this.getData();
		this.setState({
			list:data,
			user: user,
		});
	}
	getUserInfo = async() => {
		const user = localStorage.getItem('user');
		if (user !== null) {
			return JSON.parse(user);
		}
		const token = localStorage.getItem('token');
		if (token !== null) {
			const result = await this.service.userInfoRequest({
				'user' : token,
			});
			localStorage.setItem('user',JSON.stringify(result.data));
			return result.data;
		}
	}

	async componentDidUpdate(prevProps: TranzactiiPageProps , prevState: TranzactiiPageState ) {
		const { from , to } = this.state;
		if (from === prevState.from && to === prevState.to) {
			return;
		}
		const  data = await this.getData();
		this.setState({
			list:data,
		});
	}

	async getData() {
		try {
			const { to , from } = this.state;
			const data = await this.service.getAllTransactions({
				skip: 0, limit:9999,to:to , from:from,
			});
			return data.data;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	dateChange =(data: any)=>{
		console.log(data , 'asta e data');
		this.setState({
			...data,
		});
	}

	render() {
		return (
			<div>
				<div>
					<MyAppBar
						pageTitle={this.state.pageTitle}
						firstname={this.state.user?.first_name}
						lastname={this.state.user?.last_name}/>
				</div>
				<div>
					<NavBar />
				</div>
				<Tranzactii rows={this.state.list}  {...this.state} dateChange={this.dateChange}> </Tranzactii>
			</div>
		);
	}
}

export default TranzactiiPage;
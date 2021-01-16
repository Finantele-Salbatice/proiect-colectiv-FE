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
	cont:	string| null;
	sumFrom: any;
	sumTo: any;
	listConturi: any;
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
			cont:null,
			sumFrom:0,
			sumTo:999999999,
			listConturi: ['sdadas','asdasd'],
		};
		this.service = new ServiceApi();
	}

	async componentDidMount() {
		const user = await this.getUserInfo();
		const  data = await this.getData();
		const accounts = await this.getConturi(user);
		this.setState({
			list:data,
			user: user,
			listConturi:accounts,
		});
	}
	getUserInfo = async() => {
		const user = localStorage.getItem('user');
		if (user !== null) {
			return JSON.parse(user);
		}
		const token = localStorage.getItem('token');
		if (token !== null) {
			const result = await this.service.userInfoRequest();
			localStorage.setItem('user',JSON.stringify(result.data));
			return result.data;
		}
	}

	async componentDidUpdate(prevProps: TranzactiiPageProps , prevState: TranzactiiPageState ) {
		const { from , to, sumFrom , sumTo , cont } = this.state;
		if (from === prevState.from && to === prevState.to && sumTo === prevState.sumTo  && sumFrom === prevState.sumFrom && cont === prevState.cont) {
			return;
		}
		const  data = await this.getData();
		this.setState({
			list:data,
		});
	}

	getConturi=async(user: any)=>{
		const conturi = await this.service.accountListRequest({
			'user':user.id,
		});
		return conturi.data;
	}

	async getData() {
		try {
			const { to , from , sumFrom , sumTo , cont } = this.state;
			const opt: any = {
				skip:0,
				limit:9999,
				to:to,
				from:from,
				amountAbove:Number(sumFrom),
				amountBelow:Number(sumTo),
			};
			if (cont) {
				opt.accountId = cont;
			}
			const data = await this.service.getAllTransactions(opt);
			return data.data;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	dateChange =(data: any)=>{
		this.setState({
			...data,
		});
	}

	render() {
		return (
			<div style={{
				display:'flex',flexDirection:'row',
			}}>
				<NavBar />
				<div style ={{
					display:'inline-flex',flexDirection:'column',width:'100%',
				}}>
					<MyAppBar
						pageTitle={this.state.pageTitle}
						firstname={this.state.user?.first_name}
						lastname={this.state.user?.last_name}/>
					<Tranzactii rows={this.state.list}  {...this.state} dateChange={this.dateChange} />
				</div>
			</div>
		);
	}
}

export default TranzactiiPage;
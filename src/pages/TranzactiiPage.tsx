import * as React from 'react';
import NavBar from 'src/components/NavBar';
import MyAppBar from 'src/components/AppBar';
import Tranzactii from '../components/Tranzactii';
import ServiceApi from 'src/remote/ServiceApi';

export interface TranzactiiPageProps {
	classes: any;
}

export interface TranzactiiPageState {
	list: any;
	from: string;
	to: string;
}

class TranzactiiPage extends React.Component<TranzactiiPageProps, TranzactiiPageState> {
	private service: ServiceApi;
	constructor(props: TranzactiiPageProps) {
		super(props);
		const today = new Date();
		const date =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		const startMonth =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		this.state = {
			list: [],
			to: date,
			from: startMonth,
		};
		this.service = new ServiceApi();
	}

	async componentDidMount() {
		const  data = await this.getData();
		console.log(data);
		this.setState({
			list:data,
		});
	}

	async getData() {
		try {
			const to = new Date(this.state.to);
			const from = new Date(this.state.from);
			const data = await this.service.getAllTransactions({
				skip: 0, limit:9999,to:to , from:from,
			});
			return data.data;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	dateChange =async(data: any)=>{
		this.setState({
			...data,
		});
		const  dataList = await this.getData();
		console.log(dataList);
		this.setState({
			list:dataList,
		});
	}

	render() {
		return (
			<div>
				<div>
					<MyAppBar pageTitle="Tranzactii" firstname="Georgel" lastname="Popescu"/>
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
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
}

class TranzactiiPage extends React.Component<TranzactiiPageProps, TranzactiiPageState> {
	private service: ServiceApi;
	constructor(props: TranzactiiPageProps) {
		super(props);
		this.service = new ServiceApi();
	}

	getListItems = async()=>{
		const data = await this.service.getAllTransactions({
			limit:10,
			skip:0,
		});
		this.setState({
			list:data,
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
				<Tranzactii rows={this.state.list}> </Tranzactii>
			</div>
		);
	}
}

export default TranzactiiPage;
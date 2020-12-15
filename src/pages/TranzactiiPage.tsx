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
		this.state = {
			list: [],
		};
		this.service = new ServiceApi();
	}

	async componentDidMount() {
		const data = await this.service.getAllTransactions({
			skip: 0, limit:9999,
		});
		this.setState({
			list:data.data,
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
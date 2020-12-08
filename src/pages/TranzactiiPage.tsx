import * as React from 'react';
import NavBar from 'src/components/NavBar';
import MyAppBar from 'src/components/AppBar';
import Tranzactii from '../components/Tranzactii';

export interface TranzactiiPageProps {
    classes: any;
}

export interface TranzactiiPageState {

}

class TranzactiiPage extends React.Component<TranzactiiPageProps, TranzactiiPageState> {
	constructor(props: TranzactiiPageProps) {
		super(props);
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
				<Tranzactii></Tranzactii>
			</div>
		);
	}
}

export default TranzactiiPage;
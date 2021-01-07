import { Card, CardContent, createStyles, Icon, Typography, withStyles ,Button, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import NavBar from 'src/components/NavBar';
import MyAppBar from 'src/components/AppBar';
import PieChartComponent from 'src/components/PieChart';
import ServiceApi from 'src/remote/ServiceApi';
import type { User } from 'src/entity/User';
import type { Account } from 'src/entity/Account';
import TranzactiiMainPage from 'src/components/TranzactiiMainPage';

export interface MainPageProps {
  classes: any;
}

export interface MainPageState {
	isLoading: boolean;
	pageTitle: string;
	user?: User | null;
	data?: any;
	tranzactii: any;
}

const styles = createStyles({
	container: {
		display:'inline-flex',
		flexDirection:'column',
		width:'100%',
	},
	cardBox: {
	},
	welcomeCard: {
		width:'100%',
	},
	pieCard : {
		width:'100%',
		verticalAlign: 'center',
	},
	welcomeCardIcon : {
		width:'40px',
		height:'40px',
	},
	mainComponentContainer: {
		display:'flex',
		flexDirection:'row',
		marginLeft:'1%',
		marginTop:'1%',
	},
	tranzactiiComponent: {

	},
	navBar: {
		marginTop:'-21px',
		padding:'79px',
	},
	bigCont: {
		display:'flex',
		flexDirection:'row',
	},
});
class MainPage extends React.Component<MainPageProps, MainPageState> {
	private service: ServiceApi;
	constructor(props: MainPageProps) {
		super(props);
		this.state = {
			isLoading: true,
			pageTitle: 'Home',
			user: null,
			data: null,
			tranzactii: null,
		};
		this.service = new ServiceApi();
	}

	async componentDidMount() {
		const user = await this.getUserInfo();
		const tr = await this.service.getAllTransactions({
			skip: 0, limit:5,
		});
		this.setState({
			...this.state,
			isLoading:true,
			user: user,
			tranzactii:tr.data,
		});
		const data = await this.getSolds();
		this.setState({
			...this.state,
			isLoading: false,
			data: data,
		});
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

	getSolds = async() => {
		const accounts = await this.service.accountListRequest({
			skip:0, limit: 9999,
		});
		const labels: string[] = [];
		const values: number[] = [];
		accounts.data.forEach((account: Account) => {
			labels.push(account.bank + ' ' + account.iban);
			values.push(account.balance || 0);
		});
		const data = {
			labels : labels,
			datasets: [{
				data: values,
			}],
		};
		return data;
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.bigCont}>
				<div className={classes.navBar}>
					<NavBar />
				</div>
				<div className={classes.container}>
					<div>
						<MyAppBar
							pageTitle={this.state.pageTitle}
							firstname={this.state.user?.first_name}
							lastname={this.state.user?.last_name} />
					</div>
					{this.state.isLoading && (
						<div className={classes.mainComponentContainer}>
							<div className={classes.cardBox}>
								<Card
									className={classes.welcomeCard}
								>
									<CardContent>
										<Icon><InsertEmoticonIcon className={classes.welcomeCardIcon} /></Icon>
										<Typography variant="h5" component="h2">
											Bine ai venit, {`${this.state.user?.first_name} ${this.state.user?.last_name} !`}
										</Typography>
										<Typography variant="body2" component="p">
											<br />
											Aplicatia este inca in stare de dezvoltare, daca unele servicii nu functioneaza, ne puteti contacta !
											<br />
											<br />
											Va multumim ca aveti incredere sa folositi aplicatia noastra !
										</Typography>
									</CardContent>
								</Card>
								<Card className={classes.pieCard}>
									<CardContent>
										{this.state.isLoading && <CircularProgress />}
										{!this.state.isLoading && (
											<PieChartComponent data={this.state.data} />
										)}
									</CardContent>
								</Card>
							</div>
							<div className={classes.tranzactiiComponent}>
								<TranzactiiMainPage {...this.state}/>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(MainPage);

import { Card, CardContent, createStyles, Icon, Typography, withStyles , CircularProgress } from '@material-ui/core';
import * as React from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import NavBar from 'src/components/NavBar';
import MyAppBar from 'src/components/AppBar';
import PieChartComponent from 'src/components/PieChart';
import BarChartComponent from 'src/components/BarChart';
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
	accounts?: Map<number, Account>;
	data?: any;
	tranzactii: any;
	spending?: any;
	months?: any;
}
const monthsDict: Map<string, string> = new Map([
	['1', 'Ianuarie'],
	['2', 'Februarie'],
	['3', 'Martie'],
	['4','Aprilie'],
	['5', 'Mai'],
	['6', 'Iunie'],
	['7', 'Iulie'],
	['8', 'August'],
	['9', 'Septembrie'],
	['10', 'Octombrie'],
	['11', 'Noiembrie'],
	['12', 'Decembrie'],
]);

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
	chartCard : {
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
			accounts: new Map(),
			data: [],
			tranzactii: [],
			spending: [],
			months: [],
		};
		this.service = new ServiceApi();
	}

	async componentDidMount() {
		const user = await this.getUserInfo();
		const tr = await this.service.getAllTransactions({
			skip: 0, limit:5,
		});
		const data = await this.getSolds();
		const reports = await this.getReports();
		const spendings = reports.spending;
		const months = reports.months;

		const spendingLabels: string[] = [];
		const spendingValues: number[] = [];

		spendings.forEach((x: any) => {
			const a = this.state.accounts?.get(x.id);
			spendingLabels.push(`${a?.bank} ${a?.iban}`);
			spendingValues.push(x.spending);
		});

		const spendingData = {
			labels : spendingLabels,
			datasets: [{
				label: 'Cheltuieli per cont in ultimele 6 luni',
				data: spendingValues,
			}],
		};

		const monthsLabels: string[] = [];
		const monthsValues: number[] = [];

		months.forEach((x: any) => {
			const s = x.month.split('/');
			const year = s[0];
			const month = monthsDict.get(s[1]);
			monthsLabels.push(`${month} ${year}`);
			monthsValues.push(x.spending);
		});

		const monthsData = {
			labels : monthsLabels,
			datasets: [{
				label: 'Cheltuieli lunare',
				data: monthsValues,
			}],
		};

		this.setState({
			isLoading:false,
			user: user,
			tranzactii:tr.data,
			data: data,
			spending: spendingData,
			months: monthsData,
		});
	}

	getReports = async() => {
		const result = await this.service.getReportsRequest();
		return result.data;
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
		const dict: Map<number, Account> = new Map();
		accounts.data.forEach((account: Account) => {
			if (account.id !== undefined) {
				dict.set(account.id, account);
			}
			labels.push(account.bank + ' ' + account.iban);
			values.push(account.balance || 0);
		});
		const data = {
			labels : labels,
			datasets: [{
				data: values,
			}],
		};
		this.setState({
			accounts: dict,
		});
		return data;
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.bigCont}>
				<div>
					<NavBar />
				</div>
				<div className={classes.container}>
					<div>
						<MyAppBar
							pageTitle={this.state.pageTitle}
							firstname={this.state.user?.first_name}
							lastname={this.state.user?.last_name} />
					</div>
					{!this.state.isLoading && (
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
								<Card className={classes.chartCard}>
									<CardContent>
										{this.state.isLoading && <CircularProgress />}
										{!this.state.isLoading && (
											<PieChartComponent data={this.state.data} />
										)}
									</CardContent>
								</Card>
								<Card>
									<CardContent className={classes.chartCard}>
										{this.state.isLoading && <CircularProgress />}
										{!this.state.isLoading && (
											<BarChartComponent data={this.state.spending} />
										)}
									</CardContent>
								</Card>
								<Card>
									<CardContent className={classes.chartCard}>
										{this.state.isLoading && <CircularProgress />}
										{!this.state.isLoading && (
											<BarChartComponent data={this.state.months} />
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

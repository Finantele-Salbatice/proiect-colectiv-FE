import { Card, CardContent, createStyles, Icon, Typography, withStyles ,Button } from '@material-ui/core';
import * as React from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import NavBar from 'src/components/NavBar';
import MyAppBar from 'src/components/AppBar';
import PieChartComponent from 'src/components/PieChart';
import ServiceApi from 'src/remote/ServiceApi';
import jwt_decode from "jwt-decode";
import type { User } from 'src/entity/User';

export interface MainPageProps {
  classes: any;
}

export interface MainPageState {
	isLoading: boolean;
	pageTitle: string;
	user?: User | null;
	data?: any;
}

const styles = createStyles({
	container: {
		display:'inline-flex',
		flexDirection:'column',
	},
	cardBox: {
		display:'inline-block',
	},
	welcomeCard: {
		width:'100%',
		position:'relative',
		left:'170px',
		top:'30px',
	},
	pieCard : {
		width:'100%',
		position:'relative',
		left:'170px',
		top:'40px',
		verticalAlign: 'center',
	},
	welcomeCardIcon : {
		width:'40px',
		height:'40px',
	},
	button:{
		//marginLeft:'1340px',
		marginLeft:'1100px',
		//zIndex:1,
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
		}
		this.service = new ServiceApi();
	}
	
	async componentDidMount() {
		const user = await this.getUserInfo();
		const data = await this.getSolds(user);
		this.setState({
			...this.state,
			isLoading: false,
			user: user,
			data: data,
		});
	}
	
	adaugaCont = async(bank: string)=>{
		try {
			const data = {
				bank:bank,
			};
			const result = await this.service.addAccount(data);
			const link = result.data;
			window.location.replace(link);
		} catch {
		}
	}

	getUserInfo = async () => {
		const token = localStorage.getItem('token');
		if(token !== null){
			var decodeToken = JSON.stringify(jwt_decode(token));
			var userId = Number(JSON.parse(decodeToken).userId);
			const result = await this.service.userInfoRequest({'user' : userId});
			return result.data;
		}
	}

	getSolds = async (user : User) => {
		const userId = {'userId' : user.id};
		const body = {'user' : userId};
		const accounts = await this.service.accountListRequest(JSON.stringify(body));
		var labels: string[] = [];
		var values: Number[] = [];
		accounts.data.forEach((account: { bank: string; iban: string; currency: Number; }) => {
			labels.push(account.bank+" "+account.iban);
			values.push(account.currency);
		});
		const data = {
			labels : labels,
			datasets: [{
				data: values,
			}],
		};
		/*const data = {
			labels: ['Cont1','Cont2','Cont3','Cont4','Cont5'],
			datasets: [{
				data: [300, 50, 100,98,74],
			}],
		};*/
		return data;
	}

	render() {
		const { classes } = this.props;;
		return (
			<div className = {classes.conatiner}>
				<div>
					<MyAppBar 
						pageTitle={this.state.pageTitle} 
						firstname={this.state.user?.first_name} 
						lastname={this.state.user?.last_name}
					/>
					<Button variant="contained" color="primary"  className={classes.button} onClick={() => this.adaugaCont('bt')}>
						  Adauga BT
					</Button>
				</div>
				<div className = {classes.navBar}>
					<NavBar />
				</div>
				{!this.state.isLoading && (
					<div className = {classes.cardBox}>
						<Card
							className = {classes.welcomeCard}
						>
							<CardContent>
								<Icon><InsertEmoticonIcon className = {classes.welcomeCardIcon}/></Icon>
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
						<Card className = {classes.pieCard}>
							<CardContent>
								{!this.state.isLoading && (
									<PieChartComponent data = {this.state.data}/>
								)}
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		);
	}
}
export default withStyles(styles)(MainPage);
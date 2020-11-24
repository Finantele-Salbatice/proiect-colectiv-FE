import { Card, CardContent, createStyles, Icon, Typography, withStyles ,Button } from '@material-ui/core';
import * as React from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import NavBar from 'src/components/NavBar';
import MyAppBar from 'src/components/AppBar';
import PieChartComponent from 'src/components/PieChart';
import ServiceApi from 'src/remote/ServiceApi';

export interface MainPageProps {
  classes: any;
}

export interface MainPageState {
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
		verticalAlign: 'center'
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
	private service : ServiceApi;
	constructor(props: MainPageProps) {
		super(props);
		this.service = new ServiceApi();
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

	getSolds = () => {
		const data = {
			labels: ['Cont1','Cont2','Cont2','Cont3','Cont4'],
			datasets: [{
				data: [300, 50, 100,98,74],
			}]
		};
		return data;
	}

	render() {
		const { classes } = this.props;
		const data = this.getSolds();
		return (
			<div className = {classes.conatiner}>
				<div>
					<MyAppBar pageTitle="Home" firstname="Georgel" lastname="Popescu"/>
					<Button variant="contained" color="primary"  className={classes.button} onClick={() => this.adaugaCont('bt')}>
 						 Adauga BT
					</Button>
				</div>
				<div className = {classes.navBar}>
					<NavBar />
				</div>
				<div className = {classes.cardBox}>
					<Card
						className = {classes.welcomeCard}
					>
						<CardContent>
							<Icon><InsertEmoticonIcon className = {classes.welcomeCardIcon}/></Icon>
							<Typography variant="h5" component="h2">
							Bine ai venit, {'"*introdu nume aici*"'} !
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
							<PieChartComponent data = {data}/>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(MainPage);
import { Card, CardContent, createStyles, Icon, Typography, withStyles ,Button } from '@material-ui/core';
import * as React from 'react';
import axios, { AxiosInstance } from 'axios';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Redirect } from 'react-router-dom';
import NavBar from 'src/components/NavBar';
import MyAppBar from 'src/components/AppBar';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;

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
	welcomeCardIcon : {
		width:'40px',
		height:'40px',
	},
	button:{
		marginLeft:'1340px',
		//zIndex:1,
	},
});
class MainPage extends React.Component<MainPageProps, MainPageState> {
	instance: AxiosInstance;
	constructor(props: MainPageProps) {
		super(props);
		this.instance = axios.create({
			baseURL: SNOWPACK_PUBLIC_API_URL,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	}
	adaugaCont = async(bank: string)=>{
		try {
			const data = {
				bank:bank,
			};
			const result = await this.instance.post('/account/add',data);
			const link = result.data;
			return <Redirect to={link}/>;
		} catch {
		}
	}
	render() {
		const { classes } = this.props;
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
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(MainPage);
import { Card, CardContent, createStyles, Icon, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import NavBar from '../components/NavBar';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MyAppBar from '../components/AppBar';

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
});
class MainPage extends React.Component<MainPageProps, MainPageState> {
	render() {
		const { classes } = this.props;
		return (
			<div className = {classes.conatiner}>
				<div>
					<MyAppBar pageTitle="Home" firstname="Georgel" lastname="Popescu"/>
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
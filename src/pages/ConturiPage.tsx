import { Button, Card, CardContent, createStyles, Icon, Typography } from '@material-ui/core';
import * as React from 'react';
import { Component } from 'react';
import MyAppBar from 'src/components/AppBar';
import NavBar from 'src/components/NavBar';
import Cont from 'src/components/Cont';
import classes from '*.module.css';
import withStyles from '@material-ui/core/styles/withStyles';

export interface ConturiPageProps {
    classes: any;
}

export interface ConturiPageState {

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

class ConturiPage extends React.Component<ConturiPageProps, ConturiPageState> {
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
					<div className={classes.welcomeCard}>
					    <Cont iban={'1234-1234-124-124'} sold={123} banca={'Bt'} descriere={'Dragos are mere si merele sunt bune'}></Cont>
						<Cont iban={'1234-1234-124-124'} sold={123} banca={'Bt'} descriere={'Dragos are mere si merele sunt bune'}></Cont>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(ConturiPage);
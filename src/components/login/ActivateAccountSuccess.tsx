import * as React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { Button, CardActions } from '@material-ui/core';
import { Card, CardContent, Typography, Icon } from '@material-ui/core';

export interface ActivateAccountSuccessProps {
    classes: any;
    redirect(): void;
}

export interface ActivateAccountSuccessState {
	redirect: boolean;
}

const styles = createStyles({
	icon : {
		color:'green',
		height:'50px',
		width:'auto',
		marginBottom:'10px',
	},
	iconRow : {
		borderBottom:'1px solid grey',
		marginLeft:'46%',
	},
	buttonRow : {
		textAlign:'center',
		marginTop:'30px',
		borderTop:'1px solid grey',
		paddingTop:'20px',
	},
	button : {
		backgroundColor:'green',
		'&:hover' : {
			backgroundColor:'green',
		},
		color:'white',
		margin:'auto',
	},
	cardBox: {
		display:'inline-block',
		marginTop:'100px',
		marginLeft:'6%',
	},
	welcomeCard: {
		width:'100%',
		position:'relative',
		left:'170px',
		top:'30px',
	},
	cardText:{
		textAlign:'center',
	},
});

class ActivateAccountSuccess extends React.Component<ActivateAccountSuccessProps, ActivateAccountSuccessState> {

	state = {
		redirect: false,
	}
	render() {
		const { classes } = this.props;
		return (
			<div className = {classes.cardBox}>
				<Card
					className = {classes.welcomeCard}
				>
					<CardContent>
						<Icon className={classes.iconRow}>
							<DoneOutlineOutlinedIcon
								className = {classes.icon}
							/></Icon>
						<Typography variant="h5" component="h2">
					Felicitari, contul dumneavoastra a fost activat cu succes !
						</Typography>
						<Typography variant="body2" component="p" className={classes.cardText}>
							<br />
						Bun venit in jungla finantele salbatice !
							<br />
							<br />
						Va multumim ca aveti incredere sa folositi aplicatia noastra !
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" className={classes.button} onClick={() => this.props.redirect()}>Mergi catre pagina principala din aplicatie</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(ActivateAccountSuccess);
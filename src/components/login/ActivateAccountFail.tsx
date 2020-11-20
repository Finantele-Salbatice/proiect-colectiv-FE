import * as React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import { Button, Card, CardActions, CardContent, Icon, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

export interface ActivateAccountFailProps {
	classes: any;
	link: string;
}

export interface ActivateAccountFailState {
	redirect: boolean;
}

const styles = createStyles({
	icon : {
		color:'red',
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
		backgroundColor:'red',
		'&:hover' : {
			backgroundColor:'red',
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

class ActivateAccountFail extends React.Component<ActivateAccountFailProps, ActivateAccountFailState> {
	state = {
		redirect: false,
	}

	setRedirect = () => {
		this.setState({
			redirect: true,
		});
	}
	renderRedirect = () => {
		if (this.state.redirect) {
		  return <Redirect to={this.props.link}/>;
		}
	}
	render() {
		const { classes } = this.props;
		return (
			<div className = {classes.cardBox}>
				{this.renderRedirect()}
				<Card
					className = {classes.welcomeCard}
				>
					<CardContent>
						<Icon className={classes.iconRow}>
							<ThumbDownAltOutlinedIcon
								className = {classes.icon}
							/></Icon>
						<Typography variant="h5" component="h2">
					Din pacate, contul dumneavoastra nu a putut fi activat !
						</Typography>
						<Typography variant="body2" component="p" className={classes.cardText}>
							<br />
						Ne cerem scuze pentru incovenienta !
							<br />
							<br />
						Va multumim pentru intelegere !
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" className={classes.button} onClick={this.setRedirect}>Mergi catre pagina principala</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(ActivateAccountFail);


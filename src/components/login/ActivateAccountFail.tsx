import * as React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import { Button } from '@material-ui/core';

export interface ActivateAccountFailProps {
    classes: any;
}

export interface ActivateAccountFailState {}

const styles = createStyles({
	icon : {
		color:'red',
		height:'50px',
		width:'auto',
		marginBottom:'10px',
	},
	mainBox : {
		position:'relative',
		marginLeft:'33%',
		marginTop:'100px',
		display:'inline-flex',
		flexDirection:'column',
		padding:'40px',
		paddingTop:'25px',
		border:'1px solid grey',
		borderRadius:'5px',
		backgroundColor:'#f2f2f2',
		boxShadow:'5px 10px 8px #888888',
	},
	text : {
		margin:'auto',
		marginTop:'30px',
	},
	iconRow : {
		borderBottom:'1px solid grey',
		textAlign:'center',
	},
	textRow1 : {
		margin:'auto',
		textAlign:'center',
	},
	textRow2 : {
		margin:'auto',
		marginTop:'20px',
		textAlign:'center',
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
	},
});

class ActivateAccountFail extends React.Component<ActivateAccountFailProps, ActivateAccountFailState> {
	render() {
		const { classes } = this.props;
		return (
			<div className = {classes.mainBox}>
				<div className = {classes.iconRow}>
					<ThumbDownAltOutlinedIcon
						className = {classes.icon}
					/>
				</div>
				<div className = {classes.text}>
					<p className = {classes.textRow1}>
                        Contul dumneavoastra nu a putut fi activat !
					</p>
					<p className = {classes.textRow2}>
                          Ne cerem scuze pentru inconvenienta !
					</p>
				</div>
				<div className = {classes.buttonRow}>
					<Button
						className = {classes.button}
						variant="contained"
						color="primary"
						href="/">
                        Mergeti inapoi la pagina de logare
					</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(ActivateAccountFail);
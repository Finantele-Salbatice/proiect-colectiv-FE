import * as React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { Button } from '@material-ui/core';

export interface ActivateAccountSuccessProps {
    classes: any;
    redirect(): void;
}

export interface ActivateAccountSuccessState {}

const styles = createStyles({
	icon : {
		color:'green',
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
		backgroundColor:'#ffffcc',
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
		backgroundColor:'green',
		'&:hover' : {
			backgroundColor:'green',
		},
	},
});

class ActivateAccountSuccess extends React.Component<ActivateAccountSuccessProps, ActivateAccountSuccessState> {
	render() {
		const { classes } = this.props;
		return (
			<div className = {classes.mainBox}>
				<div className = {classes.iconRow}>
					<DoneOutlineOutlinedIcon
						className = {classes.icon}
					/>
				</div>
				<div className = {classes.text}>
					<p className = {classes.textRow1}>
                        Contul dumneavoastra a fost activat cu succes !
					</p>
					<p className = {classes.textRow2}>
                          Bine ati venit in jungla Finantele Salbatice !
					</p>
				</div>
				<div className = {classes.buttonRow}>
					<Button
						className = {classes.button}
						variant="contained"
						color="primary"
						onClick={() => this.props.redirect()}
					>
                        Mergeti la pagina principala
					</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(ActivateAccountSuccess);
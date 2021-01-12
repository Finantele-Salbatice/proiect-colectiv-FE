import { Card, CardContent, createStyles, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface ContProps {
    sold: number;
    banca: string;
	iban: string;
	descriere: string;
    classes: any;
}

export interface ContState {
}

const styles = createStyles({
	root: {
		display: 'flex',
	},
	pozaBox:{
		display:'inline-block'
	},
	image:{
		width:'140px',
		height:'140px',
	},
	contBox: {
		display:'inline-flex',
		flexDirection:'row',
	},
	dateBox: {
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between'
	},
	soldBox: {
		display:'flex',
		flexDirection:'column',
		marginRight:'4%',
		justifyContent:'center'
	},
	descriereL: {
		display:'flex',
		justifyContent:'center',
		marginBottom:'1%'
	},
	descriereBox: {
		display:'flex',
		flexDirection:'column',
		justifyContent:'center',
		paddingRight:'20px'
	},
	descriere: {
		display:'',
		textAlign:'center'
	}
});

class Cont extends React.Component<ContProps, ContState> {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Paper style={{display:'inline-block'}}>
					<div className={classes.contBox}>
						<div className={classes.pozaBox}>
							<img src={this.props.banca + '.jpg'} className={classes.image} />
						</div>
						<div className={classes.soldBox}>
							<div className={classes.descriereL}>
								IBAN
							</div>
							<div className={classes.descriere}>
								{this.props.iban}
							</div>
						</div>
						<div className={classes.soldBox}>
							<div className={classes.descriereL}>
								SOLD
							</div>
							<div className={classes.descriere}>
								{this.props.sold}
							</div>
						</div>
						<div className={classes.descriereBox}>
							<div className={classes.descriereL}>
								DESCRIERE
							</div>
							<div className={classes.descriere}>
								{this.props.descriere}
							</div>
						</div>
					</div>
				</Paper>
			</div>

		);
	}
}

export default withStyles(styles)(Cont);
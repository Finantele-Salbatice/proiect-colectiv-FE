import { Card, CardContent, createStyles, Typography, withStyles } from '@material-ui/core';
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
	image:{
		width:'140px',
		height:'140px',
	},
});

class Cont extends React.Component<ContProps, ContState> {
	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.root}>
				<div>
					<img src={this.props.banca + '.jpg'} className={classes.image}></img>
				</div>
				<CardContent>
					<Typography component="h5" variant="h5">
                            IBAN:{this.props.iban}
					</Typography>
					<Typography component="h5" variant="h5">
                            Sold:{this.props.sold}
					</Typography>
					<Typography component="h5" variant="h5">
                            Descirere:{this.props.descriere}
					</Typography>
				</CardContent>
			</Card>

		);
	}
}

export default withStyles(styles)(Cont);
import { Card, CardContent, createStyles, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import NavBar from '../components/login/NavBar';

export interface MainPageProps {
  classes: any;
}

export interface MainPageState {
}

const styles = createStyles({
	container: {
		height:'100%',
	},
	test:{
		wheight:'100%',
		height:'200px',
		backgroundColor:'red',
	},
	test2:{
		marginTop:'200px',
	},
});
class MainPage extends React.Component<MainPageProps, MainPageState> {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<NavBar></NavBar>
				<Card>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
						</Typography>
						<Typography variant="h5" component="h2">
          benevolent
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
          adjective
						</Typography>
						<Typography variant="body2" component="p">
          well meaning and kindly.
							<br />
							{'"a benevolent smile"'}
						</Typography>
					</CardContent>
				</Card>
			</div>
		);
	}
}
export default withStyles(styles)(MainPage);
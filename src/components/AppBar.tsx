import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

export interface AppBarProps {
    classes: any;
    pageTitle: string;
    firstname: string;
    lastname: string;
}

export interface AppBarState{

}
const styles = createStyles({
	root: {
		flexGrow: 1,
		display: 'flex',
	},
	title: {
		flexGrow : 1,
		display: 'inline-flex',
		marginLeft: '150px',
	},
	username: {
		marginLeft: '2px',
		display: 'inline-flex',
	},
	avatar: {
		display: 'inline-flex',
		backgroundColor: 'inherit',
	},
});

export class MyAppBar extends React.Component<AppBarProps,AppBarState> {
	render() {
		const { classes,pageTitle, firstname, lastname } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							{pageTitle}
						</Typography>
						<div>
							<Avatar className={classes.avatar}>
								<AccountCircle/>
							</Avatar>
							<Typography variant="h6" className={classes.username}>
								{`${firstname} ${lastname}`}
							</Typography>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(MyAppBar);
import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button, MenuItem, Menu } from '@material-ui/core';
import ServiceApi from 'src/remote/ServiceApi';

export interface AppBarProps {
    classes: any;
    pageTitle: string;
    firstname?: string;
    lastname?: string;
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
	},
	username: {
		marginLeft: '2px',
		display: 'inline-flex',
	},
	avatar: {
		display: 'inline-flex',
		backgroundColor: 'inherit',
	},
	buttonRow: {
		display:'flex',
		flexDirection:'row'
	}
});

export class MyAppBar extends React.Component<AppBarProps,AppBarState> {
	private service: ServiceApi;
	constructor(props: AppBarProps) {
		super(props);
		this.state = {
			isLoading: true,
			pageTitle: 'Home',
			user: null,
			data: null,
			tranzactii: null,
		};
		this.service = new ServiceApi();
	}

	adaugaCont = async(bank: string)=>{
		const data = {
			bank:bank,
		};
		const result = await this.service.addAccount(data);
		const link = result.data;
		if (bank === 'brd') {
			const baseURL = window.location.origin;
			window.location.replace(`${baseURL}` + '/main');
		} else {
			window.location.replace(link);
		}
	}

	render() {
		const { classes,pageTitle, firstname, lastname } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							{pageTitle}
						</Typography>
						<div className={classes.buttonRow}>
							<div>
								<PopupState variant="popover" popupId="demo-popup-menu">
								{(popupState:any) => (
									<React.Fragment>
									<Button variant="contained" color="primary" {...bindTrigger(popupState)}>
										Adauga Cont
									</Button>
									<Menu {...bindMenu(popupState)}>
										<MenuItem onClick={() => this.adaugaCont('bt')}>Adauga BT</MenuItem>
										<MenuItem onClick={() => this.adaugaCont('bcr')}>Adauga BCR</MenuItem>
										<MenuItem onClick={() => this.adaugaCont('brd')}>Adauga BRD</MenuItem>
									</Menu>
									</React.Fragment>
								)}
								</PopupState>
							</div>
							<div>
								<Avatar className={classes.avatar}>
									<AccountCircle/>
								</Avatar>
								{firstname && lastname && (
									<Typography variant="h6" className={classes.username}>
										{`${firstname} ${lastname}`}
									</Typography>
								)}
							</div>
						</div>
					);
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(MyAppBar);
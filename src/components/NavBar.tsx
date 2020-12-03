import { Button, createStyles, Drawer, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import * as React from 'react';
import List from '@material-ui/core/List';
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Link } from 'react-router-dom';

export interface NavBarProps {
	classes: any;
}

export interface NavBarState {
}

const styles = createStyles({
	drawer: {
		width: '240px',
		flexShrink: 0,
	},
	drawerBox : {
		display:'inline-block',
	},
	logo:{
		maxWidth:'100px',
		marginBottom:'30px',
	},
	logoutBtn:{
		width: '100%', 
		height: 50, 
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,

	},
});

class NavBar extends React.Component<NavBarProps, NavBarState> {
    state = {
	}

    render() {
		const { classes } = this.props;

		function handleLogout(){
			localStorage.removeItem('token');
			const baseURL = window.location.origin;
			window.location.replace(`${baseURL}`);
		}

    	return (
    		<div className={classes.drawerBox}>
    			<Drawer
    				variant="permanent"
    			>
    				<List>
    					<ListItem key={0}>
    						<img src="logo.png" alt="logo" className={classes.logo} />
    					</ListItem>
    					<ListItem button key={1}>
    						<ListItemIcon> <AccountBalanceTwoToneIcon /></ListItemIcon>
    						<Link to="/main">
								<ListItemText primary={'Home'} />
							</Link>
    					</ListItem>
    					<ListItem button key={2}>
    						<ListItemIcon> <AccountBalanceWalletIcon /></ListItemIcon>
    						<Link to="/tranzactii">
								<ListItemText primary={'Tranzactii'} />
							</Link>
    					</ListItem>
    					<ListItem button key={3}>
    						<ListItemIcon> <AccountBoxIcon /></ListItemIcon>
							<Link to="/conturi">
								<ListItemText primary={'Conturi'} />
							</Link>
    					</ListItem>
    				</List>
					<Button 
						className = {classes.logoutBtn} 
						variant="contained" 
						color="primary"
						onClick={() => handleLogout()}>Logout</Button>
    			</Drawer>
    		</div>
    	);
    }
}
export default withStyles(styles)(NavBar);
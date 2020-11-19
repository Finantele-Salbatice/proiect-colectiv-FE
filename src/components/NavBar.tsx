import { createStyles, Drawer, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import * as React from 'react';
import List from '@material-ui/core/List';
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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
});

class NavBar extends React.Component<NavBarProps, NavBarState> {
    state = {
    }

    render() {
    	const { classes } = this.props;
    	return (
    		<div className={classes.drawerBox}>
    			<Drawer
    				variant="permanent"
    			>
    				<List>
    					<ListItem button key={1}>
    						<ListItemIcon> <AccountBalanceTwoToneIcon /></ListItemIcon>
    						<ListItemText primary={'Home'} />
    					</ListItem>
    					<ListItem button key={2}>
    						<ListItemIcon> <AccountBalanceWalletIcon /></ListItemIcon>
    						<ListItemText primary={'Tranzactii'} />
    					</ListItem>
    					<ListItem button key={3}>
    						<ListItemIcon> <AccountBoxIcon /></ListItemIcon>
    						<ListItemText primary={'Conturi'} />
    					</ListItem>
    				</List>
    			</Drawer>
    		</div>
    	);
    }
}
export default withStyles(styles)(NavBar);
import { createStyles, List, ListItem } from '@material-ui/core';
import * as React from 'react';
import MyAppBar from 'src/components/AppBar';
import NavBar from 'src/components/NavBar';
import Cont from 'src/components/Cont';
import withStyles from '@material-ui/core/styles/withStyles';
import ServiceApi from 'src/remote/ServiceApi';
import type { User } from 'src/entity/User';

export interface ConturiPageProps{
	classes: any;
}

export interface ConturiPageState {
	isLoading: boolean;
	pageTitle: string;
	user?: User | null;
	list: any;
}

const styles = createStyles({
	bigCont: {
		display:'flex',
		flexDirection:'row',
	},
	container: {
		display:'inline-flex',
		flexDirection:'column',
		width:'100%',
	},
	cardBox: {
		marginTop:'1%',
		width:'100%',
		marginLeft:'1%',
	},
});

class ConturiPage extends React.Component<ConturiPageProps, ConturiPageState> {
	private service: ServiceApi;
	constructor(props: ConturiPageProps) {
		super(props);
		this.state = {
			isLoading: true,
			pageTitle: 'Conturi',
			user: null,
			list: [],
		};
		this.service = new ServiceApi();
	}

	getUserInfo = async() => {
		const user = localStorage.getItem('user');
		if (user !== null) {
			return JSON.parse(user);
		}
		const result = await this.service.userInfoRequest();
		localStorage.setItem('user',JSON.stringify(result.data));
		return result.data;
	}

	async componentDidMount() {
		const user = await this.getUserInfo();
		const userId = {
			'userId' : user.id,
		};
		const body = {
			'user' : userId,
		};
		const accounts = await this.service.accountListRequest(JSON.stringify(body));
		this.setState({
			...this.state,
			list:accounts.data,
			user: user,
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div className = {classes.bigCont}>
				<div>
					<NavBar />
				</div>
				<div className={classes.container}>
					<MyAppBar
						pageTitle={this.state.pageTitle}
						firstname={this.state.user?.first_name}
						lastname={this.state.user?.last_name}
					/>
					<div className = {classes.cardBox}>
						<List>
						{
							this.state.list.map((elem: any, index: any)=>{
								return (
									<ListItem>
											<Cont 
											key={index} 
											iban={elem.iban} 
											sold={elem.balance} 
											banca={elem.bank} 
											descriere={elem.description} 
											/>
									</ListItem>
								);
							})
						}
						</List>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(ConturiPage);
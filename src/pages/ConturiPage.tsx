import { createStyles } from '@material-ui/core';
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
	container: {
		display:'inline-flex',
		flexDirection:'column',
	},
	cardBox: {
		display:'inline-block',
	},
	welcomeCard: {
		width:'100%',
		position:'relative',
		left:'170px',
		top:'30px',
	},
	welcomeCardIcon : {
		width:'40px',
		height:'40px',
	},
	button:{
		marginLeft:'1340px',
		//zIndex:1,
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
			<div className = {classes.conatiner}>
				<div>
					<MyAppBar
						pageTitle={this.state.pageTitle}
						firstname={this.state.user?.first_name}
						lastname={this.state.user?.last_name}
					/>
				</div>
				<div className = {classes.navBar}>
					<NavBar />
				</div>
				<div className = {classes.cardBox}>
					<div className={classes.welcomeCard}>
						{
							this.state.list.map((elem: any, index: any)=>{
								return <Cont key={index} iban={elem.iban} sold={elem.balance} banca={elem.bank} descriere={elem.description}></Cont>;
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(ConturiPage);
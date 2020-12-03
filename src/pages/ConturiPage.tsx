import { createStyles } from '@material-ui/core';
import * as React from 'react';
import MyAppBar from 'src/components/AppBar';
import NavBar from 'src/components/NavBar';
import Cont from 'src/components/Cont';
import withStyles from '@material-ui/core/styles/withStyles';
import ServiceApi from 'src/remote/ServiceApi';
import jwt_decode from "jwt-decode";
import type { User } from 'src/entity/User';

export interface ConturiPageProps{
	classes: any;
}

export interface ConturiPageState {
	isLoading: boolean;
	pageTitle: string;
	user?: User | null;
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
		}
		this.service = new ServiceApi();
	}

	getUserInfo = async () => {
		const token = localStorage.getItem('token');
		if(token !== null){
			var decodeToken = JSON.stringify(jwt_decode(token));
			var userId = Number(JSON.parse(decodeToken).userId);
			const result = await this.service.userInfoRequest({'user' : userId});
			return result.data;
		}
	}

	async componentDidMount() {
		const user = await this.getUserInfo();
		this.setState({
			...this.state,
			isLoading: false,
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
					    <Cont iban={'1234-1234-124-124'} sold={123} banca={'Bt'} descriere={'Dragos are mere si merele sunt bune'}></Cont>
						<Cont iban={'1234-1234-124-124'} sold={123} banca={'Bt'} descriere={'Dragos are mere si merele sunt bune'}></Cont>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(ConturiPage);
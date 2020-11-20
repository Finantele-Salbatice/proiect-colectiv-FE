import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;
import ActivateAccountSuccess from '../components/login/ActivateAccountSuccess';
import ActivateAccountFail from '../components/login/ActivateAccountFail';
import { CircularProgress } from '@material-ui/core';

interface MatchParams {
	token: string;
}

export interface ActivateAccountPageProps extends RouteComponentProps<MatchParams> {}

export interface ActivateAccountPageState {
	result: boolean;
	isLoading: boolean;
}

class ActivateAccountPage extends React.Component<ActivateAccountPageProps, ActivateAccountPageState> {
    instance: AxiosInstance;

    constructor(props: ActivateAccountPageProps) {
    	super(props);

    	this.state = {
			result: true,
			isLoading:true,
    	};

    	this.instance = axios.create({
    		baseURL: SNOWPACK_PUBLIC_API_URL,
    	});
    }

    getResult = async()  => {
    	try {
    		const { token } = this.props.match.params;
    		await this.instance.post('/activate', {
    			token,
    		});
    		this.setState({
    			isLoading:false,
			});
    	} catch (err) {
    		this.setState({
    			result:false,
    			isLoading:false,
    		});
    	}
    }

    componentDidMount() {
    	this.getResult();
	}

    render() {
		if(this.state.isLoading) {
			return (
				<CircularProgress style={{marginLeft:'48%', marginTop:'20%'}}/>
			)
		}
		else {
			if (this.state.result) {
				return (
					<div>
						<ActivateAccountSuccess
							{...this.state}
							link='/main'
						></ActivateAccountSuccess>
					</div>
				);
			} else {
				return (
					<div>
						<ActivateAccountFail
							{...this.state}
							link=''
						></ActivateAccountFail>
					</div>
				);
			}
		}
    }

}

export default withRouter(ActivateAccountPage);
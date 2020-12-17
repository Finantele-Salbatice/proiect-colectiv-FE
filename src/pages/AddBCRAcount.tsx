import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse } from 'qs';
import  ServiceApi from 'src/remote/ServiceApi';

interface MatchParams {
	id: string;
}

export interface AddBCRAccountProps extends RouteComponentProps<MatchParams> {}

export interface AddBCRAccountState {
    redirect: boolean;
}

class AddBCRAccount extends React.Component<AddBCRAccountProps, AddBCRAccountState> {
    private service: ServiceApi = new ServiceApi;
    constructor(props: AddBCRAccountProps) {
    	super(props);
    	this.state = {
    		redirect: false,
    	};
    	this.service = new ServiceApi();
    }
    async callback(params: any) {
    	await this.service.addBCRAccountRequest(params);
    	this.props.history.push('/main');
    }

    async componentDidMount() {
    	const query = parse(this.props.location.search, {
    		ignoreQueryPrefix: true,
    	});
    	await this.callback(query);
    }

    render() {
    	return ( <div>
                Loading....
    	</div> );
    }
}

export default withRouter(AddBCRAccount);
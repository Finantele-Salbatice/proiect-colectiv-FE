import axios, { AxiosInstance } from 'axios';
// eslint-disable-next-line @typescript-eslint/naming-convention
const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;

class ServiceApi {
    private instance: AxiosInstance;
    private authInstance: AxiosInstance;
    constructor() {
    	this.instance = axios.create({
    		baseURL: SNOWPACK_PUBLIC_API_URL,
    	});

    	this.authInstance = axios.create({
    		baseURL: SNOWPACK_PUBLIC_API_URL,
    		headers: {
    			Authorization: `Bearer ${localStorage.getItem('token')}`,
    		},
    	});
    }

    async loginRequest(body: any) {
    	return this.instance.post('/login', body);
    }

    async registerRequest(body: any) {
    	return this.instance.post('/register', body);
    }

    async activateAccountRequest(token: string) {
    	return this.instance.post('/activate', {
    		token,
    	});
    }
    async resetRequest(body: any) {
    	return this.instance.post('/reset', body);
    }

    async changeRequest(body: any) {
    	return this.instance.post('/updatePassword', body);
    }

    async addBTAccountRequest(body: any) {
    	return this.instance.post('/account/btcallback', body);
    }

    async addBCRAccountRequest(body: any) {
    	return this.instance.post('/account/bcrcallback', body);
    }

    async addAccount(body: any): Promise<any> {
    	return this.authInstance.post('/account/add',body);
    }

    async getAllTransactions(body: any): Promise<any> {
    	const c = await this.authInstance.post('/transactions/list',body);
    	return c.data;
    }
    async accountListRequest(body: any): Promise<any> {
    	return this.authInstance.post('/account/list',body);
    }

    async userInfoRequest(): Promise<any> {
    	return this.authInstance.post('/info');
    }

    async getLastFiveTransactions(body: any): Promise<any> {
    	return this.authInstance.post('/transactions/list',body);
    }
}
export default ServiceApi;
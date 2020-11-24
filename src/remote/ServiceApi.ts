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
    	return await this.instance.post('/login', body);
    }

    async registerRequest(body: any) {
    	return await this.instance.post('/register', body);
    }

    async activateAccountRequest(token: string) {
    	return await this.instance.post('/activate', {
    		token,
    	});
    }
    async resetRequest(body: any) {
    	return await this.instance.post('/reset', body);
    }

    async changeRequest(body: any) {
    	return await this.instance.post('/updatePassword', body);
    }

    async addBTAccountRequest(body: any) {
    	return await this.instance.post('/account/btcallback', body);
    }

    async addAccount(body: any): Promise<any> {
    	await this.authInstance.post('/account/add',body);
    }
}
export default ServiceApi;
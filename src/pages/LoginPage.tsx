import * as React from 'react';
import Login from '../components/login/Login';
import axios, { AxiosInstance } from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;

interface LoginPageProps extends RouteComponentProps {}

interface LoginPageState {
  password: string;
  email: string;
  isError: boolean;
  errorMessage: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  instance: AxiosInstance;
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      password: '',
      email: '',
      isError: false,
      errorMessage: 'Parola nu este corecta.',
    };
    this.instance = axios.create({
      baseURL: SNOWPACK_PUBLIC_API_URL,
    });
  }

  handleChange = (data: any) => {
    this.setState({
      ...data,
      isError: false,
    });
  };
  clearUserData() {
    this.setState({
      password: '',
      isError: true,
    });
  }

  submit = async () => {
    try {
      const result = await this.instance.post('/login', this.state);
      const data = result.data;
      console.log('E bine,', data);
      this.props.history.push('/reset');
    } catch (error) {
      const { response } = error;
      console.log(response.data); // make some text appear if this error is received
      this.setState({
        isError: true,
      });
      this.clearUserData();
    }
  };

  render() {
    return (
      <div>
        <Login
          {...this.state}
          handleChange={this.handleChange}
          submit={this.submit}
        ></Login>
      </div>
    );
  }
}

export default withRouter(LoginPage);

import React from 'react';
import Register from 'src/components/login/Register';
import validator from 'validator';
import type { RouteComponentProps } from 'react-router-dom';
import ServiceApi from 'src/remote/ServiceApi';

export interface RegisterPageProps extends RouteComponentProps {}

export interface RegisterPageState {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  passwordConfirm: string;
  isFirstNameError: boolean;
  isLastNameError: boolean;
  isEmailError: boolean;
  isPasswordError: boolean;
  isPasswordConfirmError: boolean;
  firstNameErrorMessage: string;
  lastNameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  passwordConfirmErrorMessage: string;
}

class RegisterPage extends React.Component<
  RegisterPageProps,
  RegisterPageState
> {
  private service: ServiceApi;
  constructor(props: RegisterPageProps) {
  	super(props);
  	this.state = {
  		firstName: '',
  		lastName: '',
  		email: '',
  		password: '',
  		passwordConfirm: '',
  		isFirstNameError: false,
  		isLastNameError: false,
  		isEmailError: false,
  		isPasswordError: false,
  		isPasswordConfirmError: false,
  		firstNameErrorMessage:'',
  		lastNameErrorMessage:'',
  		emailErrorMessage:'',
  		passwordErrorMessage:'',
  		passwordConfirmErrorMessage:'',
  	};

  	this.service = new ServiceApi();
  }

  handleChange = (data: any) => {
  	this.setState({
  		...data,
  	});
  };

  submit = async() => {
  	this.validate();
  	const body = {
  		first_name: this.state.firstName,
  		last_name: this.state.lastName,
  		password: this.state.password,
  		email: this.state.email,
  	};
  	try {
  		await this.service.registerRequest(body);
  		this.props.history.push('/');
  	} catch (err) {
  		console.log(err.data);
  	}
  };

  validate = () => {
  	let val = true;

  	if (this.state.firstName.length === 0) {
  		this.setState({
  			isFirstNameError:true,
  			firstNameErrorMessage: 'Va rog introduceti un nume',
  		});
  		val = false;
  	} else if (!this.state.firstName.match(/^[a-zA-Z]+$/)) {
  		this.setState({
  			isFirstNameError:true,
  			firstNameErrorMessage: 'Numele trebuie sa contina doar litere',
  		});
  		val = false;
  	} else {
  		this.setState({
  			isFirstNameError:false,
  			firstNameErrorMessage: '',
  		});
  	}

  	if (this.state.lastName.length === 0) {
  		this.setState({
  			isLastNameError:true,
  			lastNameErrorMessage: 'Va rog introduceti un prenume',
  		});
  		val = false;
  	} else if (!this.state.lastName.match(/^[a-zA-Z]+$/)) {
  		this.setState({
  			isLastNameError:true,
  			lastNameErrorMessage: 'Prenumele trebuie sa contina doar litere',
  		});
  		val = false;
  	} else {
  		this.setState({
  			isLastNameError:false,
  			lastNameErrorMessage: '',
  		});
  	}

  	if (this.state.email.length === 0) {
  		this.setState({
  			isEmailError: true,
  			emailErrorMessage: 'Va rog introduceti un email',
  		});
  		val = false;
  	} else if (!validator.isEmail(this.state.email)) {
  		this.setState({
  			isEmailError:true,
  			emailErrorMessage: 'Email-ul este invalid',
  		});
  		val = false;
	  } else {
  		this.setState({
  			isEmailError:false,
  			emailErrorMessage: '',
  		});
  	}

  	if (this.state.password.length < 5) {
  		this.setState({
  			isPasswordError:true,
  			passwordErrorMessage: 'Parola trebuie sa contina cel putin 5 caractere',
  		});
  		val = false;
  	} else {
  		if (this.state.password !== this.state.passwordConfirm) {
  			this.setState({
  				isPasswordError:true,
  				isPasswordConfirmError:true,
  				passwordErrorMessage: 'Parolele nu sunt identice',
  				passwordConfirmErrorMessage: 'Parolele nu sunt identice',
  			});
  			val = false;
  		} else {
  			this.setState({
  				isPasswordError:false,
  				isPasswordConfirmError:false,
  				passwordErrorMessage: '',
  				passwordConfirmErrorMessage: '',
  			});
  		}
  	}
  };

  render() {
  	return (
  		<div>
  			<Register
  				{...this.state}
  				handleChange={this.handleChange}
  				submit={() => this.submit()}
  			>
  			</Register>
  		</div>
  	);
  }
}

export default RegisterPage;

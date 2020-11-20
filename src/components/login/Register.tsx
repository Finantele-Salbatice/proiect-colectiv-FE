import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createStyles, withStyles } from '@material-ui/core/styles';
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

export interface RegisterProps {
  classes: any;
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
  handleChange(data: any): void;
  submit(): void;
}

export interface RegisterState {}

const styles = createStyles({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margintTop:'5px',
	},
	inputNameBox: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	inputName: {
		marginBottom: '0px',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
	},
	row: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '90px;',
		alignItem: 'center',
	},
	errorMessage: {
		fontSize: '10px',
		color: '#cc0000',
		fontStyle: 'italic',
		position: 'relative',
		display: 'inline-block',
		height: '10px',
	},
	titleBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	icon: {
		marginRight: '5px',
		marginBottom : '5px',
	},
	inputAndErrorBlock: {
		display: 'inline-block',
		maxWidth: '98%',
		margin: 'auto',
	},
	inputNameColumn: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		marginTop: '5px',
	},
	main: {
		backgroundColor: 'yellow',
	},
});

class Register extends React.Component<RegisterProps, RegisterState> {

  handleData = (type: any) => (event: any) => {
  	this.props.handleChange({
  		[type]: event.target.value,
  	});
  };

  render() {
	  const {
  		classes, firstName, lastName, password, email, isFirstNameError, isLastNameError, isEmailError, isPasswordError, isPasswordConfirmError,
  		firstNameErrorMessage, lastNameErrorMessage, emailErrorMessage, passwordConfirmErrorMessage, passwordErrorMessage,
  	} = this.props;
  	return (
  		<Container component="main" maxWidth="xs">
  			<CssBaseline />
  			<div className={classes.paper}>
  				<div className={classes.titleBox}>
  					<Avatar className={classes.icon}>
  						<AssignmentSharpIcon />
  					</Avatar>
  					<Typography component="h1" variant="h5">
              Register
  					</Typography>
  				</div>
  				<form className={classes.form} noValidate>
  					<div className={classes.row}>
  						<TextField
  							className={classes.inputName}
  							error = {isFirstNameError}
  							variant="outlined"
  							margin="normal"
  							required
  							fullWidth
  							id="firstName"
  							label="First Name"
  							name="firstName"
  							autoComplete="firstName"
  							autoFocus
  							value={firstName}
  							onChange={this.handleData('firstName')}
  						/>
  						<div className={classes.errorMessage}>
  							{firstNameErrorMessage}
  						</div>
  					</div>
  					<div className={classes.row}>
  						<TextField
  							className={classes.inputName}
  							error = {isLastNameError}
  							variant="outlined"
  							margin="normal"
  							required
  							fullWidth
  							id="lastName"
  							label="Last Name"
  							name="lastName"
  							autoComplete="lastName"
  							autoFocus
  							value={lastName}
  							onChange={this.handleData('lastName')}
  						/>
  						<div className={classes.errorMessage}>
  							{lastNameErrorMessage}
  						</div>
  					</div>
  					<div className={classes.row}>
  						<TextField
  							className={classes.inputName}
  							error = {isEmailError}
  							variant="outlined"
  							margin="normal"
  							required
  							fullWidth
  							id="email"
  							label="Email"
  							name="email"
  							autoComplete="email"
  							autoFocus
  							value={email}
  							onChange={this.handleData('email')}
  						/>
  						<div className={classes.errorMessage}>
  							{emailErrorMessage}
  						</div>
  					</div>
  					<div className={classes.row}>
  						<TextField
  							className={classes.inputName}
  							error = {isPasswordError}
  							variant="outlined"
  							margin="normal"
  							required
  							fullWidth
  							id="password"
  							label="Password"
  							name="password"
  							autoComplete="password"
  							autoFocus
  							value={password}
  							type="password"
  							onChange={this.handleData('password')}
  						/>
  						<div className={classes.errorMessage}>
  							{passwordErrorMessage}
  						</div>
  					</div>
  					<div className={classes.row}>
  						<TextField
  							className={classes.inputName}
  							error = {isPasswordConfirmError}
  							variant="outlined"
  							margin="normal"
  							required
  							fullWidth
  							id="passwordConfirm"
  							label="Confirm Password"
  							name="passwordConfirm"
  							autoComplete="Confirma Parola"
  							autoFocus
  							value={this.props.passwordConfirm}
  							type="password"
  							onChange={this.handleData('passwordConfirm')}
  						/>
  						<div className={classes.errorMessage}>
  							{passwordConfirmErrorMessage}
  						</div>
  					</div>
  					<div className={classes.row}>
  						<Button
  							className={classes.button}
  							fullWidth
  							variant="contained"
  							color="primary"
  							onClick={this.props.submit}
  						>
                Register
  						</Button>
  					</div>
  				</form>
  			</div>
  		</Container>
  	);
  }
}

export default withStyles(styles)(Register);

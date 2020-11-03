import * as React from 'react';
import { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createStyles, withStyles } from '@material-ui/core/styles';
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import validator from 'validator';
import Input from '@material-ui/core/Input';


export interface RegisterProps {
    classes : any;
    firstName : string;
    lastName : string;
    password : string;
    email : string;
    passwordConfirm : string;
    handleChange(data:any):void;
    submit():void;
}
 
export interface RegisterState {
    
}

const styles = createStyles( {
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    inputNameBox : {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputName : {
      marginBottom:'0px',
      overflow:'hidden'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    row: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '90px;',
      alignItem:'center'
    },
    errorMessage : {
      fontSize : '10px',
      color: '#cc0000',
      fontStyle: 'italic',
      position:'relative',
      display:'inline-block',
      height:'10px'
    },
    titleBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon : {
      marginRight:'5px'
    },
    inputAndErrorBlock : {
      display:'inline-block',
      maxWidth: '98%',
      margin:'auto'
    },
    inputNameColumn : {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    button : {
      marginTop:'5px',
      backgroundColor:'green',
      color:'#ffffcc',
    },
    main : {
      backgroundColor:'yellow'
    }
  });


 
class Register extends React.Component<RegisterProps, RegisterState> {

    errors = {
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      passwordConfirmError: '',
    }

    validate = () => {
      var validator = require('validator');
      var val = true;

      var firstNames = this.props.firstName.replaceAll(' ', '');
      
      if(!validator.isAlpha(firstNames)) {
        this.errors.firstNameError = "First name is invalid";
        val = false;
      }
      else {
        this.errors.firstNameError = '';
      }

      if(!validator.isAlpha(this.props.lastName)) {
        this.errors.lastNameError = "Last name invalid";
        val = false;
      }
      else {
        this.errors.lastNameError = '';
      }

      if(!validator.isEmail(this.props.email)) {
        this.errors.emailError = 'E-mail invalid';
        val = false;
      }
      else {
        this.errors.emailError = '';
      }

      if((this.props.password.length == 0 || this.props.passwordConfirm.length == 0) 
        || (this.props.password !== this.props.passwordConfirm)) {
        this.errors.passwordError = 'Passwords must be  identical';
        this.errors.passwordConfirmError = 'Passwords must be identical';
        val = false;
      }
      else {
        this.errors.passwordError = '';
        this.errors.passwordConfirmError = '';
      }

      this.setState({firstNameError: ''});
      this.setState({lastNameError: ''});
      this.setState({emailError: ''});
      this.setState({passwordError: ''});
      this.setState({passwordConfirmError: ''});

      return val;

    }

    handleData = (type:any) =>(event:any) =>{
        this.props.handleChange({
            [type] : event.target.value
        })
    }

    register = () => {
      if(this.validate() == false) {
        //console.log(this.errors.passwordError);
      }
      else this.props.submit();
    }
    
    render() { 
        const {classes , firstName, lastName, password , email}  = this.props;
        return (
            <Container component = "main" maxWidth = "xs">
                <CssBaseline />
                <div className = {classes.paper}>
                    <div className = {classes.titleBox}>
                      <Avatar className = {classes.icon}>
                          <AssignmentSharpIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Register
                      </Typography>
                    </div>
                    <form className={classes.form} noValidate>
                      <div className = {classes.row}>
                        <div className = {classes.inputNameBox}>
                          <div className = {classes.inputNameColumn}>
                            <div className = {classes.inputAndErrorBlock}>
                              <TextField
                                className = {classes.inputName}
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                value={firstName}
                                onChange={this.handleData("firstName")}
                              />
                              <div className = {classes.errorMessage}>
                                {this.errors.firstNameError}
                              </div>
                            </div>
                          </div>
                          <div className = {classes.inputNameColumn}>
                            <div className = {classes.inputAndErrorBlock}>
                              <TextField
                                className = {classes.inputName}
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus
                                value={lastName}
                                onChange={this.handleData("lastName")}
                              />
                              <div className = {classes.errorMessage}>
                                {this.errors.lastNameError}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className = {classes.row}>
                        <TextField
                          className = {classes.inputName}
                          variant="filled"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          value={email}
                          onChange={this.handleData("email")}
                        />
                        <div className = {classes.errorMessage}>
                          {this.errors.emailError}
                        </div>
                      </div>
                      <div className = {classes.row}>
                        <TextField
                          className = {classes.inputName}
                          variant="filled"
                          margin="normal"
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          name="password"
                          autoComplete="password"
                          autoFocus
                          value={password}
                          type = 'password'
                          onChange={this.handleData("password")}
                        />
                        <div className = {classes.errorMessage}>
                          {this.errors.passwordError}
                        </div>
                      </div>
                      <div className = {classes.row}>
                        <TextField
                          className = {classes.inputName}
                          variant="filled"
                          margin="normal"
                          required
                          fullWidth
                          id="passwordConfirm"
                          label="Confirm Password"
                          name="passwordConfirm"
                          autoComplete="Confirma Parola"
                          autoFocus
                          value={this.props.passwordConfirm}
                          type = 'password'
                          onChange={this.handleData("passwordConfirm")}
                        />
                        <div className = {classes.errorMessage}>
                          {this.errors.passwordConfirmError}
                        </div>
                      </div>
                      <div className = {classes.row}>
                        <Button
                          className = {classes.button}
                          fullWidth
                          variant="outlined"
                          color="primary"
                          onClick={this.register}
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
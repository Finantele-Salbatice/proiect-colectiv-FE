import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export interface LoginProps {
    classes:any;
    email:string;
    password:string;
    isError: boolean;
    errorMessage:string;
    handleChange(data:any):void;
    submit():void;
}
 
export interface LoginState {
    
}

const styles = createStyles( {
    paper: {
      display: 'flex',
      marginTop :'130px',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    message:{
      display :"none",
    },
    errMessage:{
      display :"block",
      color:'red',
      margin:'0px'
    },
    button:{
      marginBottom:'10px'
    }

  });
 
class Login extends React.Component<LoginProps, LoginState> {
  
  
  handleData = (type:any) =>(event:any) =>{
    this.props.handleChange({
        [type] : event.target.value
    })
 }
  login = ()=>{
    this.props.submit();
  }

    render() { 
        const {classes , password , email, isError , errorMessage}  = this.props;
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <div>
                  <h4 className={ (isError?classes.errMessage:classes.message)}>
                    {errorMessage}
                  </h4>
                </div>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={this.handleData("email")}
                    error={isError}
                  />
                  <TextField
                    error={isError}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleData("password")}
                    value={password}
                  />
                  <Button
                    className={classes.button}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.login}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/reset" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          );
    }
}
 
export default withStyles(styles)(Login);
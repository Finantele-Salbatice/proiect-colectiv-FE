import * as React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { createStyles , withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


export interface ResetPassProps {
    classes : any;
    email : string;
    isError : boolean;
    errMessage : string;
    handleChange(data : any) : void;
    submit() : void;
}

export interface ResetPassState {}

const styles = createStyles({
    paper : {
        marginTop: '150px',
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    form : {
        width : '100%'
    },
    isError : {
        color : 'red'
    },
    noError : {
        display : 'none'
    },
    button : {
        margin : 'normal'
    }
});

class ResetPass extends React.Component<ResetPassProps,ResetPassState>{
    
    handleData = (type : any) => (event : any) => {
        this.props.handleChange({
            [type] : event.target.value
        })
    };

    submitClick = () => {
        this.props.submit();
    };

    render(){
        const { classes, email, isError ,errMessage} = this.props; 
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className = { classes.paper }>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <form className = { classes.form } noValidate>
                        <TextField
                            error = { isError }
                            variant = "outlined"
                            margin = "normal"
                            id = "email"
                            label = "E-mail Address"
                            autoComplete="email"
                            fullWidth
                            required
                            name = "email"
                            value = { email }
                            color = "secondary"
                            onChange = { this.handleData('email') }
                        />
                        <div>
                            <h4 className = { isError? classes.isError : classes.noError }>
                                { errMessage }
                            </h4>
                        </div>
                        <Button
                            className = { classes.button }
                            variant = "contained"
                            fullWidth
                            name = "submitBtn"
                            color = "secondary"
                            id = "submitBtn"
                            onClick = { this.submitClick }
                        >
                            Send me an e-mail
                        </Button>
                    </form>
                </div>
            </Container>
        );
        
    }
}

export default withStyles(styles)(ResetPass);
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";

export interface ChangePassProps {
    classes : any;
    token : string;
    newpass : string;
    confnewpass : string;
    isError : boolean;
    errMessage : string;
    handleChange(data : any) : void;
    submit() : void;
}

export interface ChangePassState {}

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

class ChangePass extends React.Component<ChangePassProps,ChangePassState>{
    
    handleData = (type : any) => (event : any) => {
        this.props.handleChange({
            [type] : event.target.value
        })
    };

    submitClick = () => {
        this.props.submit();
    };

    render(){
        const { classes, newpass, confnewpass, isError ,errMessage} = this.props; 
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className = { classes.paper }>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <form className = { classes.form } noValidate>
                        <TextField
                            error = { isError }
                            variant = "outlined"
                            margin = "normal"
                            id = "newpass"
                            label = "New Password"
                            type = "password"
                            fullWidth
                            required
                            name = "newpass"
                            value = { newpass }
                            color = "secondary"
                            onChange = { this.handleData('newpass') }
                        />
                        <TextField
                            error = { isError }
                            variant = "outlined"
                            margin = "normal"
                            id = "confnewpass"
                            label = "Confirm New Password"
                            type = "password"
                            fullWidth
                            required
                            name = "confnewpass"
                            value = { confnewpass }
                            color = "secondary"
                            onChange = { this.handleData('confnewpass') }
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
                            Update
                        </Button>
                    </form>
                </div>
            </Container>
        );
        
    }
}

export default withStyles(styles)(ChangePass);
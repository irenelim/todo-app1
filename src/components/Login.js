import React, { useState } from 'react';
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { makeStyles, Card, Box, Typography, Button,
     TextField, InputAdornment, IconButton } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { useAuth } from '../context/Auth';

const useStyles = makeStyles((theme) => ({
    pageHeight: {
        height: '100vh',
    },
    root: {
        maxWidth: 300,
        padding: theme.spacing(2),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(3, 0),
    },
  }));

function Login() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(true);
    const [user, setUser] = useAuth();
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, name } = e.target.elements;
        try{
            const result = await axios.post(`https://dev.teledirectasia.com:3092/login`, {apiKey: 
                id.value, 
                name: name.value
            });
            if (result.data.token){
                setErrorMsg('');
                setUser({name : result.data.token.name,
                        token : result.data.token.token,
                        image : result.data.image,
                        });
            }
        }catch(err){
            setErrorMsg("try this secret ID 78f009a758d96757")
        }
                   
    };

    if (!!user) {
        return <Redirect to="/" />;
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.pageHeight}>
        <Card className={classes.root}>
            <Typography component="h3" variant="h5" color="secondary" gutterBottom>
                Login
            </Typography>
            <form className={classes.form} noValidate
                onSubmit={handleSubmit}
            >                
                <TextField
                    variant="filled"
                    required
                    fullWidth
                    label="Id"
                    name="id"
                    type={!showPassword ? "password": "text" }
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={()=>{
                            setShowPassword(!showPassword);
                            }}
                            onMouseDown={e=>e.preventDefault()}
                        >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    disableUnderline: true
                    }}
                    autoFocus
                    margin="dense"  
                    // autoComplete="off"
                    helperText={errorMsg}
                />

                <TextField
                    variant="filled"
                    required
                    fullWidth
                    name="name"
                    label="name"
                    margin="dense" 
                    InputProps={{                   
                        disableUnderline: true
                    }}
                    // autoComplete="off"
                />

                <Button size="large"
                    type="submit"
                    fullWidth
                    variant="contained"
                    disableElevation
                    color="primary"
                    className={classes.submit}
                >
                    Login
                </Button>
            </form>
        </Card></Box>
    );

}

export default Login;
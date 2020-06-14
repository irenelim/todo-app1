import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, Typography, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pageHeight: {
        height: '100vh',
    },
    root: {
        minWidth: 300,
        padding: theme.spacing(2)
    },
    gutter : {
        marginTop: 24
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    submit: {        
    margin: theme.spacing(3, "auto"),
    display: 'flex'
    },
}));

function NoTask (props) {
    const { title, handleNewTaskDialogOpen } = props;
    const classes = useStyles();    
    
    return (
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.pageHeight}>
        <Card className={classes.root}>
            <Typography component="h3" variant="h5" color="secondary" align="center" 
                className={classes.gutter}>
                You have no task.
            </Typography>
            <form className={classes.form} noValidate
                onSubmit={(e)=>{
                    e.preventDefault();
                    handleNewTaskDialogOpen()
                }}
            >
                <Button size="large"
                    type="submit"
                    variant="contained"
                    disableElevation
                    color="primary"
                    className={classes.submit}
                >
                    {title}
                </Button>
            </form>
        </Card></Box>
    );
}

NoTask.propTypes = {
    title: PropTypes.string,
    handleNewTaskDialogOpen: PropTypes.func
};

export default NoTask;
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {makeStyles, Dialog, 
    Button, TextField, Card, Typography, } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        padding: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(1, 0, 3),
    },
}));

function NewTaskDialog(props) {
    const { open, onClose, loading, title, onConfirm } = props;
    const nameRef = useRef(null);
    const classes = useStyles();
    
    return (
        <Dialog open={open} onClose={onClose}
            disableBackdropClick={loading}
            disableEscapeKeyDown={loading}
        >            
            <Card className={classes.root}>
                <Typography component="h3" variant="h5" color="secondary" gutterBottom>
                    {title}
                </Typography>
                <TextField
                    variant="filled"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="name"
                    type="text"
                    fullWidth
                    autoComplete="off"
                    InputProps={{                   
                        disableUnderline: true
                    }}
                    inputRef={nameRef}                    
                />
                <Button size="large"
                    color="primary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    className={classes.submit}
                    onClick={(e)=>{
                        e.preventDefault();
                        onConfirm(nameRef.current.value);
                    }} 
                    disabled={loading}
                >
                    {title} {loading && (
                        <>
                        <span>&nbsp;&nbsp;</span>
                        <CircularProgress 
                            size={24}
                            thickness={5}
                        />
                        </>
                        )}
                </Button>
            </Card>

        </Dialog>
    );
}

NewTaskDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    loading: PropTypes.bool,
    title: PropTypes.string,
    onConfirm: PropTypes.func
};
export default NewTaskDialog;

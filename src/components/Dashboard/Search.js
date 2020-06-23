import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, fade, Typography, Button, InputBase, Box, Grid
    } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    box:{
        margin: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            margin: '2rem 0 1rem',
          },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#D9DFEB",
        '&:hover': {
          backgroundColor: fade("#D9DFEB", 0.9),
        },
        // margin: "0 1rem",
        // width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //   marginLeft: theme.spacing(1),
        //   width: 'auto',
        // },
      },
      searchIcon: {
        padding: theme.spacing(0, 1),
        color: "grey",
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    padding: '2px 2px 2px'
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1rem + ${theme.spacing(3)}px)`,
    // transition: theme.transitions.create('width'),
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '18ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
    [theme.breakpoints.down('sm')]: {
        paddingTop: '8px',
        paddingBottom: '8px'
      }
  },
  alignment: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left'
    }
  },
  button: {
    [theme.breakpoints.down('sm')]: {
        padding: `8px 22px`,
    }
  },
  noPaddingTop: {
      [theme.breakpoints.down('sm')]: {
          paddingTop: `0 !important`,
      }
  }
}));

function SearchBox (props) {
    const { title, handleNewTaskDialogOpen, handleSearchTasks, reset } = props;
    const classes = useStyles();    
    const searchInput = useRef();

    useEffect(()=>{
        if (reset){
            searchInput.current.value = '';
            handleSearchTasks('');
        }
    }, [reset, handleSearchTasks])

    return (
        <Box className={classes.box}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
                <Box className={classes.alignment}>
                <Typography component="h3" variant="h5" color="secondary">
                    Tasks
                </Typography></Box>
            </Grid>
            <Grid item xs={12} md={3}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase 
                        placeholder="Search by task name"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search by name' }}
                        fullWidth
                        onChange={(e)=>{
                            handleSearchTasks(e.target.value)
                        }}
                        inputRef={searchInput}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={2} className={classes.noPaddingTop}>
                <Button
                    fullWidth
                    type="button"
                    variant="contained"
                    disableElevation
                    color="primary"
                    className={classes.button}
                    onClick={(e)=>{
                        e.preventDefault();
                        handleNewTaskDialogOpen()
                    }}
                >
                    {title}
                </Button>
            </Grid>
        </Grid>
        </Box>
    );
}

SearchBox.propTypes = {
    title: PropTypes.string,
    handleNewTaskDialogOpen: PropTypes.func,
    handleSearchTasks: PropTypes.func,
    reset: PropTypes.bool
};

export default SearchBox;
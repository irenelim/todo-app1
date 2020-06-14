import React from 'react';
import { useAuth } from '../../context/Auth';
import { AppBar, Typography, Toolbar, Avatar, Link,
    makeStyles} from "@material-ui/core";
    import image1 from "../../images/profile.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    navbar:{
        color: '#6D8187',
        backgroundColor: '#fff'
    },
    title: {
        flexGrow: 1,
        marginLeft: 20
    },
    }));

function Navbar() {
    const [user, setUser] = useAuth();
    const classes = useStyles();

    const handleLogout = (e) => {
        e.preventDefault();
        setUser(null);
    }
    
    return (
        <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.navbar}>
        <Toolbar>
        <Avatar src={user.image && image1}/>
          <Typography variant="h6" className={classes.title}>
          {user.name}
          </Typography>
          <Link href="#" variant="h6" onClick={handleLogout} color="inherit" underline="none">Logout</Link>
        </Toolbar>
      </AppBar>
    </div>
    );
}

export default Navbar;
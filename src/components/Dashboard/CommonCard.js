import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardContent, 
    Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        height: 200,
    }
}));

function CommonCard (props) {
    const { title, content } = props;
    const classes = useStyles();    
    
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography component="h3" variant="h5" color="secondary" align="left" 
                    className={classes.gutter}>
                    {title}
                </Typography>
                {content}
            </CardContent>           
        </Card>
    );
}

CommonCard.propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
export default CommonCard;
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardContent, 
    Typography } from '@material-ui/core';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         height: 200,
//         borderRadius: 0,
//         boxShadow: `0 4px 2px -2px rgba(0,0,0,0.2)`,
//         [theme.breakpoints.up('sm')]: {
//             borderRadius: '8px',
//             boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)`,
//         }
//     }
// }));

function CommonCard (props) {
    const { title, content } = props;
    // const classes = useStyles();    
    
    return (
        // <Card className={classes.root} >
            <CardContent>
                <Typography component="h3" variant="h5" color="secondary" align="left" >
                    {/* className={classes.gutter} */}
                    {title}
                </Typography>
                {content}
            </CardContent>           
        // </Card>
    );
}

CommonCard.propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
export default CommonCard;
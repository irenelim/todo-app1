import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, } from "@material-ui/core";
import CardPieChart from './CardPieChart';
import CommonCard from './CommonCard';

const getUlStyle = () => {
    return {
        paddingLeft: 'inherit',
        color: '#8F9EA2',
    }
};
const strikeThrough = (completed) => {        
    return {
        textDecoration : completed ? 'line-through' : 'none'
    }    
};

const getSuperScriptStyle = () => {
    return {
        verticalAlign: 'super',
        color: '#5285EC',
        fontSize: '64px',
    }
};
const getSubScriptStyle = () => {
    return {
        verticalAlign: 'sub',
        color: '#8F9EA2',
        fontSize: '20px',
    }
};

function renderPercentage (tasksCompleted, totalTasks) {    
    return (
        <Box>
            <span style={getSuperScriptStyle()}>{tasksCompleted}</span>
            <span style={getSubScriptStyle()}>/ {totalTasks}</span>
        </Box>
    );
}

function renderLatest (latestTasks) {
    return (
        <ul style={getUlStyle()}>
        {latestTasks.map(task => (
            <li style={strikeThrough(task.completed)} key={task._id}>
                <Typography noWrap variant="body1">{task.name}</Typography>
            </li> 
        ))}
        </ul>
    );
}

function StatisticsArea(props) {
  const { data } = props;
  const pieData = [{ name: 'Completed Tasks', value: +data.tasksCompleted}, 
        {name: '', value: (+data.totalTasks-data.tasksCompleted)}
    ];
  return (
    data && (
    <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
            <CommonCard title="Tasks Completed" content={renderPercentage(data.tasksCompleted, data.totalTasks)} />
        </Grid>
        <Grid item xs={12} sm={4}>
            <CommonCard title="Latest Created Tasks" content={renderLatest(data.latestTasks)} />
        </Grid>
        <Grid item xs={12} sm={4}>
            <CardPieChart data={pieData} />
        </Grid>
    </Grid>
    )
  );
}

StatisticsArea.propTypes = {
  data: PropTypes.object.isRequired
};

export default StatisticsArea;
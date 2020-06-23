import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, Card, makeStyles } from "@material-ui/core";
import CardPieChart from "./CardPieChart";
import CommonCard from "./CommonCard";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 200,
    borderRadius: 0,
    boxShadow: `0 4px 2px -2px rgba(0,0,0,0.2)`,
    [theme.breakpoints.up("sm")]: {
      borderRadius: "8px",
      boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)`,
    },
  },
}));

const getUlStyle = () => {
  return {
    paddingLeft: "inherit",
    color: "#8F9EA2",
  };
};
const strikeThrough = (completed) => {
  return {
    textDecoration: completed ? "line-through" : "none",
  };
};

const getSuperScriptStyle = () => {
  return {
    verticalAlign: "super",
    color: "#5285EC",
    fontSize: "64px",
  };
};
const getSubScriptStyle = () => {
  return {
    verticalAlign: "sub",
    color: "#8F9EA2",
    fontSize: "20px",
  };
};

function renderPercentage(tasksCompleted, totalTasks) {
  return (
    <Box>
      <span style={getSuperScriptStyle()}>{tasksCompleted}</span>
      <span style={getSubScriptStyle()}>/ {totalTasks}</span>
    </Box>
  );
}

function renderLatest(latestTasks) {
  return (
    <ul style={getUlStyle()}>
      {latestTasks.map((task) => (
        <li style={strikeThrough(task.completed)} key={task._id}>
          <Typography noWrap variant="body1">
            {task.name}
          </Typography>
        </li>
      ))}
    </ul>
  );
}

function StatisticsArea(props) {
  const { data } = props;
  const classes = useStyles();
  const pieData = [
    { name: "Completed Tasks", value: +data.tasksCompleted },
    { name: "", value: +data.totalTasks - data.tasksCompleted },
  ];
  return (
    data && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CommonCard
              title="Tasks Completed"
              content={renderPercentage(data.tasksCompleted, data.totalTasks)}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CommonCard
              title="Latest Created Tasks"
              content={renderLatest(data.latestTasks)}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardPieChart data={pieData} />
          </Card>
        </Grid>
      </Grid>
    )
  );
}

StatisticsArea.propTypes = {
  data: PropTypes.object.isRequired,
};

export default StatisticsArea;

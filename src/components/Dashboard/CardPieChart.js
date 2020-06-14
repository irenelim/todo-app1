import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    makeStyles,
    Box
  } from "@material-ui/core";
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 200,
    }
}));

  const highlight = "#5285EC";

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      payload } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 0) * cos;
    const sy = cy + (outerRadius + 0) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={highlight}
        />
        
        <path d={`M${sx},${sy}L${mx},${my}`} stroke={highlight} fill="none"/>
        
        <text x={mx + (cos >= 0 ? 1 : -1) * 12} y={my} textAnchor={textAnchor} fill={highlight}>{payload.name.split(" ")[0]}</text>
        <text x={mx + (cos >= 0 ? 1 : -1) * 12} y={my} dy={18} textAnchor={textAnchor} fill={highlight}>{payload.name.split(" ")[1]}</text>
        
      </g>
    );
  };

function CardPieChart(props) {
    const { data } = props;
    const classes = useStyles(); 

    return (
        <Card className={classes.root}>
            <CardContent>
                <Box height="250px">
                    <ResponsiveContainer width="100%" height="50%">
                    <PieChart width={120} height={120}>
                        <Pie data={data} dataKey="value" 
                        cy="60%" 
                        outerRadius="60%"  fill="#E8ECEC" 
                        activeIndex={0}
                        activeShape={renderActiveShape}
                        /> 
                        {/* isAnimationActive={false} */}
                    </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}

CardPieChart.propTypes = {
  data: PropTypes.array.isRequired
}
export default CardPieChart;
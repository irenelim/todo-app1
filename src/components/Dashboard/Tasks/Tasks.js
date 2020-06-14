import React, {useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List, ListItem, ListItemIcon, Checkbox, IconButton,
  ListItemText, ListItemSecondaryAction, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),           
    },
    item: {
      borderBottom: "2px solid #E8E8E8",
      // "&:last-child": {
      //     borderBottom: 'none',
      // }
    },
    strikeThrough: {
      wordBreak: 'break-all',
      textDecoration : 'line-through',
      color: theme.palette.text.secondary
    },
    todo: {
      wordBreak: 'break-all',
      textDecoration : 'none',
      color: theme.palette.primary.main
    }
  }));

  const noBorderBottom = (noborder) => {        
    return {
        borderBottomStyle : (noborder ?  'none' : 'solid')
    }    
  };

function Tasks(props) {
  const {tasks, markComplete, editTask, removeTask} = props;
  const classes = useStyles();
  const [isInput, setIsInput] = useState(Array(tasks.length).fill(false));
  const inputNameRef = useRef(null);

  const handleToggle = useCallback((task) => (e) => {
      markComplete(task._id, !task.completed);
  }, [markComplete]);

  const handleDelete = useCallback((id) => (e) => {
    removeTask(id);
  }, [removeTask]);

  const handleEdit = useCallback((id, i) => (e) => {
    if (!isInput[i]) return;
    editTask(id, inputNameRef.current.value);
    setIsInput(isInput=>[...isInput.map((item, index)=>false)]);
  }, [editTask, isInput]);

  const switchInput = useCallback((i)=>(e)=>{
    setIsInput(isInput=>[...isInput.map((item, index)=>index===i ? !item : false)]);
  }, []);

  return (
    <List className={classes.root}>
    {tasks.map((task, i)=>(
      <ListItem className={classes.item} style={noBorderBottom(i===tasks.length-1)} 
        key={task._id} role={undefined} >
        <ListItemIcon>
            <Checkbox
            edge="start"
            checked={task.completed}
            onChange={handleToggle(task)}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': `checkbox-list-label-${task._id}` }}
            />
        </ListItemIcon>
        {isInput[i] && task.completed===false ? 
          <TextField required fullWidth defaultValue={task.name} 
            inputRef={inputNameRef} /> :
          <ListItemText id={task._id} primary={task.name} className={task.completed ? classes.strikeThrough : classes.todo}
          onClick={switchInput(i)}
        /> 
        }
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit"
              onClick={handleEdit(task._id, i)}>
                <CreateIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete"  
                onClick={handleDelete(task._id)} >
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
    ))}
    </List>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  markComplete: PropTypes.func, 
  editTask: PropTypes.func, 
  removeTask: PropTypes.func
}

export default Tasks;


 
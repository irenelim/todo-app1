import React, { useState, useContext, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
// import { useImmerReducer } from 'use-immer';
import { AuthContext } from '../context/Auth';
import Navbar from './Dashboard/Navbar';
import NoTask from './Dashboard/NoTask';
import NewTaskDialog from './Dashboard/NewTaskDialog';
import StatisticArea from './Dashboard/StatisticArea';
import Tasks from './Dashboard/Tasks/Tasks';
import SearchBox from './Dashboard/Search';
import { makeStyles, CircularProgress, Box } from '@material-ui/core';


const newTitle = "+ New Task";
const headers = (token) => {
    return {headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
    }}
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh'
    },
    box: {
        margin: theme.spacing(3, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(0, 3),
        }
    }
}));

function tasksReducer(state, action){
    switch (action.type){ 
        case "IN_PROGRESS": 
            return {...state,
                isLoading: action.payload
            }
            // state.isLoading = action.payload;
        case "GET_DASHBOARD":
            return {...state,
                dashboard: action.payload
            }
            // state.dashboard = action.payload;
        case "GET_TASKS":
            return {...state,
                tasks: [...action.payload]
            }
            // state.tasks = action.payload;
        case "GET_QUERY_TASKS":
            return {...state,
                queryTasks: [...action.payload]
            }
            // state.queryTasks = action.payload;
        case "ADD_TASK":
            return {...state,
                tasks: [...state.tasks, action.payload],
                queryTasks: [...state.queryTasks, action.payload]
            }
        case "EDIT_TASK":
            return {...state,
                tasks: [...state.tasks.map(task=>task._id===action.payload.id ? action.payload.updatedTask : task)],
                queryTasks: [...state.queryTasks.map(task=>task._id===action.payload.id ? action.payload.updatedTask : task)],
            }
        case "DELETE_TASK":
            return {...state,
                tasks: [...state.tasks.filter(task=>task._id!==action.payload.id)],
                queryTasks: [...state.queryTasks.filter(task=>task._id!==action.payload.id)]
            }
        case "QUERY_BY_NAME":
            return {...state,
                queryTasks: [...action.payload.tasks]
            }  
            
        case "RESET_SEARCH":
            return {...state,
                reset: action.payload
            }
        default:
            return;
    }
}
const initialTasks = [];
function Dashboard() {
    const user = useContext(AuthContext);
    const classes = useStyles();      
    const [{dashboard, tasks, queryTasks, isLoading, reset}, dispatch] = useReducer(tasksReducer, {
        dashboard: null,
        tasks: initialTasks,
        queryTasks: initialTasks,
        isLoading: true,
        reset: false,
    }); 
    const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
    const [isNewTaskLoading, setIsNewTaskLoading] = useState(false);

    useEffect( ()=>{   
        const fetchDashboard = async () =>{ 
            const result = await axios.get(`https://dev.teledirectasia.com:3092/dashboard`, headers(user.token));
            if (result.data){
                dispatch({type: "GET_DASHBOARD", payload: result.data })
            }
        };      

        const fetchTasks = async () =>{ 
            const result = await axios.get(`https://dev.teledirectasia.com:3092/tasks`, headers(user.token));
            if (result.data && result.data.tasks && result.data.tasks.length>0){
                const initTasks = result.data.tasks;
                dispatch({type: "GET_TASKS", payload: initTasks });
                dispatch({type: "GET_QUERY_TASKS", payload: initTasks });
                dispatch({type: "IN_PROGRESS", payload: false });   
            }              
        };

        fetchDashboard();
        fetchTasks();

  }, [user.token, dispatch]);

    const getLatestDashboard = useCallback(async () =>{ 
        const result = await axios.get(`https://dev.teledirectasia.com:3092/dashboard`, headers(user.token));
        if (result.data){
            dispatch({type: "GET_DASHBOARD", payload: result.data });
        }
    }, [user.token, dispatch]);

    const addTask = async (name) => {
        setIsNewTaskLoading(true);
        const result = await axios.post(`https://dev.teledirectasia.com:3092/tasks`, {
        name: name
        }, headers(user.token))    
        if (result.data && result.data.task){
            const newTask = result.data.task;
            getLatestDashboard();   
            dispatch({type: "RESET_SEARCH", payload: true }); 
            
            dispatch({type: "ADD_TASK", payload: newTask });
        }else{
            console.log('error', result);
        }
        setIsNewTaskLoading(false);
        handleNewTaskDialogClose();
        
    };

    const completeTask = async (id, completed )=>{    
        const result = await axios.put(`https://dev.teledirectasia.com:3092/tasks/${id}`, {
        completed: completed
        }, headers(user.token));
        if (result.data && result.data.task){
            const updatedTask = result.data.task;
            getLatestDashboard();
            // dispatch({type: "COMPLETE_TASK", payload: {id: id, completed: updatedTask.completed} });
            dispatch({type: "EDIT_TASK", payload: {id: id, updatedTask: updatedTask} });
        }else{
            console.log('error', result);
        }
    };

    const editTask = async (id, name )=>{
        const result = await axios.put(`https://dev.teledirectasia.com:3092/tasks/${id}`, {
        name: name
        }, headers(user.token));
        if (result.data && result.data.task){
            const updatedTask = result.data.task;
            getLatestDashboard();
            // dispatch({type: "EDIT_TASK_NAME", payload: {id: id, name: updatedTask.name} });
            dispatch({type: "EDIT_TASK", payload: {id: id, updatedTask: updatedTask} });
        }else{
            console.log('error', result);
        }
    };

    const removeTask = async (id) => {
        const result = await axios.delete(`https://dev.teledirectasia.com:3092/tasks/${id}`,
            headers(user.token));
        if (result.data && result.data.task){
            getLatestDashboard();
            dispatch({type: "DELETE_TASK", payload: {id: id} });
        }  
    };

    const handleNewTaskDialogOpen = useCallback(() => {
        setIsNewTaskDialogOpen(true);        
    },[setIsNewTaskDialogOpen]);

    const handleNewTaskDialogClose = useCallback(() => {
        setIsNewTaskDialogOpen(false);
    }, [setIsNewTaskDialogOpen]);

    const handleSearchTasks = useCallback((val)=>{
        if (val.length > 0){
            dispatch({type: "QUERY_BY_NAME", payload: {tasks: tasks.filter(task=>task.name.indexOf(val) > -1)} }); 
        }else{
            dispatch({type: "QUERY_BY_NAME", payload: {tasks: tasks} });
        }     
    }, [dispatch, tasks]);

    return (
        <>
        <NewTaskDialog
            open={isNewTaskDialogOpen}
            title={newTitle}           
            onClose={handleNewTaskDialogClose}
            onConfirm={addTask}
            loading={isNewTaskLoading}
        />

        <Navbar />
        {isLoading ? (
            <div className={classes.root}>
                <CircularProgress />
            </div>
        ): (
            <>
            {tasks.length===0 ? ( 
                <NoTask title={newTitle} handleNewTaskDialogOpen={handleNewTaskDialogOpen}/>
            ) : ( 
                <Box display="flex" flexDirection="column" justifyContent="center" className={classes.box}> 
                {/* my={3} px={3} */}
                    <StatisticArea data={dashboard} />
                    <SearchBox title={newTitle}
                        handleNewTaskDialogOpen={handleNewTaskDialogOpen} 
                        handleSearchTasks={handleSearchTasks} reset={reset}/>
                    {queryTasks.length>0 && (
                        <Tasks tasks={queryTasks}
                            markComplete={completeTask} 
                            editTask={editTask}
                            removeTask={removeTask}
                        />                    
                    )}
                </Box>
            )}
            </>
        )}
        </>
    );
}

export default Dashboard;
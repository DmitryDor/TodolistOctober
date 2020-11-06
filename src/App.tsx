import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {



    let todolistId1 = v1()
    let todolistId2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
            {id: v1(), title: 'Milk', isDone: false}
        ],
    })

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const addTask = (title: string, todolistId: string) => {

        let copyTasks = {...tasks}
        let todolist = copyTasks[todolistId]
        const task = {id: v1(), title: title, isDone: false}
        copyTasks[todolistId] = [task, ...todolist]
        setTasks(copyTasks)
    }


    const removeTask = (taskId: string, todolistId: string) => {
        let copyTasks = {...tasks}
        let todolist = copyTasks[todolistId]
        copyTasks[todolistId] = todolist.filter(t => t.id !== taskId)
        setTasks(copyTasks)
    }
    const removeTodolist = (todolistId: string) => {
        const copyState = [...todolists]
        setTodolists(copyState.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }


    const changeFilter = (filter: FilterValueType, todolistId: string) => {
        const copyTodolists = [...todolists]
        const changeTodolistFilter = copyTodolists.find(tl => tl.id === todolistId)
        if (changeTodolistFilter) {
            changeTodolistFilter.filter = filter
        }
        setTodolists(copyTodolists)
    }

    const addTodolist = (title: string) => {
        const newTodolist = {id: v1(), title: title, filter: 'all'} as TodolistType
        const stateCopy = [...todolists]
        setTodolists([newTodolist, ...stateCopy])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })
    }

    const changeTaskStatus = (taskId: string, value: boolean, todolistId: string) => {
        let copyTasks = {...tasks}
        let todolist = copyTasks[todolistId]
        let task = todolist.find(t => t.id === taskId)
        if (task) {
            task.isDone = value
        }
        setTasks(copyTasks)

    }

    const changeTaskTitle = (todolistId: string, title: string, taskId: string) => {
        let copyTasks = {...tasks}
        let todolist = copyTasks[todolistId]
        let task = todolist.find(t => t.id === taskId)
        if (task) {
            task.title = title
        }
        setTasks(copyTasks)
    }
    const changeTodolistTitle = (id: string, title: string) => {
        const stateCopy = [...todolists]
        const changeTodolist = stateCopy.find(tl => tl.id === id)
        if (changeTodolist) {
            changeTodolist.title = title
        }
        setTodolists(stateCopy)
    }


    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={8}>
                    {
                        todolists.map(tl => {
                                let tasksForTodolist = tasks[tl.id]
                                if (tl.filter === 'active') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                                }
                                if (tl.filter === 'completed') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                                }

                                return (
                                    <Grid item>
                                        <Paper style={{padding: '10px'}}>
                                            <Todolist
                                                key={tl.id}
                                                id={tl.id}
                                                title={tl.title}
                                                tasks={tasksForTodolist}
                                                removeTask={removeTask}
                                                filter={tl.filter}
                                                changeFilter={changeFilter}
                                                addTask={addTask}
                                                changeTaskStatus={changeTaskStatus}
                                                removeTodolist={removeTodolist}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTodolistTitle={changeTodolistTitle}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default App;

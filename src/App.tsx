import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

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
    const changeTaskStatus = (taskId: string, value: boolean, todolistId: string) => {
        let copyTasks = {...tasks}
        let todolist = copyTasks[todolistId]
        let task = todolist.find(t => t.id === taskId)
        if (task) {
            task.isDone = value
        }
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
        setTodolists(copyState.filter(tl => tl.id !==todolistId))
        delete tasks[todolistId]
    }



    const changeFilter = (filter: FilterValueType, todolistId: string) => {
        const copyTodolists = [...todolists]
        const changeTodolistFilter = copyTodolists.find(tl => tl.id === todolistId)
        if(changeTodolistFilter){
            changeTodolistFilter.filter = filter
        }
        setTodolists(copyTodolists)
    }





    return (
        <div className="App">
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
                            />)

                    }
                )
            }

        </div>
    );
}


export default App;

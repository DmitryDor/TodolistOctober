import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ])
    let[filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (taskId: string) => {
        let statyCopy = [...tasks]
        setTasks(statyCopy.filter(t => t.id !== taskId))
    }

    const filteredTasks = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: true}
        setTasks([task, ...tasks])
    }
    const changeStatus = (taskId: string, value: boolean) => {
        let statyCope = [...tasks]
        let task = statyCope.find(t=> t.id ===taskId)
        if(task){
            task.isDone = value
        }
        setTasks(statyCope)
    }

    let tasksForTodolist = tasks
    if(filter === 'active'){
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed'){
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }



    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}


export default App;

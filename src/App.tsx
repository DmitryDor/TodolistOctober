import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: false},
        {id: 3, title: "React", isDone: false},
    ])
    let[filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (taskId: number) => {
        let statyCopy = [...tasks]
        setTasks(statyCopy.filter(t => t.id !== taskId))
    }

    const filteredTasks = (filter: FilterValueType) => {
        setFilter(filter)
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
            />
        </div>
    );
}


export default App;

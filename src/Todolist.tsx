import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filteredTasks: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('')

    const onAllClickHandler = () => {
        props.filteredTasks("all")
    }
    const onActiveClickHandler = () => {
        props.filteredTasks("active")
    }
    const onCompletedClickHandler = () => {
        props.filteredTasks("completed")
    }


    const onAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setTitle(value)

    }
    const addTask = () => {
        props.addTask(title)
        setTitle('')

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onAddTaskHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                        const removeTask = () => {
                            props.removeTask(t.id)
                        }
                        return (
                            <li>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>)
                    }
                )
                }


            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
import React from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filteredTasks: (filter: FilterValueType) => void
}

export const Todolist = (props: PropsType) => {

    const onAllClickHandler = () => {
        props.filteredTasks("all")
    }
    const onActiveClickHandler = () => {
        props.filteredTasks("active")
    }
    const onCompletedClickHandler = () => {
        props.filteredTasks("completed")
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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
                        </li>)}
                    )
                }


            </ul>
            <div>
                <button onClick={onAllClickHandler }>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
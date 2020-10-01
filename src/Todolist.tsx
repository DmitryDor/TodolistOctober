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
    changeStatus: (taskId: string, value: boolean) => void
    filter: FilterValueType
}

export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>('')

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
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }


    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onAddTaskHandler}
                       onKeyPress={onKeyPressHandler} className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {

                        const removeTask = () => {
                            props.removeTask(t.id)
                        }

                        const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
                            let newValue = e.currentTarget.checked
                            props.changeStatus(t.id, newValue)
                        }
                        return (
                            <li className={t.isDone ? 'is-done': ''}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeTaskTitle}/>
                                <span>{t.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>)
                    }
                )
                }


            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}
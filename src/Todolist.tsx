import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import {log} from "util";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    filter: FilterValueType
    changeFilter: (filter: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, value: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('')
    let [error, serError] = useState<null | string>('')

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            serError('Title is required')
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        serError('')
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {

                        const removeTask = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            const value = e.currentTarget.checked
                            props.changeTaskStatus(t.id, value, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'isDone': ''}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                                <span>{t.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>)
                    }
                )
                }


            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all'? 'active-filter': ''}>All</button>
                <button onClick={onActiveClickHandler} className={props.filter === 'active'? 'active-filter': ''}>Active</button>
                <button onClick={onCompletedClickHandler} className={props.filter === 'completed'? 'active-filter': ''}>Completed</button>
            </div>
        </div>
    )
}
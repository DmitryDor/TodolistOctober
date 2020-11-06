import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    changeTaskTitle: (todolistId: string, title: string, taskId: string) => void
    changeTaskStatus: (taskId: string, value: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = useCallback( () =>  {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.removeTask, props.task.id, props.todolistId])

    const changeTaskStatus =useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, value, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId] )

    const changeTaskTitle =useCallback( (title: string) => {
        props.changeTaskTitle(props.todolistId, title, props.task.id)
    }, [props.changeTaskTitle, props.todolistId, props.task.id] )

    return (
        <div key={props.task.id} className={props.task.isDone ? 'isDone' : ''}>

            <Checkbox checked={props.task.isDone} onChange={changeTaskStatus}/>

            <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
            {/*<span>{t.title}---</span>*/}

            <button onClick={removeTask}>x</button>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>)
})
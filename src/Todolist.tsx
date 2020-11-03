import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskTitle: (todolistId: string, title: string, taskId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    /*  let [title, setTitle] = useState('')
      let [error, serError] = useState<null | string>('')*/

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }


    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>


            <ul>
                {props.tasks.map(t => {

                        const removeTask = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            const value = e.currentTarget.checked
                            props.changeTaskStatus(t.id, value, props.id)
                        }

                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(props.id, title, t.id)
                        }

                        return (
                            <div key={t.id} className={t.isDone ? 'isDone' : ''}>

                                <Checkbox checked={t.isDone} onChange={changeTaskStatus}/>

                                <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                                {/*<span>{t.title}---</span>*/}

                                <button onClick={removeTask}>x</button>
                                <IconButton onClick={removeTask}>
                                    <Delete/>
                                </IconButton>
                            </div>)
                    }
                )
                }


            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    )
}



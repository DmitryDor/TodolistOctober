import React, {useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    changeFilter: (filter: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void

    changeTaskTitle: (todolistId: string, title: string, taskId: string) => void
    changeTaskStatus: (taskId: string, value: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {


    console.log('Todolist is called')

    /*  let [title, setTitle] = useState('')
      let [error, serError] = useState<null | string>('')*/

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])


    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
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
                {tasksForTodolist.map(t => <Task
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                    removeTask={props.removeTask}
                    task={t}
                    todolistId={props.id}
                    key={t.id}
                />)


                    // const removeTask = () => {
                    //     props.removeTask(t.id, props.id)
                    // }
                    // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    //     const value = e.currentTarget.checked
                    //     props.changeTaskStatus(t.id, value, props.id)
                    // }
                    //
                    // const changeTaskTitle = (title: string) => {
                    //     props.changeTaskTitle(props.id, title, t.id)
                    // }
                    //
                    // return (
                    //     <div key={t.id} className={t.isDone ? 'isDone' : ''}>
                    //
                    //         <Checkbox checked={t.isDone} onChange={changeTaskStatus}/>
                    //
                    //         <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                    //         {/*<span>{t.title}---</span>*/}
                    //
                    //         <button onClick={removeTask}>x</button>
                    //         <IconButton onClick={removeTask}>
                    //             <Delete/>
                    //         </IconButton>
                    //     </div>)


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
})



import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Icon, IconButton, TextField} from "@material-ui/core";
import {ControlPoint, TextFields} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('')
    let [error, serError] = useState<null | string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        serError('')
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            serError('Title is required')
        }

    }


    return (
        <div>
            <TextField value={title}
                       label="Type value" variant="outlined"
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            {/*<Button onClick={addTask} variant={"contained"} color={"primary"}>+</Button>*/}
            <IconButton color="secondary" onClick={addTask}>
                <ControlPoint/>
            </IconButton>

        </div>
    )
}
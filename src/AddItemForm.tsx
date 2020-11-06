import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    let [title, setTitle] = useState('')
    let [error, serError] = useState<null | string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            serError(null)
        }
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
})
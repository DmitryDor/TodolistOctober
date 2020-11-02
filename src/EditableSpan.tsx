import React, {ChangeEvent, useState} from "react";

export type PropsType = {

    title: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onEditMode = () => {
        setEditMode(true)
        setTitle(props.title)

    }

    const offEditMode = () => setEditMode(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        props.onChange(title)
    }

    return editMode
        ? <input onBlur={offEditMode} value={title} autoFocus onChange={onChangeTitle}/>
        : <span onDoubleClick={onEditMode}>{props.title}</span>


}
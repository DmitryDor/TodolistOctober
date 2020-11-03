import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [
                ...state.filter(tl => tl.id !== action.id)
            ]
        }
        case "ADD-TODOLIST": {
            const newTodolist = {id: v1(), title: action.title, filter: 'all' as FilterValueType}
            return ([newTodolist, ...state])
        }
        case "CHANGE-TODOLIST-TITLE": {
            const stateCopy = [...state]
            const changeTitle = stateCopy.find(tl => tl.id === action.id)
            if (changeTitle) {
                changeTitle.title = action.title
            }
            return stateCopy
        }
        case "CHANGE-TODOLIST-FILTER": {
            const stateCopy = [...state]
            const changeTitle = stateCopy.find(tl => tl.id === action.id)
            if (changeTitle) {
                changeTitle.filter = action.filter
            }
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, filter}
}


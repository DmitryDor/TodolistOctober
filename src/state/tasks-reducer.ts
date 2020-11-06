import {FilterValueType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string

}


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const todolist = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = todolist.filter(t => t.id !== action.taskId)
            return stateCopy

        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.title, isDone: false}
            const stateCopy = {...state}
            const todolist = stateCopy[action.todolistId]
            const changedTodolist = [newTask, ...todolist]
            stateCopy[action.todolistId] = changedTodolist
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {

            const deepCopy = {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => ({...el}))
            }
            const changeTask = deepCopy[action.todolistId].find(t => t.id === action.taskId)
            if (changeTask) {
                changeTask.isDone = action.isDone
            }
            return deepCopy


        }
        case "CHANGE-TASK-TITLE": {


            const deepCopy = {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => ({...el}))
            }
            const changeTask = deepCopy[action.todolistId].find(t => t.id === action.taskId)
            if (changeTask) {
                changeTask.title = action.title
            }
            return deepCopy
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}


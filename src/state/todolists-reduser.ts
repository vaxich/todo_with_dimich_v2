
import { FilterValueType, todolistType } from "../App";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    newIdTodolist: string
    newTodolistTitle: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    newTodolistTitle: string
    todolistId: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string
    newFilter: FilterValueType
}

type ActionTypes =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType


export const todolistReducer = (state: todolistType[], action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists(todolists.filter(tl => tl.id !== todolistId))
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            // let newIdTodolist = '546546'
             let newTodolist: todolistType = { id: action.newIdTodolist, title: action.newTodolistTitle, filter: "All" };
            return [...state, newTodolist]
            // setTodolists([newTodolist, ...todolists]);
            // setTasks({ ...tasks, [newIdTodolist]: [] })

        }
        case 'CHANGE-TODOLIST-TITLE': {
            // setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
            return state.map(tl => tl.id === action.todolistId ? { ...tl, title: action.newTodolistTitle } : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            //  setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newValueFilter } : tl))
            return state.map(tl => tl.id === action.todolistId ? { ...tl, filter: action.newFilter } : tl)
        }
        default:
            throw new Error('не ивестный тип экшн')

    }
}


export const RemoveTodoolistAC = (todolistId: string) : RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId: todolistId
    }
}

export const AddTodoolistAC = (newTodolistTitle: string) : AddTotodlistActionType => {
    const crypto = require('crypto');
    let newIdTodolist = crypto.randomUUID();
   
    return {
        type: 'ADD-TODOLIST',
        newIdTodolist,
        newTodolistTitle: newTodolistTitle
    }
}

export const changeTodoolistTitleAC = (todolistId: string, newTodolistTitle: string) : ChangeTotodlistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId: todolistId,
        newTodolistTitle: newTodolistTitle
    }
}

export const changeTodoolistFilterAC = (todolistId: string, newFilter: FilterValueType) : ChangeTotodlistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId: todolistId,
        newFilter: newFilter
    }
}
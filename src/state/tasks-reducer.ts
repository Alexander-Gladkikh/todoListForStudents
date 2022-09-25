
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todoListId1, todoListId2} from "./todolist-reducer";
import {TasksStateType} from "../AppWithRedux";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}
export type AddTasksActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTasksActionType |
    changeTaskStatusActionType | changeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType

 const initionState: TasksStateType = {
     // [todoListId1]: [
     //     {id: v1(), title: 'HTML/CSS', isDone: true},
     //     {id: v1(), title: 'JS', isDone: true},
     //     {id: v1(), title: 'React', isDone: false},
     //     {id: v1(), title: 'Redax', isDone: false}],
     // [todoListId2]: [
     //     {id: v1(), title: 'Book', isDone: false},
     //     {id: v1(), title: 'Milk', isDone: true},
     // ]
 }


export const tasksReducer = (state: TasksStateType = initionState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            let filteredTask = state[action.todolistId].filter(el => el.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTask
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const task = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [task, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
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
export const addTaskAC = (title: string, todolistId: string): AddTasksActionType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}




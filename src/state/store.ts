import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";


export const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootSate = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);




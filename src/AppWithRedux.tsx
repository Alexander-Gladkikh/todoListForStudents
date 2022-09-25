import React  from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootSate} from "./state/store";

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

    const dispatch = useDispatch()
    const todoList = useSelector<AppRootSate, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootSate, TasksStateType>(state => state.tasks)

    const removeTask = (id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId));
    }

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId));
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListId))
    }

    const changeTitle = (id: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    }

    const changeFilter = (filter: FilterType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatch(action)
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }


    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }


    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {
                todoList.map((tl) => {
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            changeTitleStatus={changeTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    )
}



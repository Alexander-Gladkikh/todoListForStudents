import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistReducer,
        [
            {id: todoListId1, title: 'What to learn', filter: 'all'},
            {id: todoListId2, title: 'What to buy', filter: 'all'}
        ]
    )

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todoListId1]: [
                {id: v1(), title: 'HTML/CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Redax', isDone: false}],
            [todoListId2]: [
                {id: v1(), title: 'Book', isDone: false},
                {id: v1(), title: 'Milk', isDone: true},
            ]
        }
    )


    const removeTask = (id: string, todoListId: string) => {
        dispatchToTasksReducer(removeTaskAC(id, todoListId));
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todoListId));
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todoListId))
    }

    const changeTitle = (id: string, newTitle: string, todoListId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todoListId))
    }

    const changeFilter = (filter: FilterType, todoListId: string) => {
        dispatchToTodoListsReducer(changeTodolistFilterAC(todoListId, filter))
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        dispatchToTodoListsReducer(changeTodolistTitleAC(id, newTitle))
    }


    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
    }


    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
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



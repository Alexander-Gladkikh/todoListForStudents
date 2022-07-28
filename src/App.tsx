import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoListId1, title: 'What to learn', filter: 'all'},
            {id: todoListId2, title: 'What to buy', filter: 'all'}
        ]
    )

    let [tasksObj, setTasksObj] = useState<TasksStateType>(
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
        let filteredTask = tasksObj[todoListId].filter((t) => t.id !== id)
        tasksObj[todoListId] = filteredTask
        setTasksObj({...tasksObj})
    }

    const changeFilter = (filter: FilterType, todoListId: string) => {
        let todoList = todoLists.find((tl) => tl.id === todoListId)
        if (todoList) {
            todoList.filter = filter;
            setTodoLists([...todoLists])
        }
    }

    const addTask = (title: string, todoListId: string) => {
        const task = {id: v1(), title: title, isDone: false}
        tasksObj[todoListId] = [task, ...tasksObj[todoListId]]
        setTasksObj({...tasksObj})
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        let task = tasksObj[todoListId].find((t) => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    const changeTitle = (id: string, newTitle: string, todoListId: string) => {
        let task = tasksObj[todoListId].find((t) => t.id === id)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        let todoList = todoLists.find((t) => t.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
        setTodoLists([...filteredTodoList]);

        delete tasksObj[todoListId];

        setTasksObj({...tasksObj})
    }



    function addTodoList (title: string) {
        let todoList:TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({
            ...tasksObj,
        [todoList.id]: []
        })
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



import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {Input} from "./components/Input";


export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'completed'}
    ])

    let [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    const removeTodoList = (todoListId: string) => {
        setTodoList(todoList.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
    }
    const changeCheckBox = (todoListId: string, id: string, value: boolean) => {
        setTasks({...tasks, [todoListId]:tasks[todoListId].map(el => el.id === id ? {...el, isDone:value} : el )})
    }
    const addTask = (todoListId: string, newTitle: string) => {
        const newTasks = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todoListId]:[newTasks, ...tasks[todoListId]]})

    }
    function removeTask(todoListId: string, taskId: string) {
        setTasks({...tasks, [todoListId]:tasks[todoListId].filter(el => el.id !== taskId)})
    }
    function changeFilter(todoListId: string, value: FilterValuesType) {
         setTodoList(todoList.map(el => el.id === todoListId ? {...el, filter: value} : el));
    }

    const addTodoList = (newTitle: string) => {
        let newTodoListId = v1();
        let newTodo:TodoListType = {id: newTodoListId, title: newTitle, filter: 'all'}
        setTodoList([newTodo, ...todoList])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const editTask = (todoListId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoListId]:tasks[todoListId].map(el => el.id === taskId ? {...el, title:newTitle} : el)})
    }

    const editTodoList = (todoListId: string, newTitle: string) => {
        setTodoList(todoList.map(el => el.id === todoListId ? {...el, title:newTitle} : el))
    }

    return (
        <div className="App">
            <Input callBack={addTodoList}/>
            {todoList.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        todoListId={el.id}
                        filter={el.filter}
                        changeCheckBox={changeCheckBox}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        removeTodoList={removeTodoList}
                        editTask={editTask}
                        editTodoList={editTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;

import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import CheckBox from "./components/CheckBox";
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    filter: FilterValuesType
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, newTitle: string) => void
    changeCheckBox: (todoListId: string, id: string, value: boolean) => void
    removeTodoList: (todoListId: string) => void
    editTask: (todoListId: string, taskId: string, newTitle: string) => void
    editTodoList: (todoListId: string, newTitle: string) => void
}


export function Todolist(props: PropsType) {

    const tsarChangeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todoListId, value)
    }
    const changeCheckBoxHandler = (tID: string, value: boolean) => {
        props.changeCheckBox(props.todoListId, tID, value)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todoListId, newTitle)
    }

    const editTaskHandler = (taskId: string, newTitle:string) => {
        props.editTask(props.todoListId, taskId, newTitle)
    }

    const editTodoListHandler = (newTitle: string) => {
        props.editTodoList(props.todoListId, newTitle)
    }



    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan title={props.title} callBack={editTodoListHandler}/>
        <button onClick={removeTodoListHandler}>X</button>
        </h3>
      <Input callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => <li key={t.id} className={t.isDone ? styles.isDone : ""}>
                    <CheckBox
                        checked={t.isDone}
                        callback={(value) => changeCheckBoxHandler(t.id, value)}/>
                    <EditableSpan title={t.title} callBack={(newTitle) => editTaskHandler(t.id, newTitle)}/>
                    <button onClick={() => {
                        props.removeTask(props.todoListId,t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button className={props.filter==='all' ? styles.activeButton : ''} onClick={() => tsarChangeFilterHandler('all')}> All</button>
            <button className={props.filter==='active' ? styles.activeButton : ''} onClick={() => tsarChangeFilterHandler('active')}>Active</button>
            <button className={props.filter==='completed' ? styles.activeButton : ''} onClick={() => tsarChangeFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}

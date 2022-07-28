import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (filter: FilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTitleStatus: (id: string, newValue: string, todoListId: string) => void
    filter: FilterType
    id: string
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: TodoListProps) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle, )
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div className='TodoList'>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitleHandler}/>
                <button onClick={removeTodoListHandler}>X</button>
                {/*<IconButton onClick={removeTodoListHandler}>*/}
                {/*    <DeleteIcon/>*/}
                {/*    </IconButton>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <ul>
                    {props.tasks.map((t) => {

                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTitleStatus(t.id, newValue, props.id)
                        }

                        return (
                            <li className={t.isDone ? 'is-done' : ''}
                                key={t.id}>
                                <input
                                    type='checkbox'
                                    checked={t.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}


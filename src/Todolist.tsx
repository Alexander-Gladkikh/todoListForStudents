import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeCheckBox: (id: string, value: boolean) => void
}


export function Todolist(props: PropsType) {
    const [error, setError] = useState<string | null>(null)
    let [newTitle, setNewTitle] = useState('')

    const onClickTaskHandler = () => {
        if (newTitle.trim() != "") {
            props.addTask(newTitle.trim())
            setNewTitle('')

        } else setError('Title is require')
    }
    const onChangeClickTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickTaskHandler()
        }
    }


    const tsarChangeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    const changeCheckBoxHandler = (tID: string, value: boolean) => {
        props.changeCheckBox(tID, value)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? styles.error : ''}
                value={newTitle} onChange={onChangeClickTaskHandler}
                onKeyDown={onKeyPressHandler}/>
            <button onClick={onClickTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(event) => changeCheckBoxHandler(t.id, event.currentTarget.checked)}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => tsarChangeFilterHandler('all')}> All</button>
            <button onClick={() => tsarChangeFilterHandler('active')}>Active</button>
            <button onClick={() => tsarChangeFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}

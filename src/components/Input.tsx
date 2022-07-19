import React, {ChangeEvent, useState} from "react";
import styles from "../Todolist.module.css";

type InputPropsType = {
    callBack: (newTitle: string) => void
}

export function Input(props:InputPropsType){

    let [error, setError] = useState<string | null>(null)
    let [newTitle, setNewTitle] = useState('')

    const onClickTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.callBack(newTitle.trim())
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

    return (
        <div>
            <input
                className={error ? styles.error : ''}
                value={newTitle} onChange={onChangeClickTaskHandler}
                onKeyDown={onKeyPressHandler}/>
            <button onClick={onClickTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
}
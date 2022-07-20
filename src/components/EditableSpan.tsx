import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsSpan = {
    title: string
    callBack: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsSpan) {

    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeClickTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const [edit, setEdit] = useState(false)

    const onClickTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.callBack(newTitle)
            //setNewTitle('')
        }
    }
    const changeEditHandler = () => {
        setEdit(!edit);
        onClickTaskHandler()
    }

    return (
        edit
            ? <input value={newTitle} onChange={onChangeClickTaskHandler} onBlur={changeEditHandler} autoFocus/>
            : <span onDoubleClick={changeEditHandler}>{props.title}</span>
    );
}


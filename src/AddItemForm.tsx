import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
    
    addItem: (newTaskTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {



    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onPressKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            props.addItem( newTaskTitle);
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError("неможет быть пустым");
            setNewTaskTitle("")
        }

    }

    return (
        <div>
            <input
                className={error ? "error" : ''}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onPressKeyHandler}
            />
            <button
                onClick={addTask}>+
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
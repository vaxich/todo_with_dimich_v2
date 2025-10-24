import { ControlPoint } from "@mui/icons-material";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
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
            props.addItem(newTaskTitle);
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
            {/* <input
                className={error ? "error" : ''}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onPressKeyHandler}
            /> */}
            <TextField
                variant="outlined"
                label="type value"
                error={!!error}
                helperText={error}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onPressKeyHandler}
            />
            <IconButton
                color="primary"
                onClick={addTask}>
                <ControlPoint />
            </IconButton>
            {/* {error && <div className="error-message">{error}</div>} */}
        </div>
    )
}
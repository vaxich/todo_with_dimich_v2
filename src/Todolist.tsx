import { ChangeEvent } from "react"
import { FilterValueType, TaskType } from "./App"
import DeleteIcon from '@mui/icons-material/Delete';
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";


type TodolistPropsType = {
    title: string
    filter: FilterValueType
    tasks: TaskType[]
    todolistId: string
    removetask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, newValueFilter: FilterValueType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskID: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    // const [newTaskTitle, setNewTaskTitle] = useState("");
    // const [error, setError] = useState<string | null>(null);

    // const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(event.currentTarget.value)
    // }

    // const onPressKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (event.charCode === 13) {
    //         props.addTask(props.todolistId, newTaskTitle);
    //         setNewTaskTitle("")
    //     }
    // }

    // const addTask = () => {
    //     if (newTaskTitle.trim() !== '') {
    //         props.addTask(props.todolistId, newTaskTitle.trim());
    //         setNewTaskTitle("")
    //     } else {
    //         setError("неможет быть пустым");
    //         setNewTaskTitle("")
    //     }

    // }

    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, "All")
    }

    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, "Active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, "Completed")
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }

    return (
        <div>
            <div>
                {/* <h3>{props.title}</h3> */}
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler} />
                {/* <button onClick={removeTodolistHandler}>X</button> */}
                <IconButton size="small" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskHandler} />
            {/* <div>
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
            </div> */}
            <div>
                {
                    props.tasks.map((task) => {

                        const onRemoveHandler = () => {
                            props.removetask(props.todolistId, task.id)
                        }
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todolistId, task.id, event.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(props.todolistId, task.id, newValue)
                        }
                        return (
                            <div key={task.id} className={task.isDone ? "is-done" : ""}>
                                {/* <input type={"checkbox"} checked={task.isDone} onChange={onChangeStatusHandler} /> */}
                                <Checkbox checked={task.isDone} onChange={onChangeStatusHandler}  />
                                {/* <span>{task.title}</span> */}
                                <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
                                {/* <button onClick={onRemoveHandler}>X</button> */}
                                <IconButton size="small" onClick={onRemoveHandler}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>

                        )
                    })
                }

            </div>
            <div>
                <Button variant={props.filter === "All" ? "contained" : "outlined"} color="primary"  onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "Active" ? "contained" : "outlined"} color="secondary"  onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "Completed" ? "contained" : "outlined"}  color="error"  onClick={onCompletedClickHandler}>Completed</Button>

            </div>
        </div>
    )
}
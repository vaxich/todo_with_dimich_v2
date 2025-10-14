import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValueType, TaskType } from "./App"
import { error } from "console"


type TodolistPropsType = {
    title: string
    filter: FilterValueType
    tasks: TaskType[]
    removetask: (taskId: string) => void
    changeFilter: (newValueFilter: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onPressKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError("неможет быть пустым");
            setNewTaskTitle("")
        }

    }

    const onAllClickHandler = () => {
        props.changeFilter("All")
    }

    const onActiveClickHandler = () => {
        props.changeFilter("Active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("Completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className= {error ? "error" : ''}
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onPressKeyHandler}
                />
                <button
                    onClick={addTask}>+
                </button>
                { error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((task) => {

                        const onRemoveHandler = () => {
                            props.removetask(task.id)
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, event.currentTarget.checked)
                        }

                        return (
                            <li key={task.id} className={ task.isDone ? "is-done" : ""}>
                                <input type={"checkbox"} checked={task.isDone} onChange={onChangeHandler} />
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler}>X</button></li>
                        )
                    })
                }

            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "Completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
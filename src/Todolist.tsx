import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValueType, TaskType } from "./App"


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removetask: (taskId: string) => void
    changeFilter: (newValueFilter: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onPressKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle); setNewTaskTitle("")
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
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onPressKeyHandler}
                />
                <button
                    onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {

                        const onRemoveHandler = () => {
                            props.removetask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type={"checkbox"} checked={task.isDone} />
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler}>X</button></li>
                        )
                    })
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
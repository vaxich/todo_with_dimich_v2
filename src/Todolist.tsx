import { ChangeEvent } from "react"
import { FilterValueType, TaskType } from "./App"

import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"


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
    changeTodolistTitle: (todolistId: string, title: string ) => void
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
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
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
            <ul>
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
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type={"checkbox"} checked={task.isDone} onChange={onChangeStatusHandler} />
                                {/* <span>{task.title}</span> */}
                                <EditableSpan title={task.title} onChange={ onChangeTitleHandler} />
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
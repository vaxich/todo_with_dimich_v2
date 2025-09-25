import { FilterValueType, TaskType } from "./App"


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removetask: (taskId: string) => void
    changeFilter: (newValueFilter: FilterValueType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map( (task) => {
                        return (
                            <li>
                                <input type={"checkbox"} checked={task.isDone} />
                                <span>{task.title}</span>
                                <button onClick={ () => {props.removetask(task.id)}}>X</button></li>
                        )
                    })
                }
                
            </ul>
            <div>
                <button onClick = { () => {props.changeFilter("All")}}>All</button>
                <button onClick = { () => {props.changeFilter("Active")}}>Active</button>
                <button onClick = { () => {props.changeFilter("Completed")}}>Completed</button>
            </div>
        </div>
    )
}
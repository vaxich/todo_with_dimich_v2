
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed"

function App() {

  const [tasks, setTasks] = useState<TaskType[]>(
    [
      { id: crypto.randomUUID(), title: "HTML", isDone: true },
      { id: crypto.randomUUID(), title: "JS", isDone: true },
      { id: crypto.randomUUID(), title: "React", isDone: false },
    ]
  )

  const [filter, setFilter] = useState<FilterValueType>("All")

  let tasksForTodolist = tasks;

  if (filter === "Active") {
    tasksForTodolist = tasks.filter((task) => task.isDone === false)
  }
  if (filter === "Completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone === true)
  }

  const removetask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
  }

  const addTask = (newTaskTitle: string) => {
    const newTask = { id: crypto.randomUUID(), title: newTaskTitle, isDone: false }
    setTasks([newTask, ...tasks])
  }

  const changeFilter = (newValueFilter: FilterValueType) => {
    setFilter(newValueFilter)
  }

  const changeTaskStatus = (taskID: string, isDone: boolean) => {
    const newTasks = tasks.map((task) => task.id === taskID ? { ...task, isDone: isDone }: task)
    setTasks(newTasks)
}



return (
  <div className="App">
    <Todolist
      title="what to learn"
      filter={filter}
      tasks={tasksForTodolist}
      removetask={removetask}
      changeFilter={changeFilter}
      addTask={addTask}
      changeTaskStatus={changeTaskStatus}
    />


  </div>
);
}

export default App;

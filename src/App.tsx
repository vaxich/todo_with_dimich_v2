
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

  const changeFilter = (newValueFilter: FilterValueType) => {
    setFilter(newValueFilter)
  }

  return (
    <div className="App">
      <Todolist title="what to learn" tasks={tasksForTodolist} removetask={removetask} changeFilter={changeFilter}/>


    </div>
  );
}

export default App;


import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';



export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TasksStateType = {
  [key: string]: TaskType[]
}

type todolistType = {
  id: string,
  title: string,
  filter: FilterValueType
}

export type FilterValueType = "All" | "Active" | "Completed"

function App() {

  const todolistId1 = crypto.randomUUID()
  const todolistId2 = crypto.randomUUID()

  const [todolists, setTodolists] = useState<todolistType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: crypto.randomUUID(), title: 'Rest API', isDone: true },
      { id: crypto.randomUUID(), title: 'GraphQL', isDone: false },
    ],
  })



  const removetask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    // const newTasks = tasks.filter((task) => task.id !== taskId)
    // setTasks(newTasks)
  }

  const addTask = (todolistId: string, newTaskTitle: string) => {
    const newTask = { id: crypto.randomUUID(), title: newTaskTitle, isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    // setTasks([newTask, ...tasks])
  }

  const changeFilter = (todolistId: string, newValueFilter: FilterValueType) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newValueFilter } : tl))
    //setFilter(newValueFilter)
  }

  const changeTaskStatus = (todolistId: string, taskID: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskID ? { ...task, isDone: isDone } : task) })
    // const newTasks = tasks.map((task) => task.id === taskID ? { ...task, isDone: isDone } : task)
    // setTasks(newTasks)
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  const addTodolist = (newTitle: string) => {
    let newIdTodolist = crypto.randomUUID();
    let newTodolist: todolistType = { id: newIdTodolist, title: newTitle, filter: "All" };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [newIdTodolist]: [] })

  }

  const changeTaskTitle = (todolistId: string, taskID: string, newTitle: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskID ? { ...task, title: newTitle } : task) })
  }

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
  }


  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {
        todolists.map(tl => {

          let tasksForTodolist = tasks[tl.id];

          if (tl.filter === "Active") {
            tasksForTodolist = tasks[tl.id].filter((task) => task.isDone === false)
          }
          if (tl.filter === "Completed") {
            tasksForTodolist = tasks[tl.id].filter((task) => task.isDone === true)
          }

          return (
            <Todolist
              key={tl.id}
              todolistId={tl.id}
              title={tl.title}
              filter={tl.filter}
              tasks={tasksForTodolist}
              removetask={removetask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              removeTodolist={removeTodolist}
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}
            />
          )
        })
      }



    </div>
  );
}

export default App;

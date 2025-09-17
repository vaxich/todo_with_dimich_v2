
import './App.css';
import { Todolist } from './Todolist';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function App() {

const tasks1 : TaskType[]= [
  {id: crypto.randomUUID(), title: "HTML" , isDone: true},
  {id: crypto.randomUUID(), title: "JS" , isDone: true},
  {id: crypto.randomUUID(), title: "React" , isDone: false},
]

const tasks2 : TaskType[] = [
  {id: crypto.randomUUID(), title: "milk" , isDone: true},
  {id: crypto.randomUUID(), title: "bread" , isDone: true},
  {id: crypto.randomUUID(), title: "tea" , isDone: false},
]

  return (
    <div className="App">
      <Todolist title = "what to learn" tasks = {tasks1}/>
      <Todolist title='what to buy' tasks = {tasks2}/>
      
    </div>
  );
}

export default App;

import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { ITask } from "./interfaces";
import ToDoTask from "./components/ToDoTask";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = () => {
    const newTask: ITask = {
      taskName: task,
      deadline: deadline,
    };
    if(task === "" && deadline === 0){
      return null;
    }else{
      setTodoList([...todoList, newTask]);
      setTask("")
      setDeadline(0)
    }
  };

  const completeTask = (taskNametoDelete:string):void => {
    setTodoList(todoList.filter((task)=>{
      return task.taskName !== taskNametoDelete;
    }))
}

  return (
    <div className="App">
      <header className="header">
        <div className="input-container">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline"
            value={deadline}
            name="deadline"
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </header>
      <button className="active">Active {todoList.length}</button>
      <div className="todoList">
        {todoList.map((task: ITask, key:number)=>{
          return <ToDoTask completeTask={completeTask} key={key} task={task} />
        })}
      </div>
    </div>
  );
};

export default App;

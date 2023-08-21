"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEdidting] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const todosDb = await axios.get("http://localhost:3000/todos");
    setTodos(todosDb.data);
  };

  const saveTodo = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:3000/todos/${editing._id}`, {
        name: todoName,
      });
    } else {
      await axios.post("http://localhost:3000/todos", {
        name: todoName,
      });
    }
    setTodoName("");
    setEdidting(null);
    await fetch();
  };

  const markAs = async (todo: any) => {
    await axios.put(`http://localhost:3000/todos/status/${todo._id}`, {
      status: todo.status === "complete" ? "incomplete" : "complete",
    });
    await fetch();
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    await fetch();
  };

  const onChangeFilter = (e: any) => {
    setFilter(e.target.value);
  };

  const setTodoToEdit = (todo: any) => {
    setTodoName(todo.name);
    setEdidting(todo);
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={saveTodo} className="flex gap-3 p-10 border-2">
        Todo Name
        <input value={todoName} onChange={(e) => setTodoName(e.target.value)} />
        <button type="submit">Save</button>
      </form>
      <div>
        <div
          onChange={onChangeFilter}
          className="flex justify-between py-10 gap-8"
        >
          Filter:
          <div className="flex gap-2">
            <input
              type="radio"
              value="all"
              name="all"
              checked={filter === "all"}
            />
            all
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              value="complete"
              name="complete"
              checked={filter === "complete"}
            />
            complete
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              value="incomplete"
              name="incomplete"
              checked={filter === "incomplete"}
            />
            incomplete
          </div>
        </div>
        <div className="w-full p-10 border-2 border-white">
          {todos
            .filter((todo: any) => filter === "all" || todo.status === filter)
            .map((todo: any) => (
              <div key={todo._id} className="flex flex-row gap-4">
                <span className="mr-auto">
                  {todo.name} - {todo.status ? todo.status : "incomplete"}
                </span>
                <button className="ml-10" onClick={() => markAs(todo)}>
                  Mark as{" "}
                  {todo.status === "complete" ? "incomplete" : "complete"}
                </button>
                <button className="ml-10" onClick={() => setTodoToEdit(todo)}>
                  Edit
                </button>
                <button className="ml-10" onClick={() => deleteTodo(todo._id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

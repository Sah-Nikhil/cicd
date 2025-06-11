"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 p-4">
      <Card className="w-full max-w-md shadow-2xl border border-neutral-800 bg-neutral-900/95 backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <CardTitle className="text-3xl font-extrabold text-white tracking-tight">Todo App</CardTitle>
          <span className="text-xs text-neutral-400 uppercase tracking-widest">Minimal. Modern. Monochrome. My GAWD</span>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo();
            }}
            className="flex gap-2 mb-6"
          >
            <Input
              placeholder="Add a new todo..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:border-white focus:ring-2 focus:ring-neutral-600/40 rounded-md shadow-sm"
            />
            <Button type="submit" className="bg-white text-black font-semibold rounded-md shadow hover:bg-neutral-200 transition">SLAP THAT</Button>
          </form>
          <ul className="flex flex-col gap-2">
            {todos.length === 0 && (
              <li className="text-neutral-600 text-center italic">No todos yet. Add your first one!</li>
            )}
            {todos.map(todo => (
              <li
                key={todo.id}
                className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 border border-neutral-800 ${todo.completed ? 'bg-neutral-800/80' : 'bg-neutral-900/80 hover:bg-neutral-800/90'} shadow-sm`}
              >
                <span
                  className={`cursor-pointer select-none text-base font-medium transition-all duration-200 ${todo.completed ? "line-through text-neutral-500" : "text-white hover:text-neutral-200"}`}
                  onClick={() => toggleTodo(todo.id)}
                  title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTodo(todo.id)}
                  aria-label="Delete todo"
                  className="hover:bg-neutral-800 hover:text-white/70"
                >
                  <span className="text-lg">🗑️</span>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

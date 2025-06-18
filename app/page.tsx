"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: number;
  text: string;
}

function TodoItem({ todo, onUpdate }: { todo: Todo; onUpdate: (todo: Todo) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (!editText.trim()) return;
    onUpdate({ ...todo, text: editText.trim() });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {isEditing ? (
        <Input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:border-white focus:ring-2 focus:ring-neutral-600/40 rounded-md shadow-sm"
          onKeyDown={e => {
            if (e.key === "Enter") handleUpdate();
          }}
        />
      ) : (
        <span className="select-none text-base font-medium text-white truncate">{todo.text}</span>
      )}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(prev => !prev)}
          aria-label={isEditing ? "Cancel editing" : "Edit todo"}
          className="hover:bg-neutral-800 hover:text-white/70"
        >
          {isEditing ? "💾" : "✏️"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeTodo(todo.id)}
          aria-label="Delete todo"
          className="hover:bg-neutral-800 hover:text-white/70"
        >
          <span className="text-lg">🗑️</span>
        </Button>
      </div>
    </div>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim() },
    ]);
    setInput("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 p-4">
      <Card className="w-full max-w-md shadow-2xl border border-neutral-800 bg-neutral-900/95 backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <CardTitle className="text-3xl font-extrabold text-white tracking-tight">Todo App</CardTitle>
          <span className="text-xs text-neutral-400 uppercase tracking-widest">Minimal. Modern. Dark.</span>
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
            <Button type="submit" className="bg-white text-black font-semibold rounded-md shadow hover:bg-neutral-200 transition">Add</Button>
          </form>
          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {todos.length === 0 && (
                <motion.li
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-neutral-600 text-center italic"
                >
                  No todos yet. Add your first one!
                </motion.li>
              )}
              {todos.map(todo => (
                <motion.li
                  key={todo.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 border border-neutral-800 bg-neutral-900/80 shadow-sm"
                >
                  <TodoItem todo={todo} onUpdate={updateTodo} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

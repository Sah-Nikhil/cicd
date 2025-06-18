"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: number;
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
  deadline?: string; // ISO date string
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editDeadline, setEditDeadline] = useState("");

  function getUrgencyColor(dateStr: string | undefined): 'blue' | 'green' | 'yellow' | 'red' {
    if (!dateStr) return 'blue';
    const today = new Date();
    const deadline = new Date(dateStr);
    // Set both to midnight for accurate day diff
    today.setHours(0,0,0,0);
    deadline.setHours(0,0,0,0);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'red'; // Past deadline
    if (diffDays === 0) return 'red'; // Deadline today
    if (diffDays <= 3) return 'yellow'; // Deadline in 3 days
    if (diffDays <= 7) return 'green'; // Deadline in a week
    return 'blue'; // No deadline or far in future
  }

  const addTodo = () => {
    if (!input.trim()) return;
    const color = getUrgencyColor(deadline);
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), color, deadline: deadline || undefined },
    ]);
    setInput("");
    setDeadline("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id: number, text: string, deadline?: string) => {
    setEditingId(id);
    setEditText(text);
    setEditDeadline(deadline || "");
  };

  const saveEdit = (id: number) => {
    const color = getUrgencyColor(editDeadline);
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText, deadline: editDeadline || undefined, color } : todo));
    setEditingId(null);
    setEditText("");
    setEditDeadline("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditDeadline("");
  };

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    red: 'bg-red-500',
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
            <input
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-white rounded-md px-2 py-1"
              title="Set deadline"
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
                  className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 border border-neutral-800 bg-neutral-900/80 shadow-sm`}
                >
                  <span className={`w-3 h-3 rounded-full mr-3 ${colorMap[todo.color]}`}></span>
                  {editingId === todo.id ? (
                    <div className="flex flex-1 items-center gap-2">
                      <Input
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        className="flex-1 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:border-white focus:ring-2 focus:ring-neutral-600/40 rounded-md shadow-sm"
                      />
                      <input
                        type="date"
                        value={editDeadline}
                        onChange={e => setEditDeadline(e.target.value)}
                        className="bg-neutral-800 border border-neutral-700 text-white rounded-md px-2 py-1"
                        title="Set deadline"
                      />
                      <Button size="sm" className="bg-green-500 text-white" onClick={() => saveEdit(todo.id)}>Save</Button>
                      <Button size="sm" variant="ghost" onClick={cancelEdit}>Cancel</Button>
                    </div>
                  ) : (
                    <>
                      <span className="select-none text-base font-medium text-white truncate">{todo.text}</span>
                      {todo.deadline && (
                        <span className="ml-2 text-xs text-neutral-400">{todo.deadline}</span>
                      )}
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEdit(todo.id, todo.text, todo.deadline)}
                          aria-label="Edit todo"
                          className="hover:bg-neutral-800 hover:text-white/70"
                        >
                          <span className="text-lg">✏️</span>
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
                    </>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

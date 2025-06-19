"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

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

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 transition-colors duration-300"
    >
      <div className="absolute top-4 right-4 z-40">
        {/* ThemeToggle is now only in layout */}
      </div>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.1 }}
      >
        <Card className="w-full max-w-md shadow-2xl border border-neutral-800 bg-card/95 backdrop-blur-lg">
          <CardHeader className="flex flex-col items-center gap-2 pb-2">
            <CardTitle className="text-3xl font-extrabold text-white tracking-tight">Todo App by </CardTitle>
            <span className="text-xs text-neutral-400 uppercase tracking-widest">Minimal. Modern.</span>
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
              <Button type="submit" className="bg-white text-black font-semibold rounded-md shadow hover:bg-neutral-200 transition">SLAP THAT my G</Button>
            </form>
            <ul className="flex flex-col gap-2">
              <AnimatePresence>
                {todos.length === 0 && (
                  <motion.li
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-neutral-600 text-center italic"
                  >
                    No todos yet. Add your first one!
                  </motion.li>
                )}
                {todos.map(todo => (
                  <motion.li
                    key={todo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 border border-neutral-800 ${todo.completed ? 'bg-neutral-800/80' : 'bg-neutral-900/80 hover:bg-neutral-800/90'} shadow-sm`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Link href={`/todo/${todo.id}`} className="flex-1 min-w-0">
                        <span
                          className={`select-none text-base font-medium transition-all duration-200 truncate ${todo.completed ? "line-through text-neutral-500" : "text-white"}`}
                        >
                          {todo.text}
                        </span>
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTodo(todo.id)}
                      aria-label="Delete todo"
                      className="hover:bg-neutral-800 hover:text-white/70"
                    >
                      <motion.span
                        whileTap={{ scale: 0.8, rotate: -20 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-lg"
                      >
                        🗑️
                      </motion.span>
                    </Button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

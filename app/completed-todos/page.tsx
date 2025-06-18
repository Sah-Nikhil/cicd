"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function CompletedTodosPage() {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Try to load from localStorage or another persistent store if used
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        const todos: Todo[] = JSON.parse(stored);
        setCompletedTodos(todos.filter((t) => t.completed));
      } catch {}
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 p-4"
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.1 }}
      >
        <Card className="w-full max-w-md shadow-2xl border border-neutral-800 bg-neutral-900/95 backdrop-blur-lg">
          <CardHeader className="flex flex-col items-center gap-2 pb-2">
            <CardTitle className="text-3xl font-extrabold text-white tracking-tight">Completed Todos</CardTitle>
            <span className="text-xs text-neutral-400 uppercase tracking-widest">See what you&apos;ve finished!</span>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              <AnimatePresence>
                {completedTodos.length === 0 && (
                  <motion.li
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-neutral-600 text-center italic"
                  >
                    No completed todos yet.
                  </motion.li>
                )}
                {completedTodos.map((todo) => (
                  <motion.li
                    key={todo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 border border-neutral-800 bg-neutral-800/80 shadow-sm"
                  >
                    <span className="select-none text-base font-medium text-white truncate">{todo.text}</span>
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

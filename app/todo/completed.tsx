"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TodoItem, { Todo } from "@/components/todo/TodoItem";

interface CompletedTodo extends Todo {
  completedAt: number; // timestamp
}

export default function CompletedTodosPage() {
  // For demo: Replace with persistent storage or context in real app
  const [completedTodos, setCompletedTodos] = useState<CompletedTodo[]>([]);

  // Example: sort by completedAt descending
  const sortedTodos = [...completedTodos].sort((a, b) => b.completedAt - a.completedAt);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 p-4">
      <Card className="w-full max-w-md shadow-2xl border border-neutral-800 bg-neutral-900/95 backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <CardTitle className="text-2xl font-extrabold text-white tracking-tight">Completed Todos</CardTitle>
          <span className="text-xs text-neutral-400 uppercase tracking-widest">Sorted by completion date</span>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2">
            {sortedTodos.length === 0 && (
              <li className="text-neutral-600 text-center italic">No completed todos yet.</li>
            )}
            {sortedTodos.map(todo => (
              <li key={todo.id} className="flex flex-col gap-1 p-3 rounded-lg bg-neutral-800/80 border border-neutral-700">
                <span className="text-white line-through text-base font-medium truncate">{todo.text}</span>
                <span className="text-xs text-neutral-400">Completed: {new Date(todo.completedAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

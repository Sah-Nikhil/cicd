"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoDetail {
  id: number;
  text: string;
  note: string;
}

export default function TodoDetailPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const [todo, setTodo] = useState<TodoDetail | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    // For demo: fetch from localStorage or mock
    if (id) {
      const todos = JSON.parse(localStorage.getItem("todos") || "[]");
      const found = todos.find((t: any) => String(t.id) === id);
      if (found) {
        setTodo(found);
        setNote(found.note || "");
      }
    }
  }, [id]);

  const saveNote = () => {
    if (!todo) return;
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const updated = todos.map((t: any) =>
      String(t.id) === id ? { ...t, note } : t
    );
    localStorage.setItem("todos", JSON.stringify(updated));
    setTodo({ ...todo, note });
  };

  const deleteTodo = () => {
    if (!todo) return;
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const updated = todos.filter((t: any) => String(t.id) !== id);
    localStorage.setItem("todos", JSON.stringify(updated));
    router.push("/todo");
  };

  if (!todo) return <div className="text-white p-10">Todo not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 p-4">
      <Card className="w-full max-w-md shadow-2xl border border-neutral-800 bg-neutral-900/95 backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <CardTitle className="text-2xl font-extrabold text-white tracking-tight">Todo Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="text-white text-lg font-semibold mb-2">{todo.text}</div>
            <label className="block text-neutral-400 mb-1">Notepad</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full min-h-[100px] bg-neutral-800 border border-neutral-700 text-white rounded-md p-2 mb-2"
              placeholder="Add details or notes..."
            />
            <Button onClick={saveNote} className="bg-white text-black font-semibold rounded-md shadow hover:bg-neutral-200 transition mr-2">Save Note</Button>
            <Button onClick={deleteTodo} variant="destructive" className="ml-2">Delete Todo</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

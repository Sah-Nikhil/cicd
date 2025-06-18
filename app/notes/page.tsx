"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NotesPage() {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addNote = () => {
    if (!input.trim()) return;
    setNotes([...notes, input.trim()]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 p-4">
      <Card className="w-full max-w-md shadow-2xl border border-neutral-700 bg-neutral-900/95 backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <CardTitle className="text-3xl font-extrabold text-white tracking-tight">Notes</CardTitle>
          <span className="text-xs text-neutral-400 uppercase tracking-widest">Jot down your thoughts</span>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              addNote();
            }}
            className="flex gap-2 mb-6"
          >
            <Input
              placeholder="Add a new note..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:border-white focus:ring-2 focus:ring-neutral-600/40 rounded-md shadow-sm"
            />
            <Button type="submit" className="bg-white text-black font-semibold rounded-md shadow hover:bg-neutral-200 transition">Add</Button>
          </form>
          <ul className="flex flex-col gap-2">
            {notes.length === 0 && (
              <li className="text-neutral-600 text-center italic">No notes yet. Add your first one!</li>
            )}
            {notes.map((note, idx) => (
              <li key={idx} className="rounded-lg px-3 py-2 border border-neutral-800 bg-neutral-900/80 shadow-sm text-white">
                {note}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

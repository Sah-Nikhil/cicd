"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const openModal = (title: string, id?: number, content?: string) => {
    setModalTitle(title);
    setModalContent(content || "");
    setShowModal(true);
    setEditingId(id ?? null);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTitle("");
    setModalContent("");
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!input.trim()) return;
    openModal(input.trim());
    setInput("");
  };

  const handleSave = () => {
    if (!modalTitle.trim() || !modalContent.trim()) return;
    if (editingId !== null) {
      setNotes(notes.map(n => n.id === editingId ? { ...n, title: modalTitle, content: modalContent } : n));
    } else {
      setNotes([...notes, { id: Date.now(), title: modalTitle, content: modalContent }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 p-4">
      <Card className="w-full max-w-md shadow-2xl border border-neutral-800 bg-neutral-900/95 backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <CardTitle className="text-3xl font-extrabold text-white tracking-tight">Notes</CardTitle>
          <span className="text-xs text-neutral-400 uppercase tracking-widest">Jot down your thoughts</span>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAdd();
            }}
            className="flex gap-2 mb-6"
          >
            <Input
              placeholder="Note title..."
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
            {notes.map((note) => (
              <li key={note.id} className="rounded-lg px-3 py-2 border border-neutral-800 bg-neutral-900/80 shadow-sm text-white flex items-center justify-between">
                <div>
                  <div className="font-semibold">{note.title}</div>
                  <div className="text-sm text-neutral-300 whitespace-pre-line">{note.content}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => openModal(note.title, note.id, note.content)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(note.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <div className="text-lg font-bold text-white mb-2">{editingId !== null ? 'Edit Note' : 'New Note'}</div>
              <Input
                placeholder="Note title..."
                value={modalTitle}
                onChange={e => setModalTitle(e.target.value)}
                className="mb-2 bg-neutral-800 border border-neutral-700 text-white"
              />
              <textarea
                placeholder="Write your note here..."
                value={modalContent}
                onChange={e => setModalContent(e.target.value)}
                className="w-full min-h-[100px] bg-neutral-800 border border-neutral-700 text-white rounded-md p-2 mb-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={closeModal} variant="ghost">Cancel</Button>
              <Button onClick={handleSave} className="bg-white text-black font-semibold rounded-md shadow hover:bg-neutral-200 transition">Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

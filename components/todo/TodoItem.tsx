import { Button } from "@/components/ui/button";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li
      className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 border border-neutral-800 ${todo.completed ? 'bg-neutral-800/80' : 'bg-neutral-900/80 hover:bg-neutral-800/90'} shadow-sm`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="accent-gray-50 w-5 h-5 rounded border border-neutral-600 bg-neutral-900 focus:ring-2 focus:ring-white/40 transition"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        />
        <span
          className={`select-none text-base font-medium transition-all duration-200 truncate ${todo.completed ? "line-through text-neutral-500" : "text-white"}`}
        >
          {todo.text}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(todo.id)}
        aria-label="Delete todo"
        className="hover:bg-neutral-800 hover:text-white/70"
      >
        <span className="text-lg">🗑️</span>
      </Button>
    </li>
  );
}

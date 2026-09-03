import { SearchTrigger } from "../search";
import ThemeToggle from "./ThemeToggle";

export default function FloatingThemeToggle() {
  return (
    <div className="fixed right-2 top-1/2 z-40 -translate-y-1/2 rounded-full bg-[var(--surface)] p-1 shadow-lg">
      <ThemeToggle variant="switch-vertical" />      
    </div>
  );
}
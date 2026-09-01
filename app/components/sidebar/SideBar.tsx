import { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="flex flex-col gap-8 lg:sticky lg:top-6 lg:self-start">
      {children}
    </aside>
  );
}
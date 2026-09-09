"use client";

import { ReactNode } from "react";

type ShareButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
};

const ShareButton = ({ label, onClick, children }: ShareButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white"
  >
    {children}
  </button>
);

export default ShareButton;
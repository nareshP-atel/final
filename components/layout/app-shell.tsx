"use client";

import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { mockUser } from "@/lib/mock-data";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar streak={mockUser.streak} isPremium={mockUser.isPremium} />
      <div className="pl-64">
        <Navbar
          userName={mockUser.name}
          userClass={mockUser.class}
          notificationCount={3}
        />
        <main className="min-h-[calc(100vh-4rem)] p-6">{children}</main>
      </div>
    </div>
  );
}

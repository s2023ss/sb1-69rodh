"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6" />
          <span className="font-bold text-xl">FlashCards</span>
        </Link>

        <div className="flex items-center space-x-4">
          {!isHome && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/sets">Setlerim</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/discover">Keşfet</Link>
              </Button>
            </>
          )}
          <ModeToggle />
          <Button variant="default" asChild>
            <Link href="/login">Giriş Yap</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function Header() {

  const router = useRouter();

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create",
      href: "/post/create",
    },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            Blog
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {
              navItems.map(item => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))
            }
          </nav>
          </div>
          <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {/* Placeholder for search */}
          </div>
          {/* placeholder for theme toggle */}
          <div className="flex items-center gap-2">
            <Button className="cursor-pointer" onClick={() => router.push('/auth')}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

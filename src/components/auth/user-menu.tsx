"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "better-auth";
import { LogOut, PenSquare, UserIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

interface UserMenuProps {
  user: User;
}

function UserMenu({ user }: UserMenuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Extract only the first letter, like Test Test => TT
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogut = async () => {
    setIsLoading(true);

    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast("You've been logged out.");
            router.refresh();
          },
        },
      });
    } catch (error) {
      toast("Failed to log out.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="relative h-8 w-8 rounded-full hover: cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(user.name) || "User"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex item- justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-bold">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/post/create">
            <PenSquare className="mr-2 h-4 w-4" />
            <span>Create Post</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogut}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>{isLoading ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;

"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChevronDown, LogOut, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/lib/api/auth-session-api";

export interface DashboardUser {
  name: string;
  subtitle?: string;
  avatar?: string;
  profileHref?: string;
}

interface DashboardUserMenuProps {
  user: DashboardUser;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DashboardUserMenu({ user }: DashboardUserMenuProps) {
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await logoutUser();

      router.replace("/admin/login");

      router.refresh();
    } catch (error) {
      console.error("Admin logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex min-w-[230px] items-center gap-3 rounded-[7px] border border-[#dcddef] bg-white px-3 py-[9px] text-left outline-none transition-colors hover:bg-[#fafaff]">
        <Avatar className="size-[38px]">
          {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}

          <AvatarFallback className="bg-[#dbe3ff] font-semibold text-[#2720a8]">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-[#11163d] text-[14px] leading-[18px]">{user.name}</div>

          {user.subtitle && <div className="truncate text-[#5d6280] text-[12px] leading-[17px]">{user.subtitle}</div>}
        </div>

        <ChevronDown className="size-4 shrink-0 text-[#2720a8]" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[230px]">
        {user.profileHref && (
          <>
            <DropdownMenuItem asChild>
              <Link href={user.profileHref}>
                <UserRound />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem onSelect={handleLogout} disabled={loggingOut} className="cursor-pointer">
          <LogOut />

          {loggingOut ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

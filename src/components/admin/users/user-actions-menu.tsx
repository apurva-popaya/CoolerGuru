"use client";

import * as React from "react";

import Link from "next/link";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteAdminUser } from "@/lib/api/admin-users-api";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";

import type { AdminUserRow } from "./users-data";

interface UserActionsMenuProps {
  user: AdminUserRow;

  onDelete?: (userId: string) => void;

  onStatusChange?: (userId: string, nextStatus: "Active" | "Inactive") => void;
}

export function UserActionsMenu({ user, onDelete, onStatusChange }: UserActionsMenuProps) {
  const [open, setOpen] = React.useState(false);

  const [deleting, setDeleting] = React.useState(false);

  const [error, setError] = React.useState("");

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleDelete() {
    const confirmed = window.confirm(`Are you sure you want to permanently delete ${user.name}?`);

    if (!confirmed) {
      return;
    }

    if (user.backendId === undefined) {
      setError("Backend user ID is not available yet.");

      return;
    }

    setDeleting(true);
    setError("");

    try {
      await deleteAdminUser(user.backendId);

      onDelete?.(user.id);

      setOpen(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  }

  function _handleStatusChange() {
    const nextStatus = user.status === "Active" ? "Inactive" : "Active";

    /*
     * Backend API is not available
     * yet for activate/deactivate.
     *
     * For now update UI state only.
     */
    onStatusChange?.(user.id, nextStatus);

    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => setOpen((current) => !current)}
        className="border-[#d9d8ef] text-[#2720a8] hover:bg-[#f3f2ff]"
        aria-label={`Actions for ${user.name}`}
      >
        <MoreVertical className="size-4" />
      </Button>

      {open && (
        <div className="absolute top-10 right-0 z-50 min-w-[190px] overflow-hidden rounded-[8px] border border-[#e4e4ef] bg-white py-1 shadow-[0_10px_30px_rgba(20,19,70,0.14)]">
          <Link
            href={`/admin/users/${user.id}?edit=true`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 font-medium text-[#313650] text-[12px] transition hover:bg-[#f5f4ff] hover:text-[#2720a8]"
          >
            <Pencil className="size-4" />
            Edit User
          </Link>

          {/* <button type="button" onClick={handleStatusChange} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[12px] font-medium text-[#313650] transition hover:bg-[#f7f7fb]">
            {user.status === "Active" ? (
              <>
                <UserX className="size-4 text-amber-600" />

                Deactivate User
              </>
            ) : (
              <>
                <UserCheck className="size-4 text-green-600" />

                Activate User
              </>
            )}
          </button> */}

          <div className="my-1 border-[#ececf3] border-t" />

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-medium text-[12px] text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="size-4" />

            {deleting ? "Deleting..." : "Delete User"}
          </button>

          {error && <div className="px-4 py-2 text-[10px] text-red-600">{error}</div>}
        </div>
      )}
    </div>
  );
}

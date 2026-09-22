"use client";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChevronDown, LogOut } from "lucide-react";

import { logoutUser } from "@/lib/api/auth-session-api";

interface SupplierDashboardUserMenuProps {
  companyName: string;
  role: string;
  logo?: string | null;
}

export function SupplierDashboardUserMenu({ companyName, role, logo }: SupplierDashboardUserMenuProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await logoutUser();

      router.replace("/supplier/login");

      router.refresh();
    } catch (error) {
      console.error("Supplier logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="flex min-w-[225px] items-center gap-3 rounded-[8px] border border-[#e0e1ef] bg-white px-3 py-2 text-left transition hover:bg-[#fafaff]"
      >
        <CompanyLogo companyName={companyName} logo={logo} />

        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-[#171570] text-[10px]">{companyName}</p>

          <p className="mt-0.5 text-[#777b92] text-[9px]">{role}</p>
        </div>

        <ChevronDown size={14} className={`shrink-0 text-[#251ab9] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="absolute top-[58px] right-0 z-[150] w-[255px] rounded-[9px] border border-[#dedff0] bg-white p-3 shadow-[0_15px_35px_rgba(30,25,100,0.14)]">
          <div className="flex items-center gap-3 px-2 py-2">
            <CompanyLogo companyName={companyName} logo={logo} />

            <div className="min-w-0">
              <p className="truncate font-bold text-[#171570] text-[10px]">{companyName}</p>

              <p className="mt-0.5 text-[#777b92] text-[9px]">{role}</p>
            </div>
          </div>

          <div className="my-2 border-[#e8e9f1] border-t" />

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 font-semibold text-[#e02424] text-[10px] transition hover:bg-[#fff3f3] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={16} />

            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function CompanyLogo({ companyName, logo }: { companyName: string; logo?: string | null }) {
  if (!logo) {
    return (
      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#f1efff] font-bold text-[#251bc1] text-[12px]">
        {companyName.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f1efff] p-1">
      <Image src={logo} alt={companyName} width={36} height={36} className="h-full w-full object-contain" />
    </div>
  );
}

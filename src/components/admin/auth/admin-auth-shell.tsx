import type { ReactNode } from "react";

import Link from "next/link";

interface AdminAuthShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AdminAuthShell({ title, description, children }: AdminAuthShellProps) {
  return (
    <div className="min-h-screen bg-[#f7f7fc]">
      <header className="border-[#e7e8f3] border-b bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-extrabold text-[#2720a8] text-[24px] tracking-[-0.7px]">CoolerGuru</span>
          </Link>

          <Link href="/" className="font-medium text-[#5d6280] text-[14px] transition hover:text-[#2720a8]">
            Back to website
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-5 py-12">
        <div className="grid w-full max-w-[1000px] overflow-hidden rounded-[20px] border border-[#e7e8f3] bg-white shadow-[0_18px_60px_rgba(25,20,100,0.08)] lg:grid-cols-[1fr_1.05fr]">
          <div className="hidden bg-gradient-to-br from-[#171271] via-[#2720a8] to-[#4037d5] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-[12px]">
                CoolerGuru Admin Portal
              </div>

              <h2 className="max-w-[360px] font-bold text-[38px] leading-[1.15] tracking-[-1.2px]">
                Manage the CoolerGuru platform from one place.
              </h2>

              <p className="mt-5 max-w-[390px] text-[15px] text-white/75 leading-7">
                Manage companies, products, inquiries, categories, users, featured companies and platform activity.
              </p>
            </div>

            <p className="text-[12px] text-white/55">Authorized administrators only</p>
          </div>

          <div className="px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
            <div className="mb-8">
              <p className="mb-2 font-bold text-[#2720a8] text-[12px] uppercase tracking-[1.5px]">Admin Portal</p>

              <h1 className="font-bold text-[#11163d] text-[30px] tracking-[-0.8px]">{title}</h1>

              <p className="mt-2 text-[#747891] text-[14px] leading-6">{description}</p>
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

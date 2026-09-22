"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Bell, ChevronDown, Search } from "lucide-react";

import { getSupplierCompanyProfile } from "@/lib/api/supplier-profile-api";

import { SupplierDashboardUserMenu } from "./dashboard-user-menu";

type SearchType = "all" | "products" | "companies";

interface SupplierNavbarData {
  companyName: string;
  role: string;
  logo: string | null;
  notifications: number;
}

const defaultSupplier: SupplierNavbarData = {
  companyName: "Company",
  role: "Supplier",
  logo: null,
  notifications: 0,
};

export function SupplierDashboardNavbar() {
  const [searchType, setSearchType] = useState<SearchType>("all");

  const [query, setQuery] = useState("");

  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const [supplier, setSupplier] = useState<SupplierNavbarData>(defaultSupplier);

  useEffect(() => {
    let active = true;

    async function loadCompany() {
      try {
        const response = await getSupplierCompanyProfile();

        if (!active || !response.data) {
          return;
        }

        const companyName = response.data.name?.trim() || response.data.company_name?.trim() || "Company";

        const logo = response.data.company_logo_url || response.data.logo || null;

        setSupplier({
          companyName,
          role: "Supplier",
          logo,
          notifications: 0,
        });
      } catch {
        if (active) {
          setSupplier(defaultSupplier);
        }
      }
    }

    void loadCompany();

    return () => {
      active = false;
    };
  }, []);

  const searchLabel = searchType === "products" ? "Products" : searchType === "companies" ? "Companies" : "All";

  function handleSearch() {
    if (!query.trim()) {
      return;
    }

    const params = new URLSearchParams();

    params.set("q", query.trim());

    params.set("type", searchType);

    window.location.href = `/search?${params.toString()}`;
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-[#e5e6ef] border-b bg-white">
      <div className="flex h-[76px] items-center">
        <div className="flex w-[270px] shrink-0 items-center border-[#e5e6ef] border-r px-5">
          <Link href="/supplier/dashboard" className="block">
            <Image
              src="/images/logo/coolerguru-logo-image.png"
              alt="CoolerGuru"
              width={195}
              height={60}
              priority
              className="h-[62px] w-[185px] object-contain"
            />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-8 px-7">
          <div className="flex h-[44px] w-full max-w-[720px]">
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSearchMenuOpen((previous) => !previous)}
                className="flex h-full min-w-[105px] items-center justify-between gap-3 rounded-l-[6px] border border-[#dedff0] border-r-0 bg-[#fafaff] px-4 font-semibold text-[#251ab9] text-[10px]"
              >
                {searchLabel}

                <ChevronDown size={13} className={`transition-transform ${searchMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {searchMenuOpen ? (
                <div className="absolute top-[49px] left-0 z-[140] w-[145px] overflow-hidden rounded-[6px] border border-[#dedff0] bg-white py-1 shadow-[0_10px_30px_rgba(30,25,120,0.12)]">
                  <SearchOption
                    label="All"
                    active={searchType === "all"}
                    onClick={() => {
                      setSearchType("all");
                      setSearchMenuOpen(false);
                    }}
                  />

                  <SearchOption
                    label="Products"
                    active={searchType === "products"}
                    onClick={() => {
                      setSearchType("products");
                      setSearchMenuOpen(false);
                    }}
                  />

                  <SearchOption
                    label="Companies"
                    active={searchType === "companies"}
                    onClick={() => {
                      setSearchType("companies");
                      setSearchMenuOpen(false);
                    }}
                  />
                </div>
              ) : null}
            </div>

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              placeholder="Search companies, products, categories or users..."
              className="min-w-0 flex-1 border border-[#dedff0] border-r-0 bg-white px-4 text-[#363b5d] text-[11px] outline-none placeholder:text-[#9a9db2]"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="flex w-[65px] shrink-0 items-center justify-center rounded-r-[6px] bg-[#2116a5] text-white transition hover:bg-[#3022c6]"
            >
              <Search size={18} />
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full text-[#171570] transition hover:bg-[#f4f2ff]"
            >
              <Bell size={21} strokeWidth={1.8} />

              {supplier.notifications > 0 ? (
                <span className="absolute top-[1px] right-[1px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#3124d3] px-1 font-bold text-[7px] text-white">
                  {supplier.notifications}
                </span>
              ) : null}
            </button>

            <SupplierDashboardUserMenu companyName={supplier.companyName} role={supplier.role} logo={supplier.logo} />
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center px-4 py-2.5 text-left font-medium text-[10px] transition ${active ? "bg-[#f0eeff] text-[#251bc1]" : "text-[#414661] hover:bg-[#f8f8ff]"}`}
    >
      {label}
    </button>
  );
}

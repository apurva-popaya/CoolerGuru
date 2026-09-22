"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Bell, ChevronDown, LogOut, MessageSquareText, Search, UserRound } from "lucide-react";

import { WideContainer } from "@/components/common/wide-container";
import { getCurrentUser, logoutUser } from "@/lib/api/auth-session-api";

type SearchType = "all" | "products" | "companies";

interface SearchOption {
  value: SearchType;
  label: string;
}

const searchOptions: SearchOption[] = [
  { value: "all", label: "All" },
  { value: "products", label: "Products" },
  { value: "companies", label: "Companies" },
];

const placeholders: Record<SearchType, string> = {
  all: "Search companies, products, brands or categories...",
  products: "Search products like Industrial Air Cooler, Motor, Pump...",
  companies: "Search companies like ABC Cooling, Arctic Cooling...",
};

export function BuyerNavbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [buyerName, setBuyerName] = useState("Buyer");
  const [loggingOut, setLoggingOut] = useState(false);

  const [searchType, setSearchType] = useState<SearchType>("all");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;

      if (searchDropdownRef.current && !searchDropdownRef.current.contains(target)) {
        setSearchDropdownOpen(false);
      }

      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadBuyerAuth() {
      try {
        const response = await getCurrentUser();

        if (!active) {
          return;
        }

        // const authData = response.data;

        // const user =
        //   authData?.user ??
        //   authData;

        const user = response.user;

        if (user?.active_portal !== "BUYER") {
          setIsLoggedIn(false);
          setBuyerName("Buyer");
          setAuthChecked(true);
          return;
        }

        const fullName =
          user.name?.trim() || [user.first_name, user.last_name].filter(Boolean).join(" ").trim() || "Buyer";

        setBuyerName(fullName);
        setIsLoggedIn(true);
        setAuthChecked(true);
      } catch {
        if (active) {
          setIsLoggedIn(false);
          setBuyerName("Buyer");
          setAuthChecked(true);
        }
      }
    }

    void loadBuyerAuth();

    return () => {
      active = false;
    };
  }, []);

  const selectedSearchOption = searchOptions.find((option) => option.value === searchType);

  const searchTypeWidth = searchType === "all" ? "w-[120px]" : searchType === "products" ? "w-[145px]" : "w-[155px]";

  function handleSearch() {
    const query = searchQuery.trim();

    if (!query) {
      router.push("/search");

      return;
    }

    const globalSearchType = searchType === "products" || searchType === "companies" ? searchType : "all";

    const params = new URLSearchParams();

    params.set("q", query);

    params.set("type", globalSearchType);

    /*
     * Keep the selected suggestion
     * scope in the URL so the Search
     * Results page knows what the user
     * selected in the header.
     */
    if (searchType !== "all" && searchType !== "products" && searchType !== "companies") {
      params.set("scope", searchType);
    }

    router.push(`/search?${params.toString()}`);
  }

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await logoutUser();

      setIsLoggedIn(false);
      setBuyerName("Buyer");
      setProfileOpen(false);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Buyer logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-[#ececf5] border-b bg-white">
      <WideContainer>
        <div className="flex h-[78px] items-center gap-7 px-5 md:px-8 lg:px-10">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo/coolerguru-logo-image.png"
              alt="CoolerGuru"
              width={210}
              height={62}
              priority
              className="h-[78px] w-[175px] object-contain xl:w-[205px]"
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 lg:block">
            <div className="mx-auto flex h-[46px] max-w-[760px] overflow-visible rounded-[8px] border border-[#dedff0] bg-white">
              {/* Search Type */}
              <div
                ref={searchDropdownRef}
                className={`relative shrink-0 transition-all duration-200 ${searchTypeWidth}`}
              >
                <button
                  type="button"
                  onClick={() => setSearchDropdownOpen((previous) => !previous)}
                  className="flex h-full w-full items-center justify-between gap-2 rounded-l-[8px] border-[#dedff0] border-r bg-[#fafaff] px-4 font-semibold text-[#2720a8] text-[14px] transition hover:bg-[#f5f3ff]"
                >
                  <span>{selectedSearchOption?.label}</span>

                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform ${searchDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {searchDropdownOpen && (
                  <div className="absolute top-[52px] left-0 z-[300] w-full min-w-[155px] overflow-hidden rounded-[8px] border border-[#dedff0] bg-white p-1.5 shadow-[0_10px_30px_rgba(28,22,110,0.14)]">
                    {searchOptions.map((option) => {
                      const active = searchType === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSearchType(option.value);
                            setSearchDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className={`flex w-full items-center rounded-[6px] px-3 py-2.5 text-left font-medium text-[13px] transition ${
                            active ? "bg-[#eeeaff] text-[#2418b6]" : "text-[#393d5e] hover:bg-[#f7f6ff]"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={placeholders[searchType]}
                className="min-w-0 flex-1 px-5 text-[#11163d] text-[14px] outline-none placeholder:text-[#9a9db3]"
              />

              {/* Search Button */}
              <button
                type="button"
                onClick={handleSearch}
                aria-label="Search"
                className="flex w-[62px] shrink-0 items-center justify-center rounded-r-[8px] bg-[#21159b] text-white transition-colors hover:bg-[#3022c6]"
              >
                <Search size={22} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="ml-auto flex shrink-0 items-center gap-6">
            {!authChecked ? null : !isLoggedIn ? (
              <>
                <Link
                  href="/supplier"
                  className="hidden whitespace-nowrap font-bold text-[#181285] text-sm transition-colors hover:text-[#3425da] md:block"
                >
                  Start Selling
                </Link>

                <Link
                  href="/register"
                  className="whitespace-nowrap rounded-md bg-[#171176] px-5 py-3 font-semibold text-sm text-white transition-colors hover:bg-[#2920b7]"
                >
                  Register / Login
                </Link>
              </>
            ) : (
              <>
                {/* Notification */}
                <Link
                  href="/dashboard"
                  aria-label="Notifications"
                  className="relative flex h-[40px] w-[40px] items-center justify-center text-[#171570]"
                >
                  <Bell size={23} strokeWidth={1.9} />

                  <span className="absolute top-[1px] right-[1px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#3021c9] px-1 font-bold text-[8px] text-white">
                    3
                  </span>
                </Link>

                {/* Profile */}
                <div ref={profileDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((previous) => !previous)}
                    className="flex items-center gap-2.5 rounded-[6px] px-2 py-2 transition hover:bg-[#f8f7ff]"
                  >
                    <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-[#dedeea] text-[#171570]">
                      <UserRound size={25} strokeWidth={2} />
                    </div>

                    <span className="whitespace-nowrap font-bold text-[#15154f] text-[13px]">Hi, {buyerName}</span>

                    <ChevronDown
                      size={16}
                      className={`text-[#171570] transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute top-[54px] right-0 z-[300] w-[285px] overflow-hidden rounded-[10px] border border-[#dedfe9] bg-white shadow-[0_10px_30px_rgba(18,20,80,0.16)]">
                      <div className="flex items-center gap-3 px-5 py-5">
                        <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#dedeea] text-[#171570]">
                          <UserRound size={35} />
                        </div>

                        <div>
                          <p className="font-bold text-[#16164d] text-[14px]">{buyerName}</p>

                          <p className="mt-1 font-medium text-[#747891] text-[11px]">Buyer Account</p>
                        </div>
                      </div>

                      <div className="border-[#e5e6ee] border-t" />

                      <DropdownLink
                        href="/dashboard"
                        icon={<UserRound size={20} />}
                        label="Dashboard / Profile"
                        onClick={() => setProfileOpen(false)}
                      />

                      <DropdownLink
                        href="/dashboard/inquiries"
                        icon={<MessageSquareText size={20} />}
                        label="My Inquiries"
                        onClick={() => setProfileOpen(false)}
                      />

                      <div className="border-[#e5e6ee] border-t" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-4 px-6 py-5 text-left font-medium text-[#242448] text-[13px] transition hover:bg-[#f8f7ff] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <LogOut size={21} />

                        {loggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </WideContainer>

      {/* Mobile Search */}
      <div className="border-[#f1f1f7] border-t px-5 pt-3 pb-4 lg:hidden">
        <div className="flex h-[44px] overflow-hidden rounded-md border border-[#dedff0]">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder={placeholders[searchType]}
            className="min-w-0 flex-1 px-3 text-sm outline-none"
          />

          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search"
            className="flex w-[50px] items-center justify-center bg-[#21159b] text-white"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

interface DropdownLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function DropdownLink({ href, icon, label, onClick }: DropdownLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 px-6 py-4 font-medium text-[#242448] text-[13px] transition hover:bg-[#f8f7ff]"
    >
      <span className="text-[#25254d]">{icon}</span>

      {label}
    </Link>
  );
}

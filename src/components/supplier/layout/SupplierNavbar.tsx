// "use client";

// import Image from "next/image";
// import Link from "next/link";

// import { useState } from "react";

// import {
//   Bell,
//   Building2,
//   ChevronDown,
//   Grid2X2,
//   LogOut,
//   MessageCircle,
//   Package,
//   Search,
// } from "lucide-react";

// import {WideContainer} from "@/components/common/wide-container";

// type SearchType = "all" | "products" | "companies";

// interface SupplierNavbarProps {
//   isSupplierLoggedIn?: boolean;
// }

// export default function SupplierNavbar({
//   isSupplierLoggedIn = false,
// }: SupplierNavbarProps) {
//   /* =========================================
//      TEMP AUTH STATE

//      false = supplier not logged in
//      true  = supplier logged in

//      Later this will come from auth.
//   ========================================= */

//   //const isSupplierLoggedIn = false;

//   /* =========================================
//      TEMP SUPPLIER DATA

//      Later from backend/database.
//   ========================================= */

//   const supplier = {
//     companyName: "ABC Cooling Industries",
//     role: "Supplier",
//     logo: "/images/home/companies/abc-cooling.png",
//     notifications: 3,
//   };

//   const [searchType, setSearchType] =
//     useState<SearchType>("all");

//   const [searchQuery, setSearchQuery] =
//     useState("");

//   const [searchDropdownOpen, setSearchDropdownOpen] =
//     useState(false);

//   const [profileDropdownOpen, setProfileDropdownOpen] =
//     useState(false);

//   /* =========================================
//      SEARCH LABEL
//   ========================================= */

//   const searchLabel =
//     searchType === "products"
//       ? "Products"
//       : searchType === "companies"
//         ? "Companies"
//         : "All";

//   const placeholder =
//     searchType === "products"
//       ? "Search products like Industrial Air Cooler, Motor, Pump..."
//       : searchType === "companies"
//         ? "Search companies like ABC Cooling, Arctic Cooling..."
//         : "Search companies, products, brands or categories...";

//   const handleSearch = () => {
//     if (!searchQuery.trim()) {
//       return;
//     }

//     const params = new URLSearchParams();

//     params.set("q", searchQuery.trim());
//     params.set("type", searchType);

//     window.location.href = `/search?${params.toString()}`;
//   };

//   return (
//     <header
//       className="
//         sticky
//         top-0
//         z-[100]
//         w-full
//         border-b
//         border-[#e7e8f2]
//         bg-white
//         px-9
//       "
//     >
//       <WideContainer>
//         <div
//           className="
//             flex
//             h-[78px]
//             items-center
//             gap-6
//           "
//         >
//           {/* =========================================
//               LOGO
//           ========================================= */}

//           <Link
//             href="/"
//             className="shrink-0"
//           >
//             <Image
//               src="/images/logo/coolerguru-logo-image.png"
//               alt="CoolerGuru"
//               width={210}
//               height={62}
//               priority
//               className="
//                 h-[78px]
//                 w-[195px]
//                 object-contain
//               "
//             />
//           </Link>

//           {/* =========================================
//               SEARCH
//           ========================================= */}

//           <div
//             className="
//               flex
//               h-[46px]
//               min-w-0
//               flex-1
//               overflow-visible
//             "
//           >
//             {/* Search Type */}
//             <div className="relative shrink-0">

//               <button
//                 type="button"
//                 onClick={() =>
//                   setSearchDropdownOpen(
//                     (previous) =>
//                       !previous
//                   )
//                 }
//                 className="
//                   flex
//                   h-full
//                   min-w-[120px]
//                   items-center
//                   justify-between
//                   gap-3
//                   rounded-l-[7px]
//                   border
//                   border-r-0
//                   border-[#dedff0]
//                   bg-[#fafaff]
//                   px-4
//                   text-[11px]
//                   font-semibold
//                   text-[#251ab9]
//                 "
//               >
//                 {searchLabel}

//                 <ChevronDown
//                   size={14}
//                   className={`transition-transform ${
//                     searchDropdownOpen
//                       ? "rotate-180"
//                       : ""
//                   }`}
//                 />
//               </button>

//               {/* Search Type Dropdown */}
//               {searchDropdownOpen && (
//                 <div
//                   className="
//                     absolute
//                     left-0
//                     top-[52px]
//                     z-[120]
//                     w-[155px]
//                     overflow-hidden
//                     rounded-[7px]
//                     border
//                     border-[#dedff0]
//                     bg-white
//                     py-1
//                     shadow-[0_10px_30px_rgba(30,25,120,0.12)]
//                   "
//                 >
//                   <SearchTypeButton
//                     label="All"
//                     active={
//                       searchType === "all"
//                     }
//                     onClick={() => {
//                       setSearchType("all");
//                       setSearchDropdownOpen(
//                         false
//                       );
//                     }}
//                   />

//                   <SearchTypeButton
//                     label="Products"
//                     active={
//                       searchType ===
//                       "products"
//                     }
//                     onClick={() => {
//                       setSearchType(
//                         "products"
//                       );
//                       setSearchDropdownOpen(
//                         false
//                       );
//                     }}
//                   />

//                   <SearchTypeButton
//                     label="Companies"
//                     active={
//                       searchType ===
//                       "companies"
//                     }
//                     onClick={() => {
//                       setSearchType(
//                         "companies"
//                       );
//                       setSearchDropdownOpen(
//                         false
//                       );
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Search Input */}
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(event) =>
//                 setSearchQuery(
//                   event.target.value
//                 )
//               }
//               onKeyDown={(event) => {
//                 if (
//                   event.key === "Enter"
//                 ) {
//                   handleSearch();
//                 }
//               }}
//               placeholder={placeholder}
//               className="
//                 min-w-0
//                 flex-1
//                 border
//                 border-r-0
//                 border-[#dedff0]
//                 bg-white
//                 px-4
//                 text-[11px]
//                 text-[#363b5d]
//                 outline-none
//                 placeholder:text-[#9a9db2]
//               "
//             />

//             {/* Search Button */}
//             <button
//               type="button"
//               onClick={handleSearch}
//               className="
//                 flex
//                 w-[62px]
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-r-[7px]
//                 bg-[#2116a5]
//                 text-white
//                 transition
//                 hover:bg-[#3022c6]
//               "
//             >
//               <Search size={20} />
//             </button>
//           </div>

//           {/* =========================================
//               RIGHT SIDE
//           ========================================= */}

//           {!isSupplierLoggedIn ? (
//             /* =========================================
//                NOT LOGGED IN
//             ========================================= */

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 gap-6
//               "
//             >
//               <Link
//                 href="/supplier"
//                 className="
//                   whitespace-nowrap
//                   text-[12px]
//                   font-bold
//                   !text-[#171570]
//                   transition
//                   hover:!text-[#3022c6]
//                 "
//               >
//                 Start Selling
//               </Link>

//               <Link
//                 href="/supplier/register"
//                 className="
//                   flex
//                   h-[44px]
//                   min-w-[145px]
//                   items-center
//                   justify-center
//                   rounded-[7px]
//                   bg-[#171570]
//                   px-5
//                   text-[12px]
//                   font-bold
//                   !text-white
//                   transition
//                   hover:bg-[#2116a5]
//                 "
//               >
//                 Register / Login
//               </Link>
//             </div>
//           ) : (
//             /* =========================================
//                LOGGED IN
//             ========================================= */

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 gap-5
//               "
//             >
//               {/* Notification */}
//               <button
//                 type="button"
//                 className="
//                   relative
//                   flex
//                   h-[42px]
//                   w-[42px]
//                   items-center
//                   justify-center
//                   rounded-full
//                   text-[#171570]
//                   transition
//                   hover:bg-[#f4f2ff]
//                 "
//               >
//                 <Bell
//                   size={23}
//                   strokeWidth={1.8}
//                 />

//                 {supplier.notifications >
//                   0 && (
//                   <span
//                     className="
//                       absolute
//                       right-[2px]
//                       top-[1px]
//                       flex
//                       h-[17px]
//                       min-w-[17px]
//                       items-center
//                       justify-center
//                       rounded-full
//                       bg-[#3124d3]
//                       px-1
//                       text-[8px]
//                       font-bold
//                       text-white
//                     "
//                   >
//                     {
//                       supplier.notifications
//                     }
//                   </span>
//                 )}
//               </button>

//               {/* =========================================
//                   SUPPLIER PROFILE
//               ========================================= */}

//               <div className="relative">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setProfileDropdownOpen(
//                       (previous) =>
//                         !previous
//                     )
//                   }
//                   className="
//                     flex
//                     min-w-[230px]
//                     items-center
//                     gap-3
//                     rounded-[8px]
//                     border
//                     border-[#e0e1ef]
//                     bg-white
//                     px-3
//                     py-2
//                     text-left
//                     transition
//                     hover:bg-[#fafaff]
//                   "
//                 >
//                   {/* Company Logo */}
//                   <div
//                     className="
//                       flex
//                       h-[40px]
//                       w-[40px]
//                       shrink-0
//                       items-center
//                       justify-center
//                       overflow-hidden
//                       rounded-full
//                       bg-[#f1efff]
//                       p-1
//                     "
//                   >
//                     <Image
//                       src={supplier.logo}
//                       alt={
//                         supplier.companyName
//                       }
//                       width={36}
//                       height={36}
//                       className="
//                         h-full
//                         w-full
//                         object-contain
//                       "
//                     />
//                   </div>

//                   {/* Name */}
//                   <div className="min-w-0 flex-1">
//                     <p
//                       className="
//                         truncate
//                         text-[10px]
//                         font-bold
//                         text-[#171570]
//                       "
//                     >
//                       {
//                         supplier.companyName
//                       }
//                     </p>

//                     <p className="mt-0.5 text-[9px] text-[#777b92]">
//                       {supplier.role}
//                     </p>
//                   </div>

//                   <ChevronDown
//                     size={14}
//                     className={`shrink-0 text-[#251ab9] transition-transform ${
//                       profileDropdownOpen
//                         ? "rotate-180"
//                         : ""
//                     }`}
//                   />
//                 </button>

//                 {/* =========================================
//                     PROFILE DROPDOWN
//                 ========================================= */}

//                 {profileDropdownOpen && (
//                   <div
//                     className="
//                       absolute
//                       right-0
//                       top-[58px]
//                       z-[120]
//                       w-[250px]
//                       rounded-[9px]
//                       border
//                       border-[#dedff0]
//                       bg-white
//                       p-3
//                       shadow-[0_15px_35px_rgba(30,25,100,0.14)]
//                     "
//                   >
//                     {/* Supplier Header */}
//                     <div className="flex items-center gap-3 px-2 py-2">

//                       <div
//                         className="
//                           flex
//                           h-[42px]
//                           w-[42px]
//                           items-center
//                           justify-center
//                           overflow-hidden
//                           rounded-[7px]
//                           bg-[#f1efff]
//                           p-1.5
//                         "
//                       >
//                         <Image
//                           src={
//                             supplier.logo
//                           }
//                           alt={
//                             supplier.companyName
//                           }
//                           width={38}
//                           height={38}
//                           className="h-full w-full object-contain"
//                         />
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-[10px] font-bold text-[#171570]">
//                           {
//                             supplier.companyName
//                           }
//                         </p>

//                         <p className="mt-0.5 text-[9px] text-[#777b92]">
//                           {
//                             supplier.role
//                           }
//                         </p>
//                       </div>
//                     </div>

//                     <div className="my-2 border-t border-[#e8e9f1]" />

//                     {/* Dashboard */}
//                     <SupplierDropdownLink
//                       href="/supplier/dashboard"
//                       label="Dashboard"
//                       icon={Grid2X2}
//                     />

//                     {/* Company */}
//                     <SupplierDropdownLink
//                       href="/supplier/dashboard/company"
//                       label="Company Profile"
//                       icon={Building2}
//                     />

//                     {/* Products */}
//                     <SupplierDropdownLink
//                       href="/supplier/dashboard/products"
//                       label="Products"
//                       icon={Package}
//                     />

//                     {/* Inquiries */}
//                     <SupplierDropdownLink
//                       href="/supplier/dashboard/inquiries"
//                       label="Inquiries"
//                       icon={MessageCircle}
//                     />

//                     <div className="my-2 border-t border-[#e8e9f1]" />

//                     {/* Logout */}
//                     <button
//                       type="button"
//                       className="
//                         flex
//                         w-full
//                         items-center
//                         gap-3
//                         rounded-[6px]
//                         px-3
//                         py-2.5
//                         text-[10px]
//                         font-semibold
//                         text-[#e02424]
//                         transition
//                         hover:bg-[#fff3f3]
//                       "
//                     >
//                       <LogOut size={16} />

//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </WideContainer>
//     </header>
//   );
// }

// /* =========================================
//    SEARCH TYPE ITEM
// ========================================= */

// function SearchTypeButton({
//   label,
//   active,
//   onClick,
// }: {
//   label: string;
//   active: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`
//         flex
//         w-full
//         items-center
//         px-4
//         py-2.5
//         text-left
//         text-[10px]
//         font-medium
//         transition

//         ${
//           active
//             ? "bg-[#f0eeff] text-[#251bc1]"
//             : "text-[#414661] hover:bg-[#f8f8ff]"
//         }
//       `}
//     >
//       {label}
//     </button>
//   );
// }

// /* =========================================
//    SUPPLIER DROPDOWN LINK
// ========================================= */

// function SupplierDropdownLink({
//   href,
//   label,
//   icon: Icon,
// }: {
//   href: string;
//   label: string;
//   icon: React.ElementType;
// }) {
//   return (
//     <Link
//       href={href}
//       className="
//         flex
//         items-center
//         gap-3
//         rounded-[6px]
//         px-3
//         py-2.5
//         text-[10px]
//         font-semibold
//         !text-[#35395b]
//         transition
//         hover:bg-[#f5f3ff]
//         hover:!text-[#251bc1]
//       "
//     >
//       <Icon
//         size={16}
//         className="text-[#3025cb]"
//       />

//       {label}
//     </Link>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Bell, ChevronDown, LogOut, Search } from "lucide-react";

import { WideContainer } from "@/components/common/wide-container";
import { getCurrentUser, logoutUser } from "@/lib/api/auth-session-api";
import { getSupplierCompanyProfile } from "@/lib/api/supplier-profile-api";

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

export default function SupplierNavbar() {
  const router = useRouter();

  const [searchType, setSearchType] = useState<SearchType>("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [isSupplierLoggedIn, setIsSupplierLoggedIn] = useState(false);

  const [authChecked, setAuthChecked] = useState(false);

  const [supplier, setSupplier] = useState<SupplierNavbarData>(defaultSupplier);

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadSupplier() {
      try {
        const authResponse = await getCurrentUser();

        if (!active) {
          return;
        }

        const user = authResponse.user;

        const activePortal = user.active_portal;

        if (activePortal !== "SELLER") {
          setIsSupplierLoggedIn(false);

          setAuthChecked(true);

          return;
        }

        setIsSupplierLoggedIn(true);

        try {
          const companyResponse = await getSupplierCompanyProfile();

          if (!active || !companyResponse.data) {
            setSupplier(defaultSupplier);

            setAuthChecked(true);

            return;
          }

          const company = companyResponse.data;

          const companyName = company.name?.trim() || company.company_name?.trim() || "Company";

          const logo = company.company_logo_url || company.logo || null;

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

        setAuthChecked(true);
      } catch {
        if (active) {
          setIsSupplierLoggedIn(false);

          setSupplier(defaultSupplier);

          setAuthChecked(true);
        }
      }
    }

    void loadSupplier();

    return () => {
      active = false;
    };
  }, []);

  const searchLabel = searchType === "products" ? "Products" : searchType === "companies" ? "Companies" : "All";

  const placeholder =
    searchType === "products"
      ? "Search products like Industrial Air Cooler, Motor, Pump..."
      : searchType === "companies"
        ? "Search companies like ABC Cooling, Arctic Cooling..."
        : "Search companies, products, brands or categories...";

  function handleSearch() {
    if (!searchQuery.trim()) {
      return;
    }

    const params = new URLSearchParams();

    params.set("q", searchQuery.trim());

    params.set("type", searchType);

    window.location.href = `/search?${params.toString()}`;
  }

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await logoutUser();

      setIsSupplierLoggedIn(false);

      setSupplier(defaultSupplier);

      setProfileDropdownOpen(false);

      router.replace("/supplier/login");

      router.refresh();
    } catch (error) {
      console.error("Supplier logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  if (!authChecked) {
    return (
      <header className="sticky top-0 z-[100] w-full border-[#e7e8f2] border-b bg-white px-9">
        <WideContainer>
          <div className="flex h-[78px] items-center gap-6">
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo/coolerguru-logo-image.png"
                alt="CoolerGuru"
                width={210}
                height={62}
                priority
                className="h-[78px] w-[195px] object-contain"
              />
            </Link>

            <div className="flex h-[46px] min-w-0 flex-1 overflow-visible">
              <div className="relative shrink-0">
                <button
                  type="button"
                  disabled
                  className="flex h-full min-w-[120px] items-center justify-between gap-3 rounded-l-[7px] border border-[#dedff0] border-r-0 bg-[#fafaff] px-4 font-semibold text-[#251ab9] text-[11px] opacity-70"
                >
                  All
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Controlled + readOnly so React doesn't warn when the real input replaces it. */}
              <input
                type="text"
                value=""
                readOnly
                disabled
                placeholder="Search companies, products, brands or categories..."
                className="min-w-0 flex-1 border border-[#dedff0] border-r-0 bg-white px-4 text-[#363b5d] text-[11px] outline-none placeholder:text-[#9a9db2] disabled:bg-white"
              />

              <button
                type="button"
                disabled
                className="flex w-[62px] shrink-0 items-center justify-center rounded-r-[7px] bg-[#2116a5] text-white opacity-70"
              >
                <Search size={20} />
              </button>
            </div>

            <div className="h-[44px] w-[170px] shrink-0 rounded-[7px] bg-[#f5f4fb]" />
          </div>
        </WideContainer>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-[#e7e8f2] border-b bg-white px-9">
      <WideContainer>
        <div className="flex h-[78px] items-center gap-6">
          <Link href={isSupplierLoggedIn ? "/supplier/dashboard" : "/"} className="shrink-0">
            <Image
              src="/images/logo/coolerguru-logo-image.png"
              alt="CoolerGuru"
              width={210}
              height={62}
              priority
              className="h-[78px] w-[195px] object-contain"
            />
          </Link>

          <div className="flex h-[46px] min-w-0 flex-1 overflow-visible">
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSearchDropdownOpen((previous) => !previous)}
                className="flex h-full min-w-[120px] items-center justify-between gap-3 rounded-l-[7px] border border-[#dedff0] border-r-0 bg-[#fafaff] px-4 font-semibold text-[#251ab9] text-[11px]"
              >
                {searchLabel}

                <ChevronDown size={14} className={`transition-transform ${searchDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {searchDropdownOpen ? (
                <div className="absolute top-[52px] left-0 z-[120] w-[155px] overflow-hidden rounded-[7px] border border-[#dedff0] bg-white py-1 shadow-[0_10px_30px_rgba(30,25,120,0.12)]">
                  <SearchTypeButton
                    label="All"
                    active={searchType === "all"}
                    onClick={() => {
                      setSearchType("all");
                      setSearchDropdownOpen(false);
                    }}
                  />

                  <SearchTypeButton
                    label="Products"
                    active={searchType === "products"}
                    onClick={() => {
                      setSearchType("products");
                      setSearchDropdownOpen(false);
                    }}
                  />

                  <SearchTypeButton
                    label="Companies"
                    active={searchType === "companies"}
                    onClick={() => {
                      setSearchType("companies");
                      setSearchDropdownOpen(false);
                    }}
                  />
                </div>
              ) : null}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder={placeholder}
              className="min-w-0 flex-1 border border-[#dedff0] border-r-0 bg-white px-4 text-[#363b5d] text-[11px] outline-none placeholder:text-[#9a9db2]"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="flex w-[62px] shrink-0 items-center justify-center rounded-r-[7px] bg-[#2116a5] text-white transition hover:bg-[#3022c6]"
            >
              <Search size={20} />
            </button>
          </div>

          {!isSupplierLoggedIn ? (
            <div className="flex shrink-0 items-center gap-6">
              <Link
                href="/supplier"
                className="!text-[#171570] hover:!text-[#3022c6] whitespace-nowrap font-bold text-[12px] transition"
              >
                Start Selling
              </Link>

              <Link
                href="/supplier/register"
                className="!text-white flex h-[44px] min-w-[145px] items-center justify-center rounded-[7px] bg-[#171570] px-5 font-bold text-[12px] transition hover:bg-[#2116a5]"
              >
                Register / Login
              </Link>
            </div>
          ) : (
            <div className="flex shrink-0 items-center gap-5">
              <button
                type="button"
                className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full text-[#171570] transition hover:bg-[#f4f2ff]"
              >
                <Bell size={23} strokeWidth={1.8} />

                {supplier.notifications > 0 ? (
                  <span className="absolute top-[1px] right-[2px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#3124d3] px-1 font-bold text-[8px] text-white">
                    {supplier.notifications}
                  </span>
                ) : null}
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen((previous) => !previous)}
                  className="flex min-w-[230px] items-center gap-3 rounded-[8px] border border-[#e0e1ef] bg-white px-3 py-2 text-left transition hover:bg-[#fafaff]"
                >
                  <SupplierLogo companyName={supplier.companyName} logo={supplier.logo} />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-[#171570] text-[10px]">{supplier.companyName}</p>

                    <p className="mt-0.5 text-[#777b92] text-[9px]">{supplier.role}</p>
                  </div>

                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-[#251ab9] transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileDropdownOpen ? (
                  <div className="absolute top-[58px] right-0 z-[120] w-[250px] rounded-[9px] border border-[#dedff0] bg-white p-3 shadow-[0_15px_35px_rgba(30,25,100,0.14)]">
                    <div className="flex items-center gap-3 px-2 py-2">
                      <SupplierLogo companyName={supplier.companyName} logo={supplier.logo} />

                      <div className="min-w-0">
                        <p className="truncate font-bold text-[#171570] text-[10px]">{supplier.companyName}</p>

                        <p className="mt-0.5 text-[#777b92] text-[9px]">{supplier.role}</p>
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
            </div>
          )}
        </div>
      </WideContainer>
    </header>
  );
}

function SearchTypeButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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

function SupplierLogo({ companyName, logo }: { companyName: string; logo: string | null }) {
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

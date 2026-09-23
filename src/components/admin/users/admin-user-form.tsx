"use client";

import * as React from "react";

import {
  Building2,
  Info,
  Store,
  UserRound,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  createAdminUser,
  updateAdminUser,
} from "@/lib/api/admin-users-api";

import {
  getApiErrorMessage,
} from "@/lib/api/get-api-error-message";

import {
  sanitizeText,
} from "@/lib/utils/sanitize";

import type {
  UserRole,
} from "./users-data";

interface AdminUserFormProps {
  mode:
    | "add"
    | "edit";

  userId?:
    | number
    | string;

  initialRole?:
    UserRole;

  initialName?:
    string;

  initialMobile?:
    string;

  onSuccess?:
    () => void;

  onCancel?:
    () => void;
}

interface RoleOption {
  role: UserRole;

  title: string;

  description: string;

  icon:
    React.ElementType;
}

const roleOptions:
  RoleOption[] = [
    {
      role:
        "Buyer",

      title:
        "Buyer",

      description:
        "Create an individual buyer account.",

      icon:
        UserRound,
    },

    {
      role:
        "Supplier",

      title:
        "Supplier",

      description:
        "Create a supplier account.",

      icon:
        Store,
    },
  ];

export function AdminUserForm({
  mode,
  userId,
  initialRole = "Buyer",
  initialName = "",
  initialMobile = "",
  onSuccess,
  onCancel,
}: AdminUserFormProps) {
  const [
    selectedRole,
    setSelectedRole,
  ] =
    React.useState<UserRole>(
      initialRole,
    );

  const [
    name,
    setName,
  ] =
    React.useState(
      initialName,
    );

  const [
    mobile,
    setMobile,
  ] =
    React.useState(
      initialMobile
        .replace(
          /\D/g,
          "",
        )
        .slice(-10),
    );

  const [
    loading,
    setLoading,
  ] =
    React.useState(false);

  const [
    error,
    setError,
  ] =
    React.useState("");

  function handleMobileChange(
    value: string,
  ) {
    setMobile(
      value
        .replace(
          /\D/g,
          "",
        )
        .slice(
          0,
          10,
        ),
    );
  }

  const formIsValid =
    name.trim().length >
      0 &&
    mobile.length ===
      10;

  async function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setLoading(true);
    setError("");

    const role =
      selectedRole ===
      "Buyer"
        ? "BUYER"
        : "SELLER";

    const cleanedName =
      sanitizeText(
        name,
      );

    try {
      if (
        mode === "edit"
      ) {
        if (!userId) {
          throw new Error(
            "User ID is required.",
          );
        }

        await updateAdminUser(
          userId,
          {
            name:
              cleanedName,

            phone_number:
              `+91${mobile}`,

            roles: [
              role,
            ],
          },
        );
      } else {
        await createAdminUser({
          user_type:
            role,

          name:
            cleanedName,

          phone_number:
            `+91${mobile}`,
        });
      }

      onSuccess?.();
    } catch (error) {
      setError(
        getApiErrorMessage(
          error,
        ),
      );
    } finally {
      setLoading(
        false,
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[10px] border border-border bg-white p-6">
      <div>
        <h2 className="font-bold text-[#15136f] text-[19px]">
          User Type
        </h2>

        <p className="mt-1 text-[#5d6280] text-[12px]">
          Select whether this account belongs to a buyer or supplier.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {roleOptions.map(
          (option) => {
            const Icon =
              option.icon;

            const selected =
              selectedRole ===
              option.role;

            return (
              <button key={option.role} type="button" onClick={() => setSelectedRole(option.role)} className={`relative min-h-[135px] rounded-[9px] border p-5 text-left transition ${selected ? "border-[#2720a8] bg-[#f5f4ff] shadow-[0_0_0_1px_#2720a8]" : "border-border bg-white hover:border-[#c9c6f3]"}`}>
                <div className="flex items-start justify-between">
                  <div className={`flex size-11 items-center justify-center rounded-[8px] ${selected ? "bg-[#e8e6ff]" : "bg-[#edf3ff]"}`}>
                    <Icon className="size-6 text-[#2720a8]" />
                  </div>

                  <div className={`flex size-5 items-center justify-center rounded-full border-2 ${selected ? "border-[#2720a8]" : "border-[#9da2b6]"}`}>
                    {selected ? (
                      <div className="size-2.5 rounded-full bg-[#2720a8]" />
                    ) : null}
                  </div>
                </div>

                <p className="mt-4 font-bold text-[#15136f] text-[15px]">
                  {option.title}
                </p>

                <p className="mt-1 text-[#5d6280] text-[12px] leading-5">
                  {option.description}
                </p>
              </button>
            );
          },
        )}
      </div>

      <div className="mt-7 border-border border-t pt-6">
        <h2 className="font-bold text-[#15136f] text-[19px]">
          {selectedRole ===
          "Buyer"
            ? "Buyer Information"
            : "Supplier Information"}
        </h2>

        <p className="mt-1 text-[#5d6280] text-[12px]">
          {selectedRole ===
          "Buyer"
            ? "Enter the buyer's name and mobile number."
            : "Enter the supplier's name and mobile number."}
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="admin-user-name" className="font-semibold text-[#15136f] text-[13px]">
              {selectedRole ===
              "Buyer"
                ? "Buyer Name"
                : "Supplier Name"}{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <div className="relative mt-2">
              {selectedRole ===
              "Buyer" ? (
                <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7a8099]" />
              ) : (
                <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7a8099]" />
              )}

              <Input id="admin-user-name" value={name} onChange={(event) => setName(event.target.value)} placeholder={selectedRole === "Buyer" ? "Enter buyer name" : "Enter supplier name"} className="h-11 pl-10" required />
            </div>
          </div>

          <div>
            <label htmlFor="admin-user-mobile" className="font-semibold text-[#15136f] text-[13px]">
              Mobile Number{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <div className="mt-2 flex gap-2">
              <div className="flex h-11 w-[86px] shrink-0 items-center justify-center rounded-[7px] border border-border bg-[#fafafe] font-semibold text-[#15136f] text-[13px]">
                +91
              </div>

              <Input id="admin-user-mobile" inputMode="numeric" value={mobile} onChange={(event) => handleMobileChange(event.target.value)} placeholder="Enter 10 digit mobile number" className="h-11" required />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex gap-3 rounded-[9px] border border-[#cfe0ff] bg-[#f5f9ff] p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-[#2563eb]" />

        <p className="text-[#4f6593] text-[11px] leading-5">
          {selectedRole ===
          "Buyer"
            ? "The buyer account uses the entered name and mobile number."
            : "The supplier will later sign in using this mobile number and complete the company profile and verification flow."}
        </p>
      </div>

      {error ? (
        <div className="mt-5 rounded-[8px] border border-red-200 bg-red-50 p-3 text-[12px] text-red-600">
          {error}
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between border-border border-t pt-5">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={!formIsValid || loading} className="min-w-[150px] bg-[#2720a8] text-white hover:bg-[#15136f]">
          {loading
            ? "Saving..."
            : mode ===
                "edit"
              ? "Save Changes"
              : `Add ${selectedRole}`}
        </Button>
      </div>
    </form>
  );
}
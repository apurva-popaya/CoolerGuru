"use client";

import { type FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { Eye, EyeOff, LockKeyhole, Phone, UserRound } from "lucide-react";

import { addAdmin } from "@/lib/api/admin-auth-api";
import { sanitizeText } from "@/lib/utils/sanitize";

export function AdminAddAdminForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanedPhone = phone.replace(/\D/g, "");

    if (!name.trim()) {
      setError("Please enter the admin's name.");
      return;
    }

    if (cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await addAdmin(sanitizeText(name), `+91${cleanedPhone}`, password, confirmPassword);

      setSuccess(response.message ?? "Admin added successfully.");

      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1200);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to add admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="admin-name" className="mb-2 block font-semibold text-[#252a4a] text-[13px]">
          Full Name
        </label>

        <div className="flex h-[48px] items-center rounded-[8px] border border-[#dedfeb] bg-white transition focus-within:border-[#2720a8] focus-within:ring-2 focus-within:ring-[#2720a8]/10">
          <UserRound size={17} className="shrink-0 text-[#7c8098]" />

          <input
            id="admin-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter admin full name"
            disabled={loading}
            className="min-w-0 flex-1 border-0 bg-transparent px-3 text-[#11163d] text-[14px] outline-none placeholder:text-[#a0a3b5]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="admin-add-phone" className="mb-2 block font-semibold text-[#252a4a] text-[13px]">
          Mobile Number
        </label>

        <div className="flex h-[48px] overflow-hidden rounded-[8px] border border-[#dedfeb] bg-white transition focus-within:border-[#2720a8] focus-within:ring-2 focus-within:ring-[#2720a8]/10">
          <div className="flex items-center gap-2 border-[#e6e7ef] border-r bg-[#fafaff] px-3 font-medium text-[#444967] text-[13px]">
            <Phone size={16} />
            +91
          </div>

          <input
            id="admin-add-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="Enter mobile number"
            disabled={loading}
            className="min-w-0 flex-1 border-0 bg-transparent px-4 text-[#11163d] text-[14px] outline-none placeholder:text-[#a0a3b5]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="admin-add-password" className="mb-2 block font-semibold text-[#252a4a] text-[13px]">
          Password
        </label>

        <div className="flex h-[48px] items-center rounded-[8px] border border-[#dedfeb] bg-white px-3 transition focus-within:border-[#2720a8] focus-within:ring-2 focus-within:ring-[#2720a8]/10">
          <LockKeyhole size={17} className="shrink-0 text-[#7c8098]" />

          <input
            id="admin-add-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 8 characters"
            disabled={loading}
            className="min-w-0 flex-1 border-0 bg-transparent px-3 text-[#11163d] text-[14px] outline-none placeholder:text-[#a0a3b5]"
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center text-[#7c8098] transition hover:text-[#2720a8]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="admin-add-confirm-password" className="mb-2 block font-semibold text-[#252a4a] text-[13px]">
          Confirm Password
        </label>

        <div className="flex h-[48px] items-center rounded-[8px] border border-[#dedfeb] bg-white px-3 transition focus-within:border-[#2720a8] focus-within:ring-2 focus-within:ring-[#2720a8]/10">
          <LockKeyhole size={17} className="shrink-0 text-[#7c8098]" />

          <input
            id="admin-add-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Re-enter your password"
            disabled={loading}
            className="min-w-0 flex-1 border-0 bg-transparent px-3 text-[#11163d] text-[14px] outline-none placeholder:text-[#a0a3b5]"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((current) => !current)}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center text-[#7c8098] transition hover:text-[#2720a8]"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-[7px] border border-[#ffd6d6] bg-[#fff6f6] px-4 py-3 font-medium text-[#c23b3b] text-[12px]">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-[7px] border border-[#cdeed8] bg-[#f3fff7] px-4 py-3 font-medium text-[#247a45] text-[12px]">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex h-[48px] w-full items-center justify-center rounded-[8px] bg-[#2720a8] font-bold text-[14px] text-white transition hover:bg-[#1d178e] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Adding Admin..." : "Add Admin"}
      </button>

      <p className="text-center text-[#9699aa] text-[11px] leading-5">
        Only authorized administrators can add another administrator to the CoolerGuru platform.
      </p>
    </form>
  );
}

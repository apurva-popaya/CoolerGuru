"use client";

import { type FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { Eye, EyeOff, LockKeyhole, Phone } from "lucide-react";

import { loginAdmin } from "@/lib/api/admin-auth-api";

export function AdminLoginForm() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const cleanedPhone = phone.replace(/\D/g, "");

    if (cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginAdmin(`+91${cleanedPhone}`, password);

      console.log("Admin login successful:", response.data.user);

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="admin-phone" className="mb-2 block font-semibold text-[#252a4a] text-[13px]">
          Mobile Number
        </label>

        <div className="flex h-[48px] overflow-hidden rounded-[8px] border border-[#dedfeb] bg-white transition focus-within:border-[#2720a8] focus-within:ring-2 focus-within:ring-[#2720a8]/10">
          <div className="flex items-center gap-2 border-[#e6e7ef] border-r bg-[#fafaff] px-3 font-medium text-[#444967] text-[13px]">
            <Phone size={16} />
            +91
          </div>

          <input
            id="admin-phone"
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
        <label htmlFor="admin-password" className="mb-2 block font-semibold text-[#252a4a] text-[13px]">
          Password
        </label>

        <div className="flex h-[48px] items-center rounded-[8px] border border-[#dedfeb] bg-white px-3 transition focus-within:border-[#2720a8] focus-within:ring-2 focus-within:ring-[#2720a8]/10">
          <LockKeyhole size={17} className="shrink-0 text-[#7c8098]" />

          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
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

      {error && (
        <div className="rounded-[7px] border border-[#ffd6d6] bg-[#fff6f6] px-4 py-3 font-medium text-[#c23b3b] text-[12px]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex h-[48px] w-full items-center justify-center rounded-[8px] bg-[#2720a8] font-bold text-[14px] text-white transition hover:bg-[#1d178e] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login to Admin Portal"}
      </button>

      <p className="pt-1 text-center text-[#9699aa] text-[12px] leading-5">Authorized administrators only</p>
    </form>
  );
}

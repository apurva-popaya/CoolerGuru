"use client";

import { useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChevronDown, LockKeyhole } from "lucide-react";

import { sendBuyerOtp, verifyBuyerOtp } from "@/lib/api/buyer-auth-api";
import { notifyBuyerAuthChanged } from "@/lib/buyer-auth-events";
import { sanitizeText } from "@/lib/utils/sanitize";

type BuyerOtpMode = "register" | "login";

interface BuyerOtpFormProps {
  mode: BuyerOtpMode;
}

export function BuyerOtpForm({ mode }: BuyerOtpFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isRegister = mode === "register";

  const title = isRegister ? "Register as Buyer" : "Login as Buyer";

  const subtitle = isRegister
    ? "Create your buyer account and explore trusted companies, products, and new launches across the air cooling industry."
    : "Enter your mobile number to receive an OTP";

  const verifyButtonText = isRegister
    ? "Verify & Continue"
    : "Verify & Login";

  const canSendOtp =
    mobileNumber.length === 10 &&
    (!isRegister || name.trim().length >= 2);

  const otpComplete = otp.every(Boolean);

  function resetOtpFields() {
    setOtp(["", "", "", "", "", ""]);
  }

  function focusFirstOtp() {
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 0);
  }

  async function handleSendOtp() {
    if (!canSendOtp || sendingOtp) {
      return;
    }

    setSendingOtp(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = isRegister
        ? {
            phone_number: mobileNumber,
            name: sanitizeText(name),
          }
        : {
            phone_number: mobileNumber,
          };

      const response = await sendBuyerOtp(payload);

      resetOtpFields();
      setOtpSent(true);
      setSuccessMessage(response.message);

      if (response.otp) {
        window.alert(`Your OTP is ${response.otp}`);
      }

      focusFirstOtp();
    } catch (error) {
      setOtpSent(false);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to send OTP. Please try again.",
      );
    } finally {
      setSendingOtp(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];

    updatedOtp[index] = digit;

    setOtp(updatedOtp);
    setError("");

    if (digit && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(
    event: React.ClipboardEvent<HTMLInputElement>,
  ) {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) {
      return;
    }

    const updatedOtp = ["", "", "", "", "", ""];

    pastedValue.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);
    setError("");

    const nextIndex = Math.min(pastedValue.length, 5);

    otpRefs.current[nextIndex]?.focus();
  }

  async function handleResendOtp() {
    if (!canSendOtp || sendingOtp) {
      return;
    }

    setSendingOtp(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = isRegister
        ? {
            phone_number: mobileNumber,
            name: name.trim(),
          }
        : {
            phone_number: mobileNumber,
          };

      const response = await sendBuyerOtp(payload);

      resetOtpFields();
      setOtpSent(true);
      setSuccessMessage(response.message);

      if (response.otp) {
        window.alert(`Your OTP is ${response.otp}`);
      }

      focusFirstOtp();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to resend OTP. Please try again.",
      );
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleVerify() {
    if (!otpSent || !otpComplete || verifyingOtp) {
      return;
    }

    setVerifyingOtp(true);
    setError("");
    setSuccessMessage("");

    try {
      const otpValue = otp.join("");

      const response = await verifyBuyerOtp({
        phone_number: mobileNumber,
        otp: otpValue,
      });

      console.log("Buyer authenticated:", response);

      setSuccessMessage(response.message);

      // Navbar lives in the persistent layout, so tell it to reload the user.
      notifyBuyerAuthChanged();

      router.push("/");

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "OTP verification failed. Please try again.",
      );
    } finally {
      setVerifyingOtp(false);
    }
  }

  function handleMobileChange(value: string) {
    const number = value.replace(/\D/g, "").slice(0, 10);

    setMobileNumber(number);

    /*
     * User changed the phone number after requesting OTP.
     * Previously sent OTP should no longer be used.
     */
    if (otpSent) {
      setOtpSent(false);
      resetOtpFields();
      setSuccessMessage("");
    }

    setError("");
  }

  function handleNameChange(value: string) {
    setName(value);
    setError("");
  }

  return (
    <div className="rounded-[12px] bg-white px-4 py-6 shadow-[0_10px_35px_rgba(31,24,130,0.08)] sm:px-7 sm:py-7 lg:px-10">
      <div className={isRegister ? "text-center" : ""}>
        <h2 className="font-bold text-[#171570] text-[21px] sm:text-[24px]">
          {title}
        </h2>

        <p
          className={
            isRegister
              ? "mx-auto mt-2 max-w-[320px] text-[#62677f] text-[9px] leading-[1.5] sm:text-[10px]"
              : "mt-2 text-[#646980] text-[9px] sm:text-[10px]"
          }
        >
          {subtitle}
        </p>
      </div>

      {/* Name */}
      {isRegister && (
        <div className="mt-5 sm:mt-6">
          <label className="mb-2 block font-bold text-[#171570] text-[9px] sm:text-[10px]">
            Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            disabled={sendingOtp || verifyingOtp}
            className="h-[42px] w-full rounded-[5px] border border-[#dedff0] bg-white px-3 text-[#292e50] text-[10px] outline-none placeholder:text-[#a4a7b8] focus:border-[#776de5] disabled:cursor-not-allowed disabled:bg-[#fafaff] sm:h-[44px] sm:text-[11px]"
          />
        </div>
      )}

      {/* Mobile */}
      <div className={isRegister ? "mt-4" : "mt-5 sm:mt-6"}>
        <label className="mb-2 block font-bold text-[#171570] text-[9px] sm:text-[10px]">
          Mobile Number
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div className="flex h-[42px] overflow-hidden rounded-[5px] border border-[#dedff0] sm:h-[44px]">
          <button
            type="button"
            className="flex w-[82px] shrink-0 items-center justify-center gap-1.5 border-[#dedff0] border-r bg-white font-medium text-[#34395e] text-[9px] sm:w-[102px] sm:gap-2 sm:text-[10px]"
          >
            <span className="text-[15px] sm:text-[17px]">🇮🇳</span>

            <span>+91</span>

            <ChevronDown size={10} />
          </button>

          <input
            type="tel"
            value={mobileNumber}
            onChange={(event) =>
              handleMobileChange(event.target.value)
            }
            placeholder="Enter mobile number"
            autoComplete="tel"
            inputMode="numeric"
            disabled={sendingOtp || verifyingOtp}
            className="min-w-0 flex-1 px-3 text-[#292e50] text-[10px] outline-none placeholder:text-[#a4a7b8] disabled:cursor-not-allowed disabled:bg-[#fafaff] sm:text-[11px]"
          />
        </div>

        <button
          type="button"
          onClick={handleSendOtp}
          disabled={
            !canSendOtp ||
            sendingOtp ||
            verifyingOtp
          }
          className="mt-3 flex h-[40px] w-full items-center justify-center rounded-[5px] bg-gradient-to-r from-[#2b20bb] to-[#24139e] font-bold text-[10px] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
        >
          {sendingOtp
            ? "Sending OTP..."
            : otpSent
              ? "Send OTP Again"
              : "Send OTP"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-[6px] border border-red-200 bg-red-50 px-3 py-2 font-medium text-[9px] text-red-600 sm:text-[10px]">
          {error}
        </div>
      )}

      {/* Success */}
      {successMessage && (
        <div className="mt-4 rounded-[6px] border border-green-200 bg-green-50 px-3 py-2 font-medium text-[9px] text-green-700 sm:text-[10px]">
          {successMessage}
        </div>
      )}

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 sm:gap-4">
        <div className="h-px flex-1 bg-[#dedfe9]" />

        <span className="font-medium text-[#29228f] text-[8px] sm:text-[9px]">
          OR
        </span>

        <div className="h-px flex-1 bg-[#dedfe9]" />
      </div>

      {/* OTP */}
      <div>
        <h3 className="font-bold text-[#171570] text-[10px] sm:text-[11px]">
          Enter OTP
        </h3>

        <p className="mt-1 text-[#696e84] text-[8px] sm:text-[9px]">
          We&apos;ve sent a 6-digit code to your mobile number
        </p>

        <div className="mt-3 grid grid-cols-6 gap-1.5 sm:gap-2.5 md:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                otpRefs.current[index] = element;
              }}
              value={digit}
              onChange={(event) =>
                handleOtpChange(index, event.target.value)
              }
              onKeyDown={(event) =>
                handleOtpKeyDown(index, event)
              }
              onPaste={handleOtpPaste}
              inputMode="numeric"
              maxLength={1}
              disabled={!otpSent || verifyingOtp}
              aria-label={`OTP digit ${index + 1}`}
              className="h-[40px] w-full rounded-[5px] border border-[#dedff0] bg-white text-center font-semibold text-[#2118ad] text-[15px] outline-none focus:border-[#776de5] disabled:bg-[#fafaff] sm:h-[43px] sm:text-[16px]"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={
            !otpSent ||
            !otpComplete ||
            verifyingOtp
          }
          className="mt-4 flex h-[40px] w-full items-center justify-center rounded-[5px] bg-[#2116a5] font-bold text-[10px] text-white transition hover:bg-[#181080] disabled:cursor-not-allowed disabled:bg-[#aeb0d8] sm:text-[11px]"
        >
          {verifyingOtp
            ? "Verifying..."
            : verifyButtonText}
        </button>

        <p className="mt-4 text-center text-[#686d84] text-[8px] sm:text-[9px]">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={
              !otpSent ||
              sendingOtp ||
              verifyingOtp
            }
            className="font-bold text-[#2519c9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sendingOtp ? "Sending..." : "Resend OTP"}
          </button>
        </p>
      </div>

      {/* Terms */}
      {isRegister && (
        <div className="mt-4 flex items-start gap-3 border-[#ececf3] border-y py-4">
          <div className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full bg-[#f0edff] text-[#3125d4]">
            <LockKeyhole size={15} />
          </div>

          <p className="text-[#62677f] text-[7px] leading-[1.5] sm:text-[8px]">
            By continuing, you agree to our{" "}
            <Link
              href="/terms-and-conditions"
              className="font-bold text-[#2519c9]"
            >
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-bold text-[#2519c9]"
            >
              Privacy Policy.
            </Link>
          </p>
        </div>
      )}

      {/* Switch */}
      <p className="mt-4 text-center text-[#666b82] text-[10px] sm:text-[12px]">
        {isRegister
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-bold text-[#2519c9]"
        >
          {isRegister ? "Login" : "Register"}
        </Link>
      </p>
    </div>
  );
}
"use client";

import { useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChevronDown, ShieldCheck, Smartphone } from "lucide-react";

import { Container } from "@/components/common/container";
import { sendSupplierOtp, verifySupplierOtp } from "@/lib/api/supplier-auth-api";

export default function SupplierLoginForm() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [sendingOtp, setSendingOtp] = useState(false);

  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const resetOtp = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  const focusFirstOtp = () => {
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 0);
  };

  const handleSendOtp = async () => {
    if (mobile.length !== 10 || sendingOtp || verifyingOtp) {
      return;
    }

    setSendingOtp(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await sendSupplierOtp(mobile);

      resetOtp();

      setOtpSent(true);

      setSuccessMessage(response.message);

      if (response.otp) {
        window.alert(`Your OTP is ${response.otp}`);
      }

      focusFirstOtp();
    } catch (error) {
      setOtpSent(false);

      setError(error instanceof Error ? error.message : "Unable to send OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];

    updatedOtp[index] = digit;

    setOtp(updatedOtp);
    setError("");

    if (digit && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

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
  };

  const otpComplete = otp.every(Boolean);

  const handleVerifyLogin = async () => {
    if (!otpSent || !otpComplete || verifyingOtp) {
      return;
    }

    setVerifyingOtp(true);
    setError("");
    setSuccessMessage("");

    try {
      const otpValue = otp.join("");

      const response = await verifySupplierOtp(mobile, otpValue);

      console.log("Supplier authenticated:", response);

      console.log("Supplier user:", response.user);

      setSuccessMessage(response.message);

      router.push("/supplier/dashboard");

      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "OTP verification failed. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleChangeMobile = () => {
    setOtpSent(false);
    resetOtp();
    setError("");
    setSuccessMessage("");
  };

  return (
    <section className="bg-gradient-to-br from-[#f8f9ff] via-white to-[#f2f4ff] px-4 py-9">
      <Container>
        <div className="text-center">
          <h1 className="font-bold text-[#171570] text-[30px]">Login</h1>

          <p className="mt-2 font-medium text-[#4e5472] text-[11px]">Login to your CoolerGuru supplier account</p>
        </div>

        <div className="mx-auto mt-6 max-w-[620px] overflow-hidden rounded-[10px] border border-[#e4e5ef] bg-white shadow-[0_14px_40px_rgba(40,35,120,0.08)]">
          <div className="border-[#e4e5ef] border-b px-6 py-5 text-center">
            <h2 className="font-bold text-[#2a20c4] text-[17px]">Mobile Login</h2>
          </div>

          <div className="px-10 py-8">
            <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-[12px] bg-[#efedff]">
              <Smartphone size={27} strokeWidth={1.8} className="text-[#3125ce]" />
            </div>

            <div className="mt-5 text-center">
              <h3 className="font-bold text-[#171570] text-[19px]">Login with Mobile Number</h3>

              <p className="mx-auto mt-2 max-w-[360px] font-medium text-[#555b78] text-[10px] leading-[1.55]">
                Enter your registered mobile number to receive OTP and login to your supplier account.
              </p>
            </div>

            <div className="mt-8">
              <label htmlFor="supplier-login-mobile" className="font-bold text-[#171570] text-[10px]">
                Mobile Number
                <span className="ml-0.5 text-red-500">*</span>
              </label>

              <div className="mt-2 flex h-[48px] overflow-hidden rounded-[6px] border border-[#dcddea] bg-white transition focus-within:border-[#392bd3]">
                <button
                  type="button"
                  className="flex w-[145px] shrink-0 items-center gap-3 border-[#e2e3ed] border-r px-4"
                >
                  <span className="text-[18px]">🇮🇳</span>

                  <span className="font-semibold text-[#30355c] text-[10px]">+91</span>

                  <ChevronDown size={13} className="ml-auto text-[#2d23c4]" />
                </button>

                <input
                  id="supplier-login-mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  disabled={otpSent || sendingOtp || verifyingOtp}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "").slice(0, 10);

                    setMobile(value);
                    setError("");
                  }}
                  placeholder="Enter 10 digit mobile number"
                  className="min-w-0 flex-1 px-4 text-[#34395b] text-[10px] outline-none placeholder:text-[#9296ad] disabled:cursor-not-allowed disabled:bg-[#fafaff]"
                />
              </div>

              <p className="mt-2 text-[#646984] text-[8px]">
                We will send a One Time Password (OTP) to your registered mobile number
              </p>
            </div>

            {error && (
              <div className="mt-4 rounded-[6px] border border-red-200 bg-red-50 px-3 py-2 font-medium text-[10px] text-red-600">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mt-4 rounded-[6px] border border-green-200 bg-green-50 px-3 py-2 font-medium text-[10px] text-green-700">
                {successMessage}
              </div>
            )}

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={mobile.length !== 10 || sendingOtp || verifyingOtp}
                className="mt-6 flex h-[46px] w-full items-center justify-center rounded-[6px] bg-gradient-to-r from-[#2819b8] to-[#3924d7] font-bold text-[11px] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sendingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#171570] text-[10px]">
                      Enter OTP
                      <span className="ml-0.5 text-red-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleChangeMobile}
                      disabled={verifyingOtp || sendingOtp}
                      className="font-bold text-[#2b21c6] text-[8px] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Change Mobile Number
                    </button>
                  </div>

                  <p className="mt-1 text-[#646984] text-[8px]">Enter the 6-digit OTP sent to +91 {mobile}</p>

                  <div className="mt-3 grid grid-cols-6 gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(element) => {
                          otpRefs.current[index] = element;
                        }}
                        value={digit}
                        inputMode="numeric"
                        maxLength={1}
                        disabled={verifyingOtp || sendingOtp}
                        onChange={(event) => handleOtpChange(index, event.target.value)}
                        onKeyDown={(event) => handleOtpKeyDown(index, event)}
                        onPaste={handleOtpPaste}
                        className="h-[46px] w-full rounded-[6px] border border-[#dcddea] bg-white text-center font-bold text-[#251ab8] text-[15px] outline-none transition focus:border-[#392bd3] disabled:cursor-not-allowed disabled:bg-[#fafaff]"
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || verifyingOtp}
                    className="mt-3 font-bold text-[#2b21c6] text-[8px] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sendingOtp ? "Sending..." : "Resend OTP"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyLogin}
                  disabled={!otpSent || !otpComplete || verifyingOtp || sendingOtp}
                  className="mt-5 flex h-[46px] w-full items-center justify-center rounded-[6px] bg-gradient-to-r from-[#2819b8] to-[#3924d7] font-bold text-[11px] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {verifyingOtp ? "Verifying..." : "Verify & Login"}
                </button>
              </>
            )}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e0e1ea]" />

              <span className="font-bold text-[#242956] text-[9px]">OR</span>

              <div className="h-px flex-1 bg-[#e0e1ea]" />
            </div>

            <p className="text-center font-medium text-[#444a6a] text-[10px]">
              Don&apos;t have an account?{" "}
              <Link href="/supplier/register" className="!text-[#2b21c6] font-bold hover:underline">
                Register here
              </Link>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-[#555b78] text-[9px]">
              <ShieldCheck size={15} className="text-[#2d23c5]" />

              <span>Your information is safe with us. We do not share your details.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

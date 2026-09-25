"use client";

import * as React from "react";
import {
  Camera,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserRound,
} from "lucide-react";

export function BuyerProfile() {
  const [fullName, setFullName] = React.useState("Admin User");
  const [phoneNumber, setPhoneNumber] = React.useState("9876543210");
  const [email, setEmail] = React.useState("abc@example.com");
  const [countryCode, setCountryCode] = React.useState("+91");
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleSave = () => {
    console.log({
      fullName,
      phoneNumber,
      countryCode,
      profileImage,
    });
  };

  const handleCancel = () => {
    setFullName("Admin User");
    setPhoneNumber("9876543210");
  };

  return (
    <main className="min-h-screen bg-[#f6f6ff] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        {/* -------------------------------------------------------------- */}
        {/* Page Header                                                     */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-4">
          <h1 className="text-[20px] font-bold text-[#171a4a] sm:text-[22px]">
            My Profile
          </h1>

          <p className="mt-1 text-[10px] text-[#77798f] sm:text-[11px]">
            Home <span className="mx-1">›</span> Profile
          </p>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Profile Summary Card                                           */}
        {/* -------------------------------------------------------------- */}

        <section className="mb-4 rounded-[7px] border border-[#e8e7f4] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:p-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full bg-[#aaa9ff] text-[15px] font-semibold text-white sm:h-[52px] sm:w-[52px]">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "AB"
                )}
              </div>

              <div className="absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-white">
                <Camera
                  size={9}
                  strokeWidth={2}
                  className="text-[#4a42d8]"
                />
              </div>
            </div>

            {/* User information */}
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[12px] font-bold text-[#202449] sm:text-[13px]">
                Admin User
              </h2>

              <p className="mt-0.5 text-[9px] text-[#73758a] sm:text-[10px]">
                Administrator
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1 text-[8px] text-[#5d6075] sm:text-[9px]">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#25b76b]" />
                  Active
                </span>

                <span className="inline-flex items-center gap-1 text-[8px] text-[#6d6f84] sm:text-[9px]">
                  <Mail size={9} />
                  admin@coolerguru.com
                </span>

                <span className="inline-flex items-center gap-1 text-[8px] text-[#6d6f84] sm:text-[9px]">
                  <Clock3 size={9} />
                  Member since Jan 15, 2024
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Edit Profile Card                                               */}
        {/* -------------------------------------------------------------- */}

        <section className="mb-4 rounded-[7px] border border-[#e8e7f4] bg-white p-4 sm:p-5">
          <div className="mb-4">
            <h2 className="text-[12px] font-bold text-[#202449] sm:text-[13px]">
              Edit Profile
            </h2>

            <p className="mt-0.5 text-[9px] text-[#85879a] sm:text-[10px]">
              Update your personal information and profile picture.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[125px_1fr]">
            {/* ---------------------------------------------------------- */}
            {/* Profile Picture                                             */}
            {/* ---------------------------------------------------------- */}

            <div>
              <p className="mb-2 text-[9px] font-semibold text-[#303353]">
                Profile Picture
              </p>

              <div className="flex flex-col items-center">
                <div className="flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full bg-[#aaa9ff] text-[17px] font-semibold text-white">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "AB"
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 rounded-[4px] border border-[#bdb9ff] px-3 py-1 text-[8px] font-medium text-[#453bc7] transition hover:bg-[#f5f3ff]"
                >
                  <span className="inline-flex items-center gap-1">
                    <Camera size={9} />
                    Upload Photo
                  </span>
                </button>

                <p className="mt-1 text-center text-[7px] text-[#9a9bab]">
                  JPG, PNG or WebP • Max 2MB.
                </p>
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* Form Fields                                                  */}
            {/* ---------------------------------------------------------- */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold text-[#303353]">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-[32px] w-full rounded-[4px] border border-[#e1e1ec] bg-white px-3 text-[9px] text-[#303353] outline-none transition placeholder:text-[#aaaabd] focus:border-[#7770e8] focus:ring-1 focus:ring-[#7770e8]/20"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold text-[#303353]">
  Email <span className="text-red-500">*</span>
</label>

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  className="h-[32px] w-full rounded-[4px] border border-[#e1e1ec] bg-white px-3 text-[9px] text-[#303353] outline-none transition placeholder:text-[#aaaabd] focus:border-[#7770e8] focus:ring-1 focus:ring-[#7770e8]/20"
/>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex justify-end gap-2 border-t border-[#eeeeF5] pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-[4px] border border-[#d5d4e5] px-4 py-1.5 text-[9px] font-medium text-[#4a4c61] transition hover:bg-[#f8f8fc]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-[4px] bg-[#3025c8] px-4 py-1.5 text-[9px] font-semibold text-white transition hover:bg-[#271eb0]"
            >
              Save Changes
            </button>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Account Information                                             */}
        {/* -------------------------------------------------------------- */}

        <section className="rounded-[7px] border border-[#e8e7f4] bg-white p-4 sm:p-5">
          <div className="mb-4">
            <h2 className="text-[12px] font-bold text-[#202449] sm:text-[13px]">
              Account Information
            </h2>

            <p className="mt-0.5 text-[9px] text-[#85879a] sm:text-[10px]">
              View your account details and role information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Email */}
            <AccountInfo
              icon={<Mail size={12} />}
              label="Email Address"
              value="admin@coolerguru.com"
            />

            {/* Phone */}
            <AccountInfo
              icon={<Phone size={12} />}
              label="Phone Number"
              value="+91 98765 43210"
            />

            {/* Status */}
            <AccountInfo
              icon={<UserRound size={12} />}
              label="Account Status"
              value="Active"
              valueClassName="text-[#20a863]"
            />

            {/* Role */}
            <AccountInfo
              icon={<ShieldCheck size={12} />}
              label="Role"
              value="Administrator"
            />

            {/* Member Since */}
            <AccountInfo
              icon={<Clock3 size={12} />}
              label="Member Since"
              value="Jan 15, 2024"
            />

            {/* Last Login */}
            <AccountInfo
              icon={<CheckCircle2 size={12} />}
              label="Last Login"
              value="May 31, 2025, 10:24 AM"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Account Info Component                                                     */
/* -------------------------------------------------------------------------- */

interface AccountInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}

function AccountInfo({
  icon,
  label,
  value,
  valueClassName = "text-[#303353]",
}: AccountInfoProps) {
  return (
    <div className="flex min-h-[52px] items-center gap-2.5 rounded-[5px] bg-[#fafaff] px-3 py-2">
      <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[5px] bg-[#f0efff] text-[#4a42d8]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[8px] text-[#898b9e]">{label}</p>

        <p
          className={`mt-0.5 truncate text-[9px] font-medium ${valueClassName}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
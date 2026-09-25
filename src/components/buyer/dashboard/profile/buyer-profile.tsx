"use client";

import * as React from "react";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MonitorSmartphone,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { getCurrentUser, type UpdateMyProfilePayload, updateMyProfile } from "@/lib/api/auth-session-api";
import {
  getUploadAccept,
  getUploadErrorMessage,
  getUploadHint,
  uploadFile,
  validateUploadFile,
} from "@/lib/api/file-upload-api";
import type { AuthUser } from "@/lib/auth/auth-types";
import { notifyBuyerAuthChanged } from "@/lib/buyer-auth-events";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getDisplayName(user: AuthUser) {
  return (
    user.name?.trim() ||
    [user.first_name, user.last_name].filter(Boolean).join(" ").trim() ||
    "Buyer"
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  const initials = parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : (parts[0]?.slice(0, 2) ?? "");

  return initials.toUpperCase() || "B";
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatDateTime(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* "+918888012920" -> "+91 88880 12920" */
function formatPhone(value?: string | null) {
  if (!value) return "-";

  const match = value.match(/^\+91(\d{5})(\d{5})$/);

  return match ? `+91 ${match[1]} ${match[2]}` : value;
}

function formatRoles(roles: string[]) {
  if (roles.length === 0) return "-";

  return roles.map((role) => role.charAt(0) + role.slice(1).toLowerCase()).join(", ");
}

function formatStatus(user: AuthUser) {
  if (user.status) {
    return user.status.charAt(0) + user.status.slice(1).toLowerCase();
  }

  return user.is_active === false ? "Inactive" : "Active";
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function BuyerProfile() {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const resetForm = React.useCallback((nextUser: AuthUser) => {
    setFullName(nextUser.name?.trim() ?? "");
    setEmail(nextUser.email ?? "");
    setProfileImage(nextUser.profile_image_url ?? null);
  }, []);

  const loadProfile = React.useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await getCurrentUser();

      setUser(response.user);
      resetForm(response.user);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Unable to load your profile.");
    } finally {
      setLoading(false);
    }
  }, [resetForm]);

  React.useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const trimmedName = fullName.trim();
  const trimmedEmail = email.trim();

  const hasChanges =
    user !== null &&
    (trimmedName !== (user.name?.trim() ?? "") ||
      trimmedEmail !== (user.email ?? "") ||
      profileImage !== (user.profile_image_url ?? null));

  const busy = saving || uploadingImage;

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Allow picking the same file again later.
    event.target.value = "";

    if (!file) return;

    const validationError = validateUploadFile(file, "user_profile_image");

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setUploadingImage(true);
    setFormError("");
    setSuccessMessage("");

    try {
      // Stored now; linked to the account when the buyer clicks Save Changes.
      const uploaded = await uploadFile(file, "user_profile_image");

      setProfileImage(uploaded.url);
    } catch (error) {
      setFormError(getUploadErrorMessage(error));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!user || !hasChanges || busy) return;

    if (!trimmedName) {
      setFormError("Full name is required.");
      return;
    }

    if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    // Send only what changed; an empty email clears it.
    const payload: UpdateMyProfilePayload = {};

    if (trimmedName !== (user.name?.trim() ?? "")) payload.name = trimmedName;
    if (trimmedEmail !== (user.email ?? "")) payload.email = trimmedEmail || null;
    if (profileImage !== (user.profile_image_url ?? null)) payload.profile_image_url = profileImage;

    setSaving(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const response = await updateMyProfile(payload);

      // PATCH returns fewer fields than /auth/me, so merge instead of replacing.
      const nextUser = { ...user, ...response.user };

      setUser(nextUser);
      resetForm(nextUser);
      setSuccessMessage(response.message || "Profile updated successfully.");

      // Navbar shows the buyer's name.
      notifyBuyerAuthChanged();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;

    resetForm(user);
    setFormError("");
    setSuccessMessage("");
  };

  /* ------------------------------------------------------------------------ */
  /* Loading / error states                                                   */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f6ff] px-4">
        <div className="flex items-center gap-2 text-[#5d6075] text-[11px]" role="status">
          <Loader2 size={16} className="animate-spin text-[#3025c8]" />
          Loading your profile...
        </div>
      </main>
    );
  }

  if (loadError || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f6ff] px-4">
        <div className="max-w-[320px] rounded-[7px] border border-[#e8e7f4] bg-white p-5 text-center">
          <AlertCircle size={22} className="mx-auto text-red-500" />

          <p className="mt-2 font-semibold text-[#202449] text-[12px]">Unable to load your profile</p>

          <p className="mt-1 text-[#77798f] text-[10px]">{loadError || "Please try again."}</p>

          <button
            type="button"
            onClick={() => void loadProfile()}
            className="mt-4 rounded-[4px] bg-[#3025c8] px-4 py-1.5 font-semibold text-[9px] text-white transition hover:bg-[#271eb0]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const displayName = getDisplayName(user);
  const initials = getInitials(displayName);
  const status = formatStatus(user);
  const isActive = user.is_active !== false;
  const lastLogin = user.previous_login_at ?? user.last_login_at;

  return (
    <main className="min-h-screen bg-[#f6f6ff] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        {/* -------------------------------------------------------------- */}
        {/* Page Header                                                     */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-4">
          <h1 className="font-bold text-[#171a4a] text-[20px] sm:text-[22px]">My Profile</h1>

          <p className="mt-1 text-[#77798f] text-[10px] sm:text-[11px]">
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
              <Avatar
                src={user.profile_image_url ?? null}
                initials={initials}
                className="h-[48px] w-[48px] text-[15px] sm:h-[52px] sm:w-[52px]"
              />

              <div className="absolute -right-1 -bottom-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-white">
                <Camera size={9} strokeWidth={2} className="text-[#4a42d8]" />
              </div>
            </div>

            {/* User information */}
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-bold text-[#202449] text-[12px] sm:text-[13px]">{displayName}</h2>

              <p className="mt-0.5 text-[#73758a] text-[9px] sm:text-[10px]">Buyer Account</p>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1 text-[#5d6075] text-[8px] sm:text-[9px]">
                  <span className={`h-[5px] w-[5px] rounded-full ${isActive ? "bg-[#25b76b]" : "bg-[#9a9bab]"}`} />
                  {status}
                </span>

                {user.email ? (
                  <span className="inline-flex min-w-0 items-center gap-1 text-[#6d6f84] text-[8px] sm:text-[9px]">
                    <Mail size={9} className="shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </span>
                ) : null}

                <span className="inline-flex items-center gap-1 text-[#6d6f84] text-[8px] sm:text-[9px]">
                  <Phone size={9} />
                  {formatPhone(user.phone_number)}
                </span>

                <span className="inline-flex items-center gap-1 text-[#6d6f84] text-[8px] sm:text-[9px]">
                  <Clock3 size={9} />
                  Member since {formatDate(user.member_since)}
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
            <h2 className="font-bold text-[#202449] text-[12px] sm:text-[13px]">Edit Profile</h2>

            <p className="mt-0.5 text-[#85879a] text-[9px] sm:text-[10px]">
              Update your personal information and profile picture.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[125px_1fr]">
            {/* ---------------------------------------------------------- */}
            {/* Profile Picture                                             */}
            {/* ---------------------------------------------------------- */}

            <div>
              <p className="mb-2 font-semibold text-[#303353] text-[9px]">Profile Picture</p>

              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar src={profileImage} initials={initials} className="h-[58px] w-[58px] text-[17px]" />

                  {uploadingImage ? (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/70">
                      <Loader2 size={16} className="animate-spin text-[#3025c8]" />
                    </div>
                  ) : null}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept={getUploadAccept("user_profile_image")}
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={busy}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={busy}
                  className="mt-2 rounded-[4px] border border-[#bdb9ff] px-3 py-1 font-medium text-[#453bc7] text-[8px] transition hover:bg-[#f5f3ff] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="inline-flex items-center gap-1">
                    <Camera size={9} />
                    {uploadingImage ? "Uploading..." : "Upload Photo"}
                  </span>
                </button>

                {profileImage ? (
                  <button
                    type="button"
                    onClick={() => setProfileImage(null)}
                    disabled={busy}
                    className="mt-1 font-medium text-[#77798f] text-[8px] hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove photo
                  </button>
                ) : null}

                <p className="mt-1 text-center text-[#9a9bab] text-[7px]">{getUploadHint("user_profile_image")}</p>
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* Form Fields                                                  */}
            {/* ---------------------------------------------------------- */}

            <div className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label htmlFor="buyer-profile-name" className="mb-1.5 block font-semibold text-[#303353] text-[9px]">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="buyer-profile-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  maxLength={100}
                  placeholder="Enter your full name"
                  disabled={saving}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="buyer-profile-email" className="mb-1.5 block font-semibold text-[#303353] text-[9px]">
                  Email
                </label>

                <input
                  id="buyer-profile-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  maxLength={254}
                  placeholder="Enter your email"
                  disabled={saving}
                  className={inputClass}
                />
              </div>

              {/* Phone (read-only: used for OTP login) */}
              <div>
                <label htmlFor="buyer-profile-phone" className="mb-1.5 block font-semibold text-[#303353] text-[9px]">
                  Phone Number
                </label>

                <input
                  id="buyer-profile-phone"
                  type="tel"
                  value={formatPhone(user.phone_number)}
                  readOnly
                  disabled
                  className={`${inputClass} bg-[#fafaff] text-[#77798f]`}
                />

                <p className="mt-1 text-[#9a9bab] text-[7px]">Your phone number is used to log in and can't be changed.</p>
              </div>
            </div>
          </div>

          {formError ? (
            <p role="alert" className="mt-4 rounded-[4px] border border-red-200 bg-red-50 px-3 py-2 text-[9px] text-red-600">
              {formError}
            </p>
          ) : null}

          {successMessage ? (
            <p
              role="status"
              className="mt-4 rounded-[4px] border border-[#bfe5ca] bg-[#f5fff8] px-3 py-2 text-[#188f3e] text-[9px]"
            >
              {successMessage}
            </p>
          ) : null}

          {/* Actions */}
          <div className="mt-5 flex justify-end gap-2 border-[#eeeef5] border-t pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={!hasChanges || busy}
              className="rounded-[4px] border border-[#d5d4e5] px-4 py-1.5 font-medium text-[#4a4c61] text-[9px] transition hover:bg-[#f8f8fc] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges || busy}
              aria-busy={saving}
              className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#3025c8] px-4 py-1.5 font-semibold text-[9px] text-white transition hover:bg-[#271eb0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? <Loader2 size={10} className="animate-spin" /> : null}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Account Information                                             */}
        {/* -------------------------------------------------------------- */}

        <section className="rounded-[7px] border border-[#e8e7f4] bg-white p-4 sm:p-5">
          <div className="mb-4">
            <h2 className="font-bold text-[#202449] text-[12px] sm:text-[13px]">Account Information</h2>

            <p className="mt-0.5 text-[#85879a] text-[9px] sm:text-[10px]">
              View your account details and role information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AccountInfo
              icon={<Mail size={12} />}
              label="Email Address"
              value={user.email || "Not added"}
              badge={user.email ? (user.email_verified ? "Verified" : "Not verified") : undefined}
              badgeTone={user.email_verified ? "success" : "muted"}
            />

            <AccountInfo
              icon={<Phone size={12} />}
              label="Phone Number"
              value={formatPhone(user.phone_number)}
              badge={user.phone_verified ? "Verified" : undefined}
              badgeTone="success"
            />

            <AccountInfo
              icon={<UserRound size={12} />}
              label="Account Status"
              value={status}
              valueClassName={isActive ? "text-[#20a863]" : "text-[#77798f]"}
            />

            {/* <AccountInfo icon={<ShieldCheck size={12} />} label="Roles" value={formatRoles(user.roles)} /> */}

            <AccountInfo icon={<Clock3 size={12} />} label="Member Since" value={formatDate(user.member_since)} />

            <AccountInfo icon={<CheckCircle2 size={12} />} label="Last Login" value={formatDateTime(lastLogin)} />

            {/* {user.active_sessions !== undefined ? (
              <AccountInfo
                icon={<MonitorSmartphone size={12} />}
                label="Active Sessions"
                value={String(user.active_sessions)}
              />
            ) : null} */}
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Avatar                                                                     */
/* -------------------------------------------------------------------------- */

function Avatar({ src, initials, className }: { src: string | null; initials: string; className: string }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full bg-[#aaa9ff] font-semibold text-white ${className}`}
    >
      {src ? (
        // biome-ignore lint/performance/noImgElement: user-uploaded URL from the upload API.
        <img src={src} alt="Profile" className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </div>
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
  badge?: string;
  badgeTone?: "success" | "muted";
}

function AccountInfo({
  icon,
  label,
  value,
  valueClassName = "text-[#303353]",
  badge,
  badgeTone = "muted",
}: AccountInfoProps) {
  return (
    <div className="flex min-h-[52px] items-center gap-2.5 rounded-[5px] bg-[#fafaff] px-3 py-2">
      <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[5px] bg-[#f0efff] text-[#4a42d8]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[#898b9e] text-[8px]">{label}</p>

        <div className="mt-0.5 flex min-w-0 items-center gap-1.5">
          <p className={`truncate font-medium text-[9px] ${valueClassName}`}>{value}</p>

          {badge ? (
            <span
              className={`shrink-0 rounded-full px-1.5 py-[1px] font-semibold text-[7px] ${
                badgeTone === "success" ? "bg-[#e8f8ed] text-[#188f3e]" : "bg-[#efeff5] text-[#77798f]"
              }`}
            >
              {badge}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "h-[32px] w-full rounded-[4px] border border-[#e1e1ec] bg-white px-3 text-[9px] text-[#303353] outline-none transition placeholder:text-[#aaaabd] focus:border-[#7770e8] focus:ring-1 focus:ring-[#7770e8]/20 disabled:cursor-not-allowed";

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import {
  getSavedStatus,
  removeSavedCompany,
  removeSavedProduct,
  saveCompany,
  saveProduct,
} from "@/lib/api/buyer-saved-api";

interface FavoriteButtonProps {
  id: string;
  type: "product" | "company";
  title?: string;
  image?: string;
}

export function FavoriteButton({ id, type }: FavoriteButtonProps) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSavedStatus() {
      const numericId = Number(id);
      if (!Number.isFinite(numericId)) {
        setLoading(false);
        return;
      }

      try {
        const response = await getSavedStatus({
          product_ids: type === "product" ? [numericId] : [],
          company_ids: type === "company" ? [numericId] : [],
        });
        if (cancelled) return;

        if (type === "product") {
          setLiked(
            response.data.products.find((i) => i.product_id === numericId)
              ?.is_saved ?? false,
          );
        } else {
          setLiked(
            response.data.companies.find((i) => i.company_id === numericId)
              ?.is_saved ?? false,
          );
        }
      } catch {
        // Logged out or request failed: show an empty heart, no message.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadSavedStatus();
    return () => {
      cancelled = true;
    };
  }, [id, type]);

  function showLoginPrompt() {
    setShowLoginMessage(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowLoginMessage(false), 4000);
  }

  async function handleToggle() {
    if (saving) return;
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return;

    setSaving(true);
    try {
      const response = liked
        ? type === "product"
          ? await removeSavedProduct(numericId)
          : await removeSavedCompany(numericId)
        : type === "product"
          ? await saveProduct(numericId)
          : await saveCompany(numericId);

      setLiked(response.data.is_saved);
    } catch (error) {
      const status = (error as { status?: number }).status;

      if (status === 401 || status === 403) {
        showLoginPrompt();
      } else {
        // warn, not error, so the Next.js red overlay doesn't appear
        console.warn(`Failed to ${liked ? "remove" : "save"} ${type}:`, error);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={liked ? `Remove ${type} from saved` : `Save ${type}`}
        aria-pressed={liked}
        disabled={loading || saving}
        onClick={handleToggle}
        className="absolute top-3 right-3 z-10 text-[#3325e2] transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Heart
          size={18}
          strokeWidth={2}
          className={
            liked
              ? "fill-[#3325e2] text-[#3325e2]"
              : "fill-transparent text-[#3325e2]"
          }
        />
      </button>

      {showLoginMessage && (
        <div
          role="alert"
          className="absolute top-10 right-3 z-20 rounded-[6px] border border-[#dedff0] bg-white px-3 py-2 text-[9px] text-[#34395d] shadow-[0_6px_18px_rgba(31,24,150,0.15)]"
        >
          Please login first to save {type === "product" ? "products" : "companies"}.{" "}
          <Link href="/login" className="font-bold text-[#2516c7] underline">
            Login
          </Link>
        </div>
      )}
    </>
  );
}
"use client";

import * as React from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Star,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  updateAdminCompanyFeatured,
} from "@/lib/api/admin-companies-api";

import {
  getApiErrorMessage,
} from "@/lib/api/get-api-error-message";

import type {
  CompanyDetailData,
} from "./company-detail-data";

export function CompanyFeaturedButton({
  company,
}: {
  company: CompanyDetailData;
}) {
  const router =
    useRouter();

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

  async function handleToggle() {
    if (loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updateAdminCompanyFeatured(
        company.id,
        {
          is_featured:
            !company.featured,

          priority:
            company.featured
              ? 0
              : company.featuredPriority ??
                1,
        },
      );

      router.refresh();
    } catch (error) {
      setError(
        getApiErrorMessage(
          error,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button type="button" disabled={loading} onClick={() => void handleToggle()} className="gap-2 bg-[#2720a8] hover:bg-[#15136f]">
        <Star className="size-4" />

        {loading
          ? "Updating..."
          : company.featured
            ? "Remove Featured"
            : "Mark as Featured"}
      </Button>

      {error ? (
        <p className="mt-2 text-[11px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
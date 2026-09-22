"use client";

import * as React from "react";

import { Check, ClipboardCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { CompanyDetailData } from "./company-detail-data";
import { RejectCompanyDialog } from "./reject-company-dialog";

export function AdminDecisionPanel({ company }: { company: CompanyDetailData }) {
  const [rejectDialogOpen, setRejectDialogOpen] = React.useState(false);

  const canReview = company.verificationStatus === "Pending" || company.verificationStatus === "Under Verification";

  if (!canReview) {
    return null;
  }

  function handleApprove() {
    console.log("Approve company:", company.id);
  }

  return (
    <>
      <div className="rounded-[9px] border border-[#ddd9ff] bg-[#faf9ff] p-4">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-[#f0edff]">
            <ClipboardCheck className="size-4 text-[#2720a8]" />
          </div>

          <div>
            <h2 className="font-bold text-[#15136f] text-[15px]">Admin Decision</h2>

            <p className="mt-1 text-[#5d6280] text-[11px]">
              Review the company information and verification documents before taking an action.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            onClick={handleApprove}
            className="h-10 w-full gap-2 bg-[#2720a8] text-white hover:bg-[#15136f]"
          >
            <Check className="size-4" />
            Approve Company
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setRejectDialogOpen(true)}
            className="h-10 w-full gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-600"
          >
            <X className="size-4" />
            Reject Company
          </Button>
        </div>
      </div>

      <RejectCompanyDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen} companyName={company.name} />
    </>
  );
}

"use client";

import * as React from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface RejectCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  companyName: string;
}

export function RejectCompanyDialog({ open, onOpenChange, companyName }: RejectCompanyDialogProps) {
  const [rejectionReason, setRejectionReason] = React.useState("");

  function handleReject() {
    if (!rejectionReason.trim()) {
      return;
    }

    console.log("Reject company:", companyName, rejectionReason);

    onOpenChange(false);

    setRejectionReason("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-[#15136f]">Reject Company Verification</DialogTitle>

          <DialogDescription>
            Provide the reason for rejecting {companyName}. This message will be visible to the supplier.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label htmlFor="rejection-reason" className="font-semibold text-[#11163d] text-[13px]">
            Rejection Reason *
          </label>

          <Textarea
            id="rejection-reason"
            value={rejectionReason}
            onChange={(event) => setRejectionReason(event.target.value)}
            placeholder="Explain why this company cannot be approved..."
            className="min-h-[130px]"
          />

          {rejectionReason && (
            <div className="rounded-[8px] bg-[#fff7f7] p-3">
              <p className="font-semibold text-[#d92d20] text-[11px]">Message sent to supplier</p>

              <p className="mt-1 text-[#5d6280] text-[12px]">{rejectionReason}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button variant="destructive" disabled={!rejectionReason.trim()} onClick={handleReject} className="gap-2">
            <X className="size-4" />
            Reject Company
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

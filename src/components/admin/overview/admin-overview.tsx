"use client";

import { Building2, CalendarDays, Clock3, MessagesSquare, Package, Users } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

import { recentCompanies, recentInquiries, recentProducts } from "./overview-data";
import { OverviewMiniTable } from "./overview-mini-table";
import { OverviewStatCard } from "./overview-stat-card";
import { PlatformGrowthChart } from "./platform-growth-chart";
import { UserDistributionChart } from "./user-distribution-chart";

export function AdminOverview() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Admin Overview"
        description="Welcome back! Here's what's happening on CoolerGuru today."
        action={
          <Button
            variant="outline"
            className="h-[42px] min-w-[255px] justify-between border-[#dcddef] bg-white px-4 font-semibold text-[#15136f] text-[12px]"
          >
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4 text-[#2720a8]" />
              May 01, 2025 - May 31, 2025
            </span>

            <span>⌄</span>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
        <OverviewStatCard
          title="Total Companies"
          value="642"
          icon={Building2}
          iconVariant="blue"
          trend="12%"
          subtitle="+ 68 this month"
        />

        <OverviewStatCard
          title="Pending Company Approvals"
          value="12"
          icon={Clock3}
          iconVariant="orange"
          subtitle="Awaiting review"
        />

        <OverviewStatCard
          title="Total Products"
          value="1,842"
          icon={Package}
          iconVariant="purple"
          trend="8%"
          subtitle="+ 136 this month"
        />

        <OverviewStatCard
          title="Pending Product Approvals"
          value="28"
          icon={Clock3}
          iconVariant="orange"
          subtitle="Awaiting review"
        />

        <OverviewStatCard
          title="Total Users"
          value="3,126"
          icon={Users}
          iconVariant="blue"
          trend="15%"
          subtitle="+ 407 this month"
        />

        <OverviewStatCard
          title="Total Inquiries"
          value="1,085"
          icon={MessagesSquare}
          iconVariant="green"
          trend="22%"
          subtitle="+ 195 this month"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-[1.7fr_1fr]">
        <PlatformGrowthChart />

        <UserDistributionChart />
      </div>

      <div className="grid grid-cols-3 gap-4 xl:grid-cols-3">
        <OverviewMiniTable
          title="Recent Company Registrations"
          viewAllHref="/admin/companies"
          columns={[
            {
              key: "company",
              label: "Company Name",
              className: "font-medium text-[#15136f]",
            },
            {
              key: "location",
              label: "Location",
            },
            {
              key: "date",
              label: "Date",
            },
            {
              key: "status",
              label: "Status",
            },
          ]}
          data={recentCompanies}
        />

        <OverviewMiniTable
          title="Recent Product Submissions"
          viewAllHref="/admin/products"
          columns={[
            {
              key: "product",
              label: "Product Name",
              className: "font-medium text-[#15136f]",
            },
            {
              key: "company",
              label: "Company",
            },
            {
              key: "date",
              label: "Date",
            },
            {
              key: "status",
              label: "Status",
            },
          ]}
          data={recentProducts}
        />

        <OverviewMiniTable
          title="Recent Inquiries"
          viewAllHref="/admin/inquiries"
          columns={[
            {
              key: "inquiry",
              label: "Inquiry ID",
              className: "font-medium text-[#15136f]",
            },
            {
              key: "buyer",
              label: "Buyer",
            },
            {
              key: "company",
              label: "Company",
            },
            {
              key: "date",
              label: "Date",
            },
            {
              key: "status",
              label: "Status",
            },
          ]}
          data={recentInquiries}
        />
      </div>
    </div>
  );
}

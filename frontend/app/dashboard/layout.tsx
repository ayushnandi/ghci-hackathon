"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, SidebarConfig } from "@/components/common/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";
import LanguageDropdown from "@/components/shadcn-studio/blocks/dropdown-language";
import ProfileDropdown from "@/components/shadcn-studio/blocks/dropdown-profile";

import {
  ChartNoAxesCombinedIcon,
  UserIcon,
  LandmarkIcon,
  TrendingUpIcon,
  SettingsIcon,
  SlidersIcon,
  PiggyBankIcon,
} from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";

const sidebarItems: SidebarConfig[] = [
  {
    type: "item",
    title: "Dashboard",
    href: "/dashboard",
    icon: ChartNoAxesCombinedIcon,
  },
  {
    type: "item",
    title: "Account",
    href: "/dashboard/account/user-data",
    icon: UserIcon,
  },
  {
    type: "group",
    label: "Net Banking",
    items: [
      {
        type: "item",
        title: "Loans",
        href: "/dashboard/loans",
        icon: LandmarkIcon,
      },
      {
        type: "item",
        title: "Deposits",
        href: "/dashboard/net-banking/deposits",
        icon: PiggyBankIcon,
      },
      {
        type: "item",
        title: "Investments",
        href: "/dashboard/investments",
        icon: TrendingUpIcon,
      },
    ],
  },
  {
    type: "group",
    label: "Alerts & Reminders",
    items: [
      {
        type: "item",
        title: "Reminders",
        href: "/dashboard/reminders",
        icon: LandmarkIcon,
      },
      {
        type: "item",
        title: "Alerts",
        href: "/dashboard/alerts",
        icon: PiggyBankIcon,
      },
    ],
  },
  {
    type: "item",
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    type: "item",
    title: "Settings & Integrations",
    href: "/dashboard/settings-integrations",
    icon: SlidersIcon,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <SidebarProvider>
        <AppSidebar items={sidebarItems} />

        <div className="flex flex-1 flex-col">
          <header className="bg-card sticky top-0 z-50 border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="[&_svg]:!size-5" />
                <Separator
                  orientation="vertical"
                  className="hidden !h-4 sm:block"
                />
                <DashboardBreadcrumbs />
              </div>

              <div className="flex items-center gap-1.5">
                <LanguageDropdown
                  trigger={
                    <Button variant="ghost" size="icon">
                      <svg className="size-5" />
                    </Button>
                  }
                />

                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>

          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BrosBankLogo } from "../icons/brosbank-logo";

export type SingleItem = {
  type: "item";
  title: string;
  href: string;
  icon: React.ComponentType<any>;
};

export type GroupItem = {
  type: "group";
  label: string;
  items: SingleItem[];
};

export type SidebarConfig = SingleItem | GroupItem;

export function AppSidebar({ items }: { items: SidebarConfig[] }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="py-6">
        {/* APP NAME */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="mb-3">
            <Link href="/">
              <BrosBankLogo className="w-24 h-24" />
              <span className="text-[25px] font-semibold">FinChorus</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* SINGLE ITERATION */}
        <div className="" />
        {items.map((entry, index) => {
          if (entry.type === "item") {
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild isActive={pathname === entry.href}>
                  <Link className="" href={entry.href}>
                    <entry.icon className="size-4" />
                    <span>{entry.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // GROUP
          return (
            <SidebarGroup key={entry.label + index}>
              <SidebarGroupLabel className="mt-2 text-sm">
                {entry.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {entry.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                      >
                        <Link className="" href={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}

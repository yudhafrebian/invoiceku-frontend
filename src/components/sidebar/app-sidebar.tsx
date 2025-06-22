"use client";

import {
  Settings,
  LayoutDashboard,
  Users,
  Boxes,
  ReceiptText,
  LogOut,
  User2,
  ChevronsUpDown,
  Verified,
  CalendarSync,
} from "lucide-react";
import { useMediaQuery } from "@react-hookz/web";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setLogout } from "@/utils/redux/features/authSlice";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: Users,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Boxes,
  },
  {
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: ReceiptText,
  },
  {
    title: "Recurring Invoices",
    url: "/dashboard/recurring-invoices",
    icon: CalendarSync,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarHeader className="py-4">
            <div className="flex items-center gap-2">
              <Image
                src="/invoiceku-logo.png"
                width={150}
                height={32}
                alt="InvoiceKu Logo"
              />
            </div>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link
                      href={item.url}
                      className={pathname === item.url ? "font-semibold" : ""}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

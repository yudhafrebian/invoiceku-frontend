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
import {useMediaQuery} from "@react-hookz/web"

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
    title: "Reccuring Invoices",
    url: "/dashboard/reccuring-invoices",
    icon: CalendarSync,
  },
];

export function AppSidebar() {
  const [openSignOut, setOpenSignOut] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => {
    return state.authState;
  });
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 639px)");

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarHeader></SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url} className={pathname === item.url ? "font-semibold" : ""}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SidebarMenuButton
                  asChild
                  className="cursor-pointer py-6 w-60"
                >
                  <div>
                    <Image
                      src={user.profile_img || "/user.png"}
                      alt="logo"
                      width={32}
                      height={32}
                    />
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col">
                        <span>{`${user.first_name} ${user.last_name}`}</span>
                        <span className="text-xs font-light">{user.email}</span>
                      </div>
                      <ChevronsUpDown size={16} />
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side={isMobile ? "top" : "right"} align="start" className="p-2 w-72 bg-[#fafafa]">
                <DropdownMenuGroup>
                  <div className="flex items-center gap-2 py-1">
                    <Avatar>
                      <AvatarImage
                        src={user.profile_img || "/user.png"}
                        alt="logo"
                      />
                      <AvatarFallback>{user.first_name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p>{`${user.first_name} ${user.last_name}`}</p>
                      <p className="text-xs font-light">{user.email}</p>
                    </div>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <User2 size={16} />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Verified size={16} />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings size={16} />
                    <span>Setting</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut size={16} className="text-destructive" />
                  <span
                    onClick={() => setOpenSignOut(true)}
                    className="cursor-pointer"
                  >
                    Sign Out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={openSignOut} onOpenChange={setOpenSignOut}>
              <DialogContent>
                <DialogHeader className="text-left">
                  <DialogTitle>Sign Out</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to Sign Out?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => {
                      dispatch(setLogout());
                      window.localStorage.removeItem("token");
                      router.replace("/auth/sign-in");
                    }}
                    variant={"destructive"}
                  >
                    Sign Out
                  </Button>
                  <Button
                    onClick={() => setOpenSignOut(false)}
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

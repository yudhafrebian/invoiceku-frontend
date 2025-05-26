import { Calendar, Home, Inbox, Search, Settings, LayoutDashboard, Users, Boxes, ReceiptText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" >
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>InvoiceKu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-semibold">
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
    </Sidebar>
  )
}

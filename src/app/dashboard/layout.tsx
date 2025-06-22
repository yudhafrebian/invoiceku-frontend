import { Metadata } from "next";
import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ReactNode } from "react";
import DashboardNavbar from "@/components/core/DashboardNavbar";

export const metadata: Metadata = {
  title: "Dashboard | InvoiceKu",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center justify-between bg-white dark:bg-background text-foreground border-b-2 px-4 py-2">
          <SidebarTrigger className="cursor-pointer" />
          <DashboardNavbar />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}

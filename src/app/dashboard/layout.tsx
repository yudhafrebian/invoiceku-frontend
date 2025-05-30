// app/dashboard/clients/layout.tsx

import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/core/navbar";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main>
        <div>
          <SidebarTrigger className="cursor-pointer" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}

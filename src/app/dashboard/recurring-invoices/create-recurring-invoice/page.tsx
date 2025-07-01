"use client";
import { useAppSelector } from "@/app/hook";
import { withAuth } from "@/hoc/withAuth";
import CreateRecurringInvoiceForm from "@/view/components/recurring-invoice/CreateRecurringInvoiceForm";
import { useRouter } from "next/navigation";
import * as React from "react";

const CreateRecurringInvoicePage = () => {
  const user = useAppSelector((state) => state.authState);
  const router = useRouter();

  React.useEffect(() => {
    if (!user.is_verified) {
      router.push("/dashboard/recurring-invoices");
    }
  }, [user.is_verified, router]);

  if (!user.is_verified) return null;
  return (
    <div className="p-4 md:p-10 flex flex-col gap-4">
      <h1 className="font-bold text-lg md:text-2xl text-primary">
        Create Recurring Invoice Page
      </h1>
      <div>
        <CreateRecurringInvoiceForm />
      </div>
    </div>
  );
};

export default withAuth(CreateRecurringInvoicePage);

"use client";
import { withAuth } from "@/hoc/withAuth";
import CreateRecurringInvoiceForm from "@/view/components/recurring-invoice/CreateRecurringInvoiceForm";
import * as React from "react";

const CreateRecurringInvoicePage = () => {
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

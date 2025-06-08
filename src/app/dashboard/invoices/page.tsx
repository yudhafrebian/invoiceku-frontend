"use client";
import { withAuth } from "@/hoc/withAuth";
import * as React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { apiCall } from "@/utils/apiHelper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IInvoiceProps {}

const Invoices: React.FunctionComponent<IInvoiceProps> = (props) => {
  const [data, setData] = React.useState<any[]>([]);
  const [refresh, setRefresh] = React.useState(false);

  const getInvoice = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get("/invoice/all-invoice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedData = response.data.data.map((invoice: any) => ({
        id: invoice.id,
        client: invoice.clients?.name || "Unknown",
        invoice_number: invoice.invoice_number,
        start_date: new Date(invoice.start_date).toLocaleDateString(),
        due_date: new Date(invoice.due_date).toLocaleDateString(),
        total: invoice.total,
        payment_method: invoice.payment_method,
        status: invoice.status,
      }));


      setData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getInvoice();
  }, [refresh]);
  return (
    <div className="p-4 md:p-10 flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-lg md:text-2xl text-primary">
          Manage Invoices
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Here you can manage your invoices
        </p>
      </div>
      <div className="flex justify-end">
        <Link href={"/dashboard/invoices/create-invoice"}>
        <Button type="button">Create Invoice</Button>
        </Link>
      </div>
      <DataTable columns={columns(setRefresh)} data={data} />
    </div>
  );
};

export default withAuth(Invoices);

"use client";
import { withAuth } from "@/hoc/withAuth";
import * as React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { apiCall } from "@/utils/apiHelper";

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

      console.log(response.data.data);
      setData(response.data.data);
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
      <DataTable columns={columns(setRefresh)} data={data} />
    </div>
  );
};

export default withAuth(Invoices);

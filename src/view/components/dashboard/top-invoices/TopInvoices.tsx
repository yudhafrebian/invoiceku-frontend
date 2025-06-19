"use client";
import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { apiCall } from "@/utils/apiHelper";

const TopInvoices = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchSummary = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get("/dashboard/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedData = response.data.data.invoices.map((invoice: any) => ({
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

  useEffect(() => {
    fetchSummary();
  }, []);
  return <DataTable columns={columns} data={data} />;
};

export default TopInvoices;

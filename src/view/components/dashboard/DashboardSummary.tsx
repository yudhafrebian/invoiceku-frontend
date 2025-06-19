"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiCall } from "@/utils/apiHelper";
import { CircleCheck, CircleX, ClockAlert, HandHelping, Hourglass, ReceiptText } from "lucide-react";
import { useState, useEffect } from "react";

interface ISummary {
  clients: {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    payment_ref: string;
  }[];
  products: {
    id: number;
    name: string;
    description: string;
    type: string;
    unit: string;
    price: number;
  }[];
  invoiceSummary: {
    confirmatingInvoice: number;
    overdueInvoice: number;
    paidInvoice: number;
    pendingInvoice: number;
    rejectedInvoice: number;
    totalInvoice: number;
  };
}

const DashboardSummary = () => {
  const [data, setData] = useState<ISummary | null>(null);

  const fetchSummary = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get("/dashboard/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-lg">
            Total Invoices <ReceiptText className="text-indigo-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">{data?.invoiceSummary.totalInvoice || 0}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-lg">
            Invoice Pending <Hourglass className="text-amber-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">{data?.invoiceSummary.pendingInvoice || 0}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-lg">
            Invoice Confirm <HandHelping className="text-blue-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">{data?.invoiceSummary.confirmatingInvoice || 0}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-lg">
            Invoice Rejected <CircleX className="text-red-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">{data?.invoiceSummary.rejectedInvoice || 0}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-lg">
            Invoice Overdue <ClockAlert className="text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">{data?.invoiceSummary.overdueInvoice || 0}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-lg">
            Invoice Paid <CircleCheck className="text-green-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">{data?.invoiceSummary.paidInvoice || 0}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;

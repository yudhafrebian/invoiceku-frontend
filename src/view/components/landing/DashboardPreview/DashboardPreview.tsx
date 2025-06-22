"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleCheck,
  CircleX,
  ClockAlert,
  HandHelping,
  Hourglass,
  ReceiptText,
} from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { motion } from "framer-motion";

const DashboardPreview = () => {
  const data = [
    {
      id: "1",
      invoice_number: "INV-001",
      client_name: "Ananda Yudha Frebiansyah",
      start_date: "2025/06/20",
      due_date: "2025/06/21",
      status: "Overdue",
      payment_method: "Bank Transfer",
      total: 6000000,
    },
    {
      id: "2",
      invoice_number: "INV-002",
      client_name: "Michael Thompson",
      start_date: "2025/06/15",
      due_date: "2025/06/22",
      status: "Paid",
      payment_method: "Shopeepay",
      total: 3500000,
    },
    {
      id: "3",
      invoice_number: "INV-003",
      client_name: "Sarah Johnson",
      start_date: "2025/06/10",
      due_date: "2025/06/17",
      status: "Pending",
      payment_method: "Gopay",
      total: 4200000,
    },
    {
      id: "4",
      invoice_number: "INV-004",
      client_name: "David Smith",
      start_date: "2025/06/05",
      due_date: "2025/06/12",
      status: "Paid",
      payment_method: "Bank Transfer",
      total: 2900000,
    },
    {
      id: "5",
      invoice_number: "INV-005",
      client_name: "Emma Wilson",
      start_date: "2025/06/01",
      due_date: "2025/06/08",
      status: "Overdue",
      payment_method: "Dana",
      total: 5100000,
    },
  ];

  return (
    <div className="p-8 md:p-20 w-full bg-[#F9FAFB] dark:bg-background dark:border-y dark:border-muted">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-5">
          Clean & Intuitive Dashboard
        </h1>
        <p className="text-muted-foreground md:text-lg">
          See how easy it is to manage your invoices
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col mx-auto gap-6 md:gap-12 md:w-3/4 p-2 md:p-8 bg-card dark:shadow-white/10 rounded-2xl shadow-2xl mt-8 md:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-3 md:p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center justify-between gap-2 text-sm md:text-lg">
                  Total Invoices <ReceiptText className="text-indigo-700" />
                </CardTitle>
              </CardHeader>
              <CardContent className="md:px-0">
                <p className="md:text-2xl font-bold">25</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center justify-between gap-2 text-sm md:text-lg">
                  Invoice Pending <Hourglass className="text-amber-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="md:px-0">
                <p className="md:text-2xl font-bold">6</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center justify-between gap-2 text-sm md:text-lg">
                  Invoice Confirm <HandHelping className="text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="md:px-0">
                <p className="md:text-2xl font-bold">3</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center justify-between gap-2 text-sm md:text-lg">
                  Invoice Rejected <CircleX className="text-red-700" />
                </CardTitle>
              </CardHeader>
              <CardContent className="md:px-0">
                <p className="md:text-2xl font-bold">2</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center justify-between gap-2 text-sm md:text-lg">
                  Invoice Overdue <ClockAlert className="text-red-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="md:px-0">
                <p className="md:text-2xl font-bold">4</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center justify-between gap-2 text-sm md:text-lg">
                  Invoice Paid <CircleCheck className="text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="md:px-0">
                <p className="md:text-2xl font-bold">10</p>
              </CardContent>
            </Card>
          </div>

          <DataTable data={data} columns={columns} />
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPreview;

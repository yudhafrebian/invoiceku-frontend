"use client";
import PortalNavbar from "@/components/core/PortalNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { transactionSchema } from "@/schemas/transaction-schema";
import { apiCall } from "@/utils/apiHelper";
import { Form, Formik, FormikProps } from "formik";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IInvoicePaymentPortalProps {
  params: Promise<{ slug: string }>;
}

interface IFormValue {
  payment_proof: File | null;
}

interface IDetail {
  id: string;
  invoice_number: string;
  start_date: Date;
  due_date: Date;
  total: number;
  payment_method: string;
  status: string;
  clients: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    payment_ref: string;
  };
  invoice_items: {
    id: string;
    invoice_id: string;
    product_id: string;
    name_snapshot: string;
    price_snapshot: number;
    description: string;
    quantity: number;
    total: number;
  }[];
}

const InvoicePaymentPortal: React.FunctionComponent<
  IInvoicePaymentPortalProps
> = (props) => {
  const [data, setData] = useState<IDetail | null>(null);

  const queryParams = useSearchParams();
  const token = queryParams.get("tkn");

  if (!token) {
    redirect("/unauthorized");
  }

  const formatMethod = (method: string) => {
    if (method === "Qris") return "QRIS";
    return method
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getDetailInvoice = async () => {
    try {
      const invoiceNumber = await props.params;
      const response = await apiCall.get(
        `/invoice/detail-payment/${invoiceNumber.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: IFormValue) => {
    try {
      const formData = new FormData();

      if (values.payment_proof) {
        formData.append("payment_proof", values.payment_proof);
      }

      const response = await apiCall.post(
        `/transaction/create-transaction/${data?.invoice_number}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      toast.success("Transaction Created", {
        description: response.data.message,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailInvoice();
  }, []);
  return (
    <main>
      <PortalNavbar name={data ? data.clients.name : "Loading..."} />
      <div className="w-full h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Invoice Payment Portal</CardTitle>
            <CardDescription>Invoice #{data?.invoice_number}</CardDescription>
          </CardHeader>
          <div className="p-6 space-y-4 text-sm text-gray-700">
            <div>
              <p>
                <strong>Client Name:</strong> {data?.clients.name}
              </p>
              <p>
                <strong>Email:</strong> {data?.clients.email}
              </p>
              <p>
                <strong>Phone:</strong> {data?.clients.phone}
              </p>
              <p>
                <strong>Address:</strong> {data?.clients.address}
              </p>
              <p>
                <strong>Status:</strong> {data?.status}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {data?.due_date
                  ? new Date(data.due_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mt-4">Items</h4>
              <ul className="divide-y divide-gray-200">
                {data?.invoice_items.map((item) => (
                  <li key={item.id} className="py-2 flex justify-between">
                    <span>
                      {item.name_snapshot} ({item.quantity}x)
                    </span>
                    <span>Rp{item.total.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between border-t pt-4 font-bold text-lg">
              <span>Total</span>
              <span>Rp{data?.total.toLocaleString()}</span>
            </div>

            <div className="mt-6">
              <p>
                <strong>Payment Method:</strong> {formatMethod(data?.payment_method || "Loading...")}
              </p>
              <Formik
                initialValues={{
                  payment_proof: null as File | null,
                }}
                validationSchema={transactionSchema}
                onSubmit={(values: IFormValue) => {
                  console.log(values);
                  onSubmit(values);
                }}
              >
                {(props: FormikProps<IFormValue>) => {
                  const {
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                  } = props;
                  return (
                    <Form className={`${data?.status === "Confirmating" && "hidden"}`}>
                      <div className="md:w-3/4 mx-auto">
                        <Input
                          type="file"
                          id="payment_proof"
                          accept="image/*"
                          onChange={(e) =>
                            setFieldValue("payment_proof", e.target.files?.[0])
                          }
                          onBlur={handleBlur}
                          className={
                            errors.payment_proof && touched.payment_proof
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {errors.payment_proof && touched.payment_proof && (
                          <p className="text-red-500 text-xs">
                            {errors.payment_proof}
                          </p>
                        )}
                      </div>

                      <div className="text-center mt-4">
                        <Button type="submit">Submit</Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              {data?.status === "Confirmating" && (
                <div className="text-center mt-4 text-blue-500 text-lg font-semibold">
                  <p>Your payment is being processed</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default InvoicePaymentPortal;

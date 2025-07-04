// file: app/(portal)/invoice/[slug]/view.tsx
"use client";
import PortalNavbar from "@/components/core/PortalNavbar";
import InvoicePaymentSkeleton from "@/components/skeleton/InvoicePaymentSkeleton";
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
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { DataTable } from "@/app/payment/[slug]/data-table";
import { columns } from "@/app/payment/[slug]/columns";

interface IInvoicePaymentPortal {
  params: Promise<{ slug: string }>;
}

interface IFormValue {
  payment_proof: File | null;
}

interface IDetail {
  invoice: {
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
  };
  userPaymentMethod: {
    account_name: string;
    account_number: number;
    payment_method: string;
    qris_image_url: string | null;
  };
}

const InvoicePaymentPortal: React.FunctionComponent<IInvoicePaymentPortal> = (props) => {
  const [data, setData] = useState<IDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
        `invoice/detail-payment/${invoiceNumber.slug}?tkn=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: IFormValue) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (values.payment_proof) {
        formData.append("payment_proof", values.payment_proof);
      }

      const response = await apiCall.post(
        `/transaction/create-transaction/${data?.invoice.invoice_number}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Transaction Created", {
        description: response.data.message,
      });
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailInvoice();
  }, []);

  return (
    <main>
      <PortalNavbar
        name={
          data ? data.invoice.clients.name : <Skeleton className="w-32 h-6" />
        }
      />
      {!data ? (
        <InvoicePaymentSkeleton />
      ) : (
       <div className="w-full  p-4 md:p-20 bg-[#F8FAFC] dark:bg-background flex items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Invoice Payment Portal</CardTitle>
              <CardDescription>
                Invoice #{data?.invoice.invoice_number}
              </CardDescription>
            </CardHeader>
            <div className="p-6 space-y-4 text-sm text-foreground">
              <div>
                <p>
                  <strong>Client Name:</strong> {data?.invoice.clients.name}
                </p>
                <p>
                  <strong>Email:</strong> {data?.invoice.clients.email}
                </p>
                <p>
                  <strong>Phone:</strong> {data?.invoice.clients.phone}
                </p>
                <p>
                  <strong>Address:</strong> {data?.invoice.clients.address}
                </p>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {data?.invoice.due_date
                    ? new Date(data.invoice.due_date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {data?.invoice.status === "Pending" ? (
                    <Badge
                      variant="outline"
                      className="text-orange-400 border-orange-400"
                    >
                      Pending
                    </Badge>
                  ) : data?.invoice.status === "Overdue" ? (
                    <Badge variant="destructive">Overdue</Badge>
                  ) : data?.invoice.status === "Confirmating" ? (
                    <Badge
                      variant="outline"
                      className="text-blue-400 border-blue-400"
                    >
                      Confirmating
                    </Badge>
                  ) : data?.invoice.status === "Rejected" ? (
                    <Badge
                      variant="outline"
                      className="text-red-400 border-red-400"
                    >
                      Rejected
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-green-400 border-green-400"
                    >
                      Paid
                    </Badge>
                  )}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mt-4">Items</h4>
                <DataTable
                  columns={columns}
                  data={data.invoice.invoice_items}
                />
              </div>

              <div className="flex justify-between border-t pt-4 font-bold text-lg">
                <span>Total</span>
                <span>Rp{data?.invoice.total.toLocaleString()}</span>
              </div>

              <div className="my-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {formatMethod(data?.invoice.payment_method || "Loading...")}
                  </p>
                  <p>
                    <strong>Account Name:</strong>{" "}
                    {data?.userPaymentMethod.account_name || "Loading..."}
                  </p>
                  <p>
                    <strong>Account Number:</strong>{" "}
                    {data?.userPaymentMethod.account_number || "Loading..."}
                  </p>
                  {data.userPaymentMethod.qris_image_url && (
                    <Image
                      src={data.userPaymentMethod.qris_image_url}
                      className="mx-auto"
                      alt="qris"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <Separator />
                <Formik
                  initialValues={{
                    payment_proof: null as File | null,
                  }}
                  validationSchema={transactionSchema}
                  onSubmit={(values: IFormValue) => {
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
                      <Form
                        className={`${
                          data?.invoice.status !== "Pending" && "hidden"
                        }`}
                      >
                        <div className="md:w-3/4 mx-auto">
                          <Label htmlFor="payment_proof" className="mb-2">
                            Upload Payment Proof
                          </Label>
                          <Input
                            type="file"
                            id="payment_proof"
                            accept="image/*"
                            onChange={(e) =>
                              setFieldValue(
                                "payment_proof",
                                e.target.files?.[0]
                              )
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
                        {loading ? (
                            <Button disabled><Loader2 className="mr-2 animate-spin" /> Submitting ...</Button>
                          ): (
                            <Button type="submit">Submit</Button>
                          )}
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
                {data?.invoice.status === "Confirmating" && (
                  <div className="text-center mt-4 text-blue-500 text-lg font-semibold">
                    <p>Your payment is being processed</p>
                  </div>
                )}
                {data?.invoice.status === "Paid" && (
                  <div className="text-center mt-4 text-green-500 text-lg font-semibold">
                    <p>Payment Confirmed</p>
                  </div>
                )}
                {data?.invoice.status === "Rejected" && (
                  <div className="text-center mt-4 text-red-500 text-lg font-semibold">
                    <p>Payment Rejected</p>
                    <p className="text-sm text-muted-foreground">
                      Please contact the invoice owner
                    </p>
                  </div>
                )}
                {data?.invoice.status === "Overdue" && (
                  <div className="text-center mt-4 text-red-500 text-lg font-semibold">
                    <p>Payment Overdue</p>
                    <p className="text-sm text-muted-foreground">
                      Please contact the invoice owner
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
};

export default InvoicePaymentPortal;

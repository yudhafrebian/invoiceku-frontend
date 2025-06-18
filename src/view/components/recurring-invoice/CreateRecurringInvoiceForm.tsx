"use client";
import ClientSelector from "@/components/selector/ClientSelector";
import PaymentMethodSelector from "@/components/selector/PaymentMethodSelector";
import ProductSelector from "@/components/selector/ProductSelector";
import ProductSelectorRecurring from "@/components/selector/ProductSelectorRecurring";
import RecurringTypeSelector from "@/components/selector/RecurringType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { invoiceSchema } from "@/schemas/invoice-schema";
import { recurringInvoiceSchema } from "@/schemas/recurring-invoice-schema";
import { apiCall } from "@/utils/apiHelper";
import { Field, FieldArray, Form, Formik, FormikProps } from "formik";
import { Info, Plus, Search, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IFormValue {
  client_id: string;
  invoice_number: string;
  start_date: Date;
  notes?: string;
  recurrence_type: string;
  recurrence_interval: number;
  duration: number;
  due_in_days: number;
  total: number;
  payment_method: string;
  recurring_invoice_items: {
    product_id: number;
    name_snapshot: string;
    price_snapshot: number;
    quantity: number;
    total: number;
  }[];
}

const CreateRecurringInvoiceForm = () => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = async (values: IFormValue) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.post("/recurring-invoice/create", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Invoice Created", {
        description: response.data.message,
      });
      router.replace("/dashboard/recurring-invoices");
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to create invoice", {
        description: error.response.data.error,
      });
    }
  };

  return (
    <Formik<IFormValue>
      initialValues={{
        client_id: "",
        invoice_number: "",
        start_date: new Date(),
        recurrence_interval: 1,
        recurrence_type: "",
        duration: 1,
        due_in_days: 1,
        notes: "",
        total: 0,
        payment_method: "",
        recurring_invoice_items: [],
      }}
      validationSchema={recurringInvoiceSchema}
      onSubmit={(values) => {
        console.log(values);
        onSubmit(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        } = props;

        useEffect(() => {
          const totalAmount = values.recurring_invoice_items.reduce(
            (acc, item) => acc + item.price_snapshot * item.quantity,
            0
          );
          setFieldValue("total", totalAmount);
        }, [values.recurring_invoice_items]);

        useEffect(() => {
          const generatePreview = async () => {
            try {
              const token = window.localStorage.getItem("token");

              const response = await apiCall.post(
                "/recurring-invoice/preview",
                {
                  ...values,
                  start_date: values.start_date.toISOString(),
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  responseType: "blob",
                }
              );
              console.log(response);

              const blob = new Blob([response.data], {
                type: "application/pdf",
              });
              const url = URL.createObjectURL(blob);
              setPreviewUrl(url);
            } catch (error) {
              console.error("Failed to generate preview:", error);
            }
          };

          const timeout = setTimeout(() => {
            if (values.client_id && values.recurring_invoice_items.length > 0) {
              generatePreview();
            }
          }, 1000);
          return () => clearTimeout(timeout);
        }, [
          values.client_id,
          values.recurrence_type,
          values.invoice_number,
          values.due_in_days,
          values.start_date,
          values.notes,
          values.payment_method,
          values.recurring_invoice_items,
        ]);

        return (
          <Form className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-1/3 bg-white p-4">
                <ClientSelector
                  name="client_id"
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="w-2/3 bg-white p-4">
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="start_date">Invoice Date</Label>
                    <Input
                      type="date"
                      name="start_date"
                      onChange={(e) =>
                        setFieldValue("start_date", new Date(e.target.value))
                      }
                      onBlur={handleBlur}
                    />
                    {touched.start_date && errors.start_date && (
                      <p className="text-red-500 text-xs">
                        {errors.start_date as string}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="due_in_days">Due In Days</Label>
                    <div className="relative w-full">
                      <Input
                        type="number"
                        name="due_in_days"
                        min={1}
                        max={30}
                        defaultValue={1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.due_in_days && errors.due_in_days
                            ? "border-red-500 pr-8"
                            : "pr-8"
                        }
                      />
                      <Tooltip>
                        <TooltipTrigger className="absolute right-2 top-1/2 -translate-y-1/2">
                          <Info size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            The number of days after the invoice date that the
                            invoice is due.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {touched.due_in_days && errors.due_in_days && (
                      <p className="text-red-500 text-xs">
                        {errors.due_in_days}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="recurrence_type">Recurrence Type</Label>
                    <RecurringTypeSelector
                      name="recurrence_type"
                      placeholder="Select Recurrence Type"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="recurrence_interval">
                      Recurrence Interval
                    </Label>
                    <div className="relative w-full">
                      <Input
                        type="number"
                        name="recurrence_interval"
                        min={1}
                        defaultValue={1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.recurrence_interval &&
                          errors.recurrence_interval
                            ? "border-red-500 pr-8"
                            : "pr-8"
                        }
                      />
                      <Tooltip>
                        <TooltipTrigger className="absolute right-2 top-1/2 -translate-y-1/2">
                          <Info size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            The interval at which the recurring invoice will be
                            generated
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {touched.recurrence_interval &&
                      errors.recurrence_interval && (
                        <p className="text-red-500 text-xs">
                          {errors.recurrence_interval}
                        </p>
                      )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="duration">Recurrence Duration</Label>
                    <div className="relative w-full">
                      <Input
                        type="number"
                        name="duration"
                        min={1}
                        defaultValue={1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.duration && errors.duration
                            ? "border-red-500 pr-8"
                            : "pr-8"
                        }
                      />
                      <Tooltip>
                        <TooltipTrigger className="absolute right-2 top-1/2 -translate-y-1/2">
                          <Info size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Number of times the recurring invoice will be
                            generated
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {touched.duration && errors.duration && (
                      <p className="text-red-500 text-xs">{errors.duration}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="invoice_number">Invoice Number</Label>
                    <Input
                      name="invoice_number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.invoice_number && errors.invoice_number
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {touched.invoice_number && errors.invoice_number && (
                      <p className="text-red-500 text-xs">
                        {errors.invoice_number}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-white w-2/3 p-4">
                <FieldArray name="recurring_invoice_items">
                  {({ push, remove }) => (
                    <div>
                      <table className="w-full border mt-4">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="p-2">Item Name</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Unit Cost</th>
                            <th className="p-2 w-1/12">Quantity</th>
                            <th className="p-2">Line Total</th>
                            <th className="p-2">Action</th>
                          </tr>
                        </thead>
                        {}
                        <tbody>
                          {props.values.recurring_invoice_items.map(
                            (item, index) => (
                              <tr key={index}>
                                <td className="p-2 border">
                                  <ProductSelectorRecurring
                                    name={`recurring_invoice_items.${index}.product_id`}
                                    setFieldValue={setFieldValue}
                                    productIndex={index}
                                  />
                                </td>
                                <td className="p-2 border text-right">
                                  <Field
                                    name={`recurring_invoice_items.${index}.description`}
                                    type="text"
                                    className="w-full border p-1 text-right"
                                  />
                                </td>
                                <td className="p-2 border text-right">
                                  <Field
                                    name={`recurring_invoice_items.${index}.price_snapshot`}
                                    type="number"
                                    className="w-full border p-1 text-right"
                                  />
                                </td>
                                <td className="p-2 border text-right">
                                  <Field
                                    name={`recurring_invoice_items.${index}.quantity`}
                                    type="number"
                                    className="w-full border p-1 text-right"
                                  />
                                </td>
                                <td className="p-2 border text-right">
                                  Rp{" "}
                                  {(item.total =
                                    item.price_snapshot *
                                    item.quantity).toLocaleString("id-ID")}
                                </td>
                                <td className="p-2 text-center">
                                  <Button
                                    type="button"
                                    variant={"destructive"}
                                    onClick={() => remove(index)}
                                  >
                                    <Trash2Icon />
                                  </Button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <div className="mt-2 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            push({
                              product_id: "",
                              name_snapshot: "",
                              price_snapshot: 0,
                              description: "",
                              quantity: 1,
                              total: 0,
                            })
                          }
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Add Item
                        </Button>
                      </div>
                      {touched.recurring_invoice_items &&
                        typeof errors.recurring_invoice_items === "string" && (
                          <p className="text-red-500 text-xs">
                            {errors.recurring_invoice_items}
                          </p>
                        )}
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="flex flex-col gap-4 w-1/3">
                <div className="bg-white p-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea name="notes" onChange={handleChange} />
                  </div>
                </div>
                <div className="bg-white p-4 ">
                  <div className="flex justify-between">
                    <Label htmlFor="total">Total</Label>
                    <p id="total" className="font-semibold">
                      Rp{" "}
                      {props.values.recurring_invoice_items
                        .reduce(
                          (acc, item) =>
                            acc + item.price_snapshot * item.quantity,
                          0
                        )
                        .toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="payment_method">Payment Method</Label>
                    <PaymentMethodSelector
                      name="payment_method"
                      placeholder="Select Payment Method"
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <Button type="submit">Save Invoice</Button>
                  <Link href="/dashboard/invoices">
                    <Button variant={"destructive"} type="button">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {previewUrl && (
              <div className="mt-8">
                <h2 className="font-bold text-lg mb-2">Live Invoice Preview</h2>
                <iframe
                  src={previewUrl}
                  width="100%"
                  height="800px"
                  className="border rounded"
                />
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateRecurringInvoiceForm;

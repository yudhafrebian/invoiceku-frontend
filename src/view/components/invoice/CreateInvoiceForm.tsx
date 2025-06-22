"use client";
import ClientSelector from "@/components/selector/ClientSelector";
import PaymentMethodSelector from "@/components/selector/PaymentMethodSelector";
import ProductSelector from "@/components/selector/ProductSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { invoiceSchema } from "@/schemas/invoice-schema";
import { apiCall } from "@/utils/apiHelper";
import { Field, FieldArray, Form, Formik, FormikProps } from "formik";
import { Plus, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IFormValue {
  client_id: string;
  invoice_number: string;
  start_date: Date;
  due_date: Date;
  notes: string;
  total: number;
  payment_method: string;
  invoice_items: {
    product_id: string;
    name_snapshot: string;
    price_snapshot: number;
    description: string;
    quantity: number;
    total: number;
  }[];
}

const CreateInvoiceForm = () => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = async (values: IFormValue) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.post("invoice/create-invoice", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Invoice Created", {
        description: response.data.message,
      });
      router.replace("/dashboard/invoices");
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
        invoice_items: [],
        client_id: "",
        invoice_number: "",
        start_date: new Date(),
        due_date: new Date(),
        notes: "",
        total: 0,
        payment_method: "",
      }}
      validationSchema={invoiceSchema}
      onSubmit={(values) => {
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
          const totalAmount = values.invoice_items.reduce(
            (acc, item) => acc + item.price_snapshot * item.quantity,
            0
          );
          setFieldValue("total", totalAmount);
        }, [values.invoice_items]);

        useEffect(() => {
          const generatePreview = async () => {
            try {
              const token = window.localStorage.getItem("token");
              

              const response = await apiCall.post(
                "invoice/preview",
                {
                  ...values,
                  start_date: values.start_date.toISOString(),
                  due_date: values.due_date.toISOString(),
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  responseType: "blob",
                }
              );

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
            if (values.client_id && values.invoice_items.length > 0) {
              generatePreview();
            }
          }, 1000); 
          return () => clearTimeout(timeout);
        }, [
          values.client_id,
          values.invoice_items,
          values.invoice_number,
          values.start_date,
          values.due_date,
          values.notes,
          values.payment_method,
        ]);

        return (
          <Form className="flex flex-col gap-4">
            <div className="flex md:flex-row flex-col gap-4">
              <div className="md:w-1/3 bg-card text-foreground p-4">
                <ClientSelector
                  name="client_id"
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="md:w-2/3 bg-card p-4">
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
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      type="date"
                      name="due_date"
                      onChange={(e) =>
                        setFieldValue("due_date", new Date(e.target.value))
                      }
                      onBlur={handleBlur}
                    />
                    {touched.due_date && errors.due_date && (
                      <p className="text-red-500 text-xs">
                        {errors.due_date as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
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

            <div className="flex md:flex-row flex-col gap-4">
              <div className="bg-card md:w-2/3 p-4">
                <FieldArray name="invoice_items">
                  {({ push, remove }) => (
                    <div className="w-full overflow-x-auto">
                      <table className="w-full border mt-4 min-w-[800px]">
                        <thead>
                          <tr className="bg-primary dark:bg-card text-white">
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
                          {props.values.invoice_items.map((item, index) => (
                            <tr key={index}>
                              <td className="p-2 border">
                                <ProductSelector
                                  name={`invoice_items.${index}.product_id`}
                                  setFieldValue={setFieldValue}
                                  productIndex={index}
                                />
                              </td>
                              <td className="p-2 border text-right">
                                <Field
                                  name={`invoice_items.${index}.description`}
                                  type="text"
                                  className="w-full border p-1 text-right"
                                />
                              </td>
                              <td className="p-2 border text-right">
                                <Field
                                  name={`invoice_items.${index}.price_snapshot`}
                                  type="number"
                                  className="w-full border p-1 text-right"
                                />
                              </td>
                              <td className="p-2 border text-right">
                                <Field
                                  name={`invoice_items.${index}.quantity`}
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
                          ))}
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
                      {touched.invoice_items &&
                        typeof errors.invoice_items === "string" && (
                          <p className="text-red-500 text-xs">
                            {errors.invoice_items}
                          </p>
                        )}
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="flex flex-col gap-4 md:w-1/3">
                <div className="bg-card p-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea name="notes" onChange={handleChange} />
                  </div>
                </div>
                <div className="bg-card p-4 ">
                  <div className="flex justify-between">
                    <Label htmlFor="total">Total</Label>
                    <p id="total" className="font-semibold">
                      Rp{" "}
                      {props.values.invoice_items
                        .reduce(
                          (acc, item) =>
                            acc + item.price_snapshot * item.quantity,
                          0
                        )
                        .toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="bg-card p-4">
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

export default CreateInvoiceForm;

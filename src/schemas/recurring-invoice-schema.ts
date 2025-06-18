import * as Yup from "yup";

export const recurringInvoiceSchema = Yup.object().shape({
  client_id: Yup.number().required("Client is required"),
  invoice_number: Yup.string().required("Invoice number is required"),
  start_date: Yup.date().required("Start date is required"),
  notes: Yup.string(),
  recurrence_type: Yup.string().required("Recurrence type is required"),
  recurrence_interval: Yup.number()
    .typeError("Recurrence interval must be a number")
    .required("Recurrence interval is required")
    .min(1, "Interval must be at least 1"),
  duration: Yup.number()
    .typeError("Duration must be a number")
    .required("Duration is required")
    .min(1, "Duration must be at least 1"),
  due_in_days: Yup.number()
    .typeError("Due in days must be a number")
    .required("Due in days is required")
    .min(1, "Due in days must be at least 1"),
  total: Yup.number(),
  payment_method: Yup.string().required("Payment method is required"),
  recurring_invoice_items: Yup.array()
    .of(
      Yup.object().shape({
        product_id: Yup.number()
          .typeError("Product is required")
          .required("Product is required"),
        name_snapshot: Yup.string().required("Name snapshot is required"),
        price_snapshot: Yup.number()
          .typeError("Price must be a number")
          .required("Price is required"),
        quantity: Yup.number()
          .typeError("Quantity must be a number")
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
        total: Yup.number()
          .typeError("Total must be a number")
          .required("Total is required"),
      })
    )
    .min(1, "At least one item is required")
    .required("Recurring invoice items are required"),
});

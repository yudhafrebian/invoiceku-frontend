import * as Yup from "yup";

export const invoiceSchema = Yup.object().shape({
  client_id: Yup.string().required("Client is required"),
  invoice_number: Yup.string().required("Invoice number is required"),
  start_date: Yup.date().required("Start date is required"),
  due_date: Yup.date().required("Due date is required"),
  notes: Yup.string(),
  total: Yup.number(),
  payment_method: Yup.string().required("Payment method is required"),
  invoice_items: Yup.array()
    .of(
      Yup.object().shape({
        product_id: Yup.string().required("Product is required"),
        name_snapshot: Yup.string(),
        price_snapshot: Yup.number()
          .typeError("Price must be a number")
          .required("Price is required"),
        description: Yup.string(),
        quantity: Yup.number()
          .typeError("Quantity must be a number")
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
        total: Yup.number(),
      })
    )
    .min(1, "At least one item is required"),
});

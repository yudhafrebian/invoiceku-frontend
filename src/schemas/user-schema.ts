import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const addPaymentMethodSchema = Yup.object().shape({
  account_name: Yup.string().required("Account name is required"),
  account_number: Yup.string().required("Account number is required"),
  payment_method: Yup.string().required("Payment method is required"),
  qris_image_url: Yup.mixed()
  .nullable()
  .test("fileSize", "File too large, max 1MB", (value) => {
    const file = value as File;
    return !value || (file && file.size <= 1 * 1024 * 1024);
  })
  .test("fileType", "Only JPEG, PNG, and JPG files are allowed", (value) => {
    const file = value as File;
    return !value || (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type));
  }),
});
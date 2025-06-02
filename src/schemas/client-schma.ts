import * as Yup from "yup";

export const clientSchema = Yup.object().shape({
    name: Yup.string().required("Client name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.number().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
});
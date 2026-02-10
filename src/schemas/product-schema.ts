import * as Yup from "yup";

export const productSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Product description is required"),
    price: Yup.string().required("Product price is required"),
    type: Yup.string().required("Product type is required"),
    unit: Yup.string().required("Product unit is required"),
});
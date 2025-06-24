import TypeSelector from "@/components/selector/TypeSelector";
import UnitSelector from "@/components/selector/UnitSeletor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/schemas/product-schema";
import { apiCall } from "@/utils/apiHelper";
import { Formik, Form, FormikProps } from "formik";
import { toast } from "sonner";

interface IFormValue {
  name: string;
  description: string;
  price: string;
  type: string;
  unit: string;
}

interface IAddProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const AddProductForm: React.FunctionComponent<IAddProductFormProps> = ({
  onClose,
  onSuccess,
}) => {

  const formatRupiah = (value: string) => {
    const numeric = value.replace(/[^\d]/g, "");
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  

  const addProduct = async (values: IFormValue) => {
    try {
      const cleanPrice = values.price.replace(/\./g, "");
      console.log(typeof cleanPrice);
      const token = window.localStorage.getItem("token");
      const response = await apiCall.post(
        "/product/create-product",
        {
          name: values.name,
          description: values.description,
          price: Number(cleanPrice),
          type: values.type,
          unit: values.unit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Added", {
        description: response.data.message,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: "",
        type: "",
        unit: "",
      }}
      validationSchema={productSchema}
      onSubmit={(values: IFormValue, { resetForm }) => {
        addProduct(values);
        resetForm();
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        return (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    errors.name && touched.name ? "border-red-500" : ""
                  }
                />
                {errors.name && touched.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <div>
                <Textarea
                  id="description"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    errors.description && touched.description
                      ? "border-red-500"
                      : ""
                  }
                />
                {errors.description && touched.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <div>
                <div className="flex items-center gap-x-2">
                  <span className="px-3 py-2 border border-input rounded-md bg-muted text-sm text-muted-foreground">
                    IDR
                  </span>
                  <Input
                    id="price"
                    name="price"
                    type="text"
                    value={props.values.price}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const formatted = formatRupiah(raw);
                      props.setFieldValue("price", formatted);
                    }}
                    className={
                      errors.price && touched.price ? "border-red-500" : ""
                    }
                  />
                </div>

                {errors.price && touched.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="md:w-1/2 flex flex-col gap-2">
                <Label htmlFor="type">Type</Label>
                <TypeSelector name="type" />
              </div>
              <div className="md:w-1/2 flex flex-col gap-2">
                <Label htmlFor="unit">Unit</Label>
                <UnitSelector name="unit" />
              </div>
            </div>

            <Button type="submit">Create</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProductForm;

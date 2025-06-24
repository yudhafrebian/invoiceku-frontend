import TypeSelector from "@/components/selector/TypeSelector";
import UnitSelector from "@/components/selector/UnitSeletor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/schemas/product-schema";
import { apiCall } from "@/utils/apiHelper";
import { Formik, Form, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PRoductFormSkeleton from "./productFormSkeleton";
import ProductFormSkeleton from "./productFormSkeleton";

interface IFormValue {
  name: string;
  description: string;
  price: string;
  type: string;
  unit: string;
}

interface IEditProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  params?: { id: string };
}

const EditProductForm: React.FunctionComponent<IEditProductFormProps> = ({
  onClose,
  onSuccess,
  params,
}) => {
  const [data, setData] = useState<any>({});
  const formatRupiah = (value: string) => {
    const numeric = value.replace(/[^\d]/g, "");
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getDetailProduct = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get(
        `/product/single-product/${params?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = async (values: IFormValue) => {
    try {
      const cleanPrice = values.price.replace(/\./g, "");
      const token = window.localStorage.getItem("token");
      const response = await apiCall.patch(
        `/product/update-product/${params?.id}`,
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

      toast.success("Product Updated", {
        description: response.data.message,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.id) getDetailProduct();
  }, [params?.id]);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: data.name || "",
        description: data.description || "",
        price: data.price ? formatRupiah(data.price.toString()) : "",
        type: data.type || "",
        unit: data.unit || "",
      }}
      validationSchema={productSchema}
      onSubmit={(values: IFormValue) => {
        editProduct(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        if (!data.name) return <ProductFormSkeleton />;
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
                  value={props.values.name}
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
                  value={props.values.description}
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

            <Button type="submit">Update</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditProductForm;

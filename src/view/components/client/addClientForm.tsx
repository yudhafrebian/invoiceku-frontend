import PaymentMethodSelector from "@/components/selector/PaymentMethodSelector";
import TypeSelector from "@/components/selector/TypeSelector";
import UnitSelector from "@/components/selector/UnitSeletor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clientSchema } from "@/schemas/client-schma";
import { productSchema } from "@/schemas/product-schema";
import { apiCall } from "@/utils/apiHelper";
import { Formik, Form, FormikProps } from "formik";
import { toast } from "sonner";

interface IFormValue {
  name: string;
  email: string;
  phone: string;
  address: string;
  payment_ref: string;
}

interface IAddProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const AddClientForm: React.FunctionComponent<IAddProductFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const addClient = async (values: IFormValue) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.post(
        "/client/create-client",
        {
          name: values.name,
          email: values.email,
          phone: `62${values.phone}`,
          address: values.address,
          payment_ref: values.payment_ref,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Client Added", {
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
        email: "",
        phone: "",
        address: "",
        payment_ref: "",
      }}
      validationSchema={clientSchema}
      onSubmit={(values: IFormValue, { resetForm }) => {
        addClient(values);
        // resetForm();
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
              <Label htmlFor="email">Email</Label>
              <div>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    errors.email && touched.email ? "border-red-500" : ""
                  }
                />
                {errors.email && touched.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <div>
                <div className="flex items-center gap-x-2">
                  <span className="px-3 py-2 border border-input rounded-md bg-muted text-sm text-muted-foreground">
                    +62
                  </span>
                  <Input
                    id="phone"
                    name="phone"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={
                      errors.phone && touched.phone ? "border-red-500" : ""
                    }
                  />
                </div>

                {errors.phone && touched.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="payment_ref">Payment Reference</Label>
                <PaymentMethodSelector name="payment_ref" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Address</Label>
                <div>
                  <Textarea
                    id="address"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={
                      errors.address && touched.address ? "border-red-500" : ""
                    }
                  />
                  {errors.address && touched.address && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit">Create</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddClientForm;

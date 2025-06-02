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
import ClientFormSkeleton from "./clientFormSkeleton";
import { clientSchema } from "@/schemas/client-schma";

interface IFormValue {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface IEditClienttFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  params?: { id: string };
}

const EditClientForm: React.FunctionComponent<IEditClienttFormProps> = ({
  onClose,
  onSuccess,
  params,
}) => {
  const [data, setData] = useState<any>({});

  const getDetailClient = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get(
        `/client/single-client/${params?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        setData(response.data.data.client);
    } catch (error) {
      console.log(error);
    }
  };

  const editClient = async (values: IFormValue) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.patch(
        `/client/update-client/${params?.id}`,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Client Updated", {
        description: response.data.message,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.id) getDetailClient();
  }, [params?.id]);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
      }}
      validationSchema={clientSchema}
      onSubmit={(values: IFormValue) => {
        editClient(values);
        console.log(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        if (!data.name) return <ClientFormSkeleton />;
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
              <Label htmlFor="email">email</Label>
              <div>
                <Input
                  id="email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={props.values.email}
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
                    value={props.values.phone.startsWith("62") ? props.values.phone.slice(2) : props.values.phone}
                    className={
                      errors.phone && touched.phone ? "border-red-500" : ""
                    }
                  />
                </div>
                {errors.phone && touched.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <div>
                <Textarea
                  id="address"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={props.values.address}
                  className={
                    errors.address && touched.address ? "border-red-500" : ""
                  }
                />
                {errors.address && touched.address && (
                  <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                )}
              </div>
            </div>

            <Button type="submit">Update</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditClientForm;

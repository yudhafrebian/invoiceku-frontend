"use client";
import PaymentMethodSelector from "@/components/selector/PaymentMethodSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPaymentMethodSchema } from "@/schemas/user-schema";
import { apiCall } from "@/utils/apiHelper";
import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { toast } from "sonner";

interface IEditPaymentMethodFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  params?: { id: number };
}

interface IFormValue {
  account_name: string;
  account_number: string;
  payment_method: string;
  qris_image_url: File | null;
}

const EditPaymentMethodForm: React.FunctionComponent<
  IEditPaymentMethodFormProps
> = ({ onClose, onSuccess, params }) => {
  const [formData, setFormData] = React.useState<IFormValue>({
    account_name: "",
    account_number: "",
    payment_method: "",
    qris_image_url: null,
  });

  const getPaymentMethodDetail = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get(`/user/payment-method/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      setFormData({
        account_name: data.account_name,
        account_number: data.account_number,
        payment_method: data.payment_method,
        qris_image_url: null,
      })
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: IFormValue) => {
    try {
      const token = window.localStorage.getItem("token");
      const formData = new FormData();

      formData.append("account_name", values.account_name);
      formData.append("account_number", values.account_number);
      formData.append("payment_method", values.payment_method);
      if (values.qris_image_url) {
        formData.append("qris_image_url", values.qris_image_url);
      }

      const response = await apiCall.patch(
        `/user/update-payment-method/${params?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Upadate Success", {
        description: response.data.message,
      })
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to add payment method", {
        description: error.response.data.error,
      });
    }
  };

  React.useEffect(() => {
    if (params?.id) {
      getPaymentMethodDetail();
    }
  }, [params]);
  return (
    <Formik
      enableReinitialize
      initialValues={formData}
      validationSchema={addPaymentMethodSchema}
      onSubmit={(values: IFormValue) => {
        onSubmit(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange, setFieldValue } =
          props;
        return (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <PaymentMethodSelector
                name="payment_method"
                placeholder="Select payment method"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="account_name">Account Name</Label>
              <Input
                name="account_name"
                placeholder="Enter your account name"
                defaultValue={formData.account_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.account_name && touched.account_name
                    ? "border-red-500"
                    : ""
                }
              />
              {errors.account_name && touched.account_name && (
                <p className="text-red-500 text-xs">{errors.account_name}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                name="account_number"
                placeholder="Enter your account number"
                defaultValue={formData.account_number}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.account_number && touched.account_number
                    ? "border-red-500"
                    : ""
                }
              />
              {errors.account_number && touched.account_number && (
                <p className="text-red-500 text-xs">{errors.account_number}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="qris_image_url">QRIS Image URL</Label>
              <Input
                name="qris_image_url"
                placeholder="Enter your qris image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("qris_image_url", e.currentTarget.files?.[0])
                }
                onBlur={handleBlur}
                className={
                  errors.qris_image_url && touched.qris_image_url
                    ? "border-red-500"
                    : ""
                }
              />
              {errors.qris_image_url && touched.qris_image_url && (
                <p className="text-red-500 text-xs">{errors.qris_image_url}</p>
              )}
            </div>

            <Button type="submit">Submit</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditPaymentMethodForm;

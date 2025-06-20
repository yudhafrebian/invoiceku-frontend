"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/schemas/auth-schema";
import { apiCall } from "@/utils/apiHelper";
import { Formik, Form, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as React from "react";

interface IFormValue {
  email: string;
}

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [error, setError] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState("");

  const onSubmit = async (values: IFormValue) => {
    try {
      const response = await apiCall.post("/auth/forgot-password", {
        email: values.email,
      });
      router.replace("/auth/forgot-password/success");
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrMessage(error.response.data.error);
    }
  };
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordSchema}
      onSubmit={(values: IFormValue) => {
        onSubmit(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        return (
          <Form>
            <div className="md:w-3/4 mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  (errors.email && touched.email) || error
                    ? "border-red-500"
                    : ""
                }
              />
              {errors.email && touched.email ? (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              ) : error ? (
                <p className="text-xs text-red-500 mt-1">{errMessage}</p>
              ) : null}
            </div>
            <div className="text-center mt-4">
              <Button type="submit">Send Reset Link</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ForgotPasswordForm;

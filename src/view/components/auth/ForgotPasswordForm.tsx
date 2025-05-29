"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/schemas/auth-schema";
import { Formik, Form, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as React from "react";

interface IFormValue {
  email: string;
}

const ForgotPasswordForm = () => {
    const router = useRouter()

    const onSubmit = async (values: IFormValue) => {
        try {
            const response = values.email;

            router.replace("/auth/forgot-password/success");
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordSchema}
      onSubmit={(values: IFormValue) => {
        console.log("Forgot Password Form Submitted", values);
        onSubmit(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        return (
          <Form>
            <div className="w-3/4 mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email ? "border-red-500" : ""
                }
              />
              {errors.email && touched.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="text-center mt-4">
              <Button type="submit" >Send Reset Link</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ForgotPasswordForm;

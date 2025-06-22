"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/schemas/auth-schema";
import { apiCall } from "@/utils/apiHelper";
import { Formik, Form, FormikProps } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface IFormValue {
  password: string;
  confirm_password: string;
}

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const queryParams = useSearchParams();
  const token = queryParams.get("tkn");
  const router = useRouter();

  const onSubmit = async (values: IFormValue) => {
    try {
        const response = await apiCall.patch("/auth/reset-password", {
            password: values.password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        router.replace("/auth/reset-password/success");
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <Formik
      initialValues={{ password: "", confirm_password: "" }}
      validationSchema={resetPasswordSchema}
      onSubmit={(values: IFormValue) => {
        onSubmit(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        return (
          <Form className="flex flex-col mx-auto gap-4 md:w-3/4">
            <div>
              <div className="flex gap-2">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
              {errors.password && touched.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <div className="flex gap-2">
                <Input
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${
                    errors.confirm_password && touched.confirm_password
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <Button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
              {errors.confirm_password && touched.confirm_password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <Button type="submit">Reset Password</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ResetPasswordForm;

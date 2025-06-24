"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/auth-schema";
import { apiCall } from "@/utils/apiHelper";
import { Formik, Form, FormikProps } from "formik";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "../../../app/hook";
import { setLogin } from "@/utils/redux/features/authSlice";

interface IFormValue {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (values: IFormValue) => {
    try {
      setLoading(true);
      const response = await apiCall.post("/auth/signin", values);

      toast.success("Login Success", {
        description: `Welcome ${response.data.data.first_name}`,
      });

      dispatch(setLogin(response.data.data));
      window.localStorage.setItem("token", response.data.data.token);
      router.replace("/dashboard");
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signInSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        return (
          <Form className="flex flex-col gap-2 px-4 md:px-8 h-[17em]">
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    errors.email && touched.email || error ? "border-red-500" : ""
                  }
                />
                {errors.email && touched.email ? (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                ) : error ? (
                  <p className="text-xs text-red-500 mt-1">{errMessage}</p>
                ) : null}
              </div>
              <div>
                <div className="flex gap-2">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={
                      errors.password && touched.password || error
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
                {errors.password && touched.password ? (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                ) : error ? (
                  <p className="text-xs text-red-500 mt-1">{errMessage}</p>
                ) : null}
              </div>
            </div>
            <Link href="/auth/forgot-password">
              <p className="text-sm text-muted-foreground hover:text-primary hover:underline text-right">
                Forgot Password
              </p>
            </Link>
            {loading ? (
              <Button type="button" disabled><Loader2 className="mr-2 animate-spin" /> Signing in ...</Button>
            ) : (
              <Button type="submit">Sign In</Button>
            )
            }
            <div>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-muted-foreground hover:text-primary underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

"use client";
import Navbar from "@/components/core/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/auth-schema";
import { Formik, Form, FormikProps } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface IFormValue {
  email: string;
  password: string;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="h-screen bg-[#fafafa]">
        <Navbar />
        <div className="bg-white w-1/3 h-[27em] m-auto mt-24 rounded-2xl shadow-lg gap-4 p-4 text-primary">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold mb-2">Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Please sign in to enjoy our services
            </p>
          </div>
          <div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={signInSchema}
              onSubmit={(values: IFormValue) => {
                console.log(values);
              }}
            >
              {(props: FormikProps<IFormValue>) => {
                const { errors, touched, handleBlur, handleChange } = props;
                return (
                  <Form className="flex flex-col gap-2 px-8 h-[17em]">
                    <div className="flex flex-col gap-4">
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={`${
                            errors.email && touched.email
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.email && touched.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <div className="flex gap-2">
                          <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`${
                              errors.password && touched.password
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                          <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {" "}
                            {showPassword ? <Eye /> : <EyeOff />}
                          </Button>
                        </div>
                        {errors.password && touched.password && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <Link href="/sign-up">
                      <p className="text-sm text-muted-foreground text-right">
                        Forgot Password
                      </p>
                    </Link>
                    <Button type="submit" className="mt-2">
                      Sign In
                    </Button>
                    <div>
                      <p className="text-sm text-muted-foreground text-center">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="text-primary">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="flex justify-center gap-6 ">
            <Link href="/">
              <p className="text-sm text-muted-foreground hover:text-primary">
                Term of Service
              </p>
            </Link>
            <Link href="/">
              <p className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

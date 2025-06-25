"use client";
import Navbar from "@/components/core/LandingPageNavbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Formik, Form, FormikProps } from "formik";
import { signUpSchema } from "@/schemas/auth-schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { apiCall } from "@/utils/apiHelper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IFormValue {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  confirm_password: string;
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (values: IFormValue) => {
    try {
      setLoading(true);
      const response = await apiCall.post("/auth/signup", {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: String(values.phone),
        password: values.password,
      });

      toast.success("Registration Success", {
        description: "Please check your email to verify your account",
      });

      router.push("/auth/sign-in");
    } catch (error:any) {
      console.log(error);
      toast.error("Registration Failed", {
        description: error.response.data.message,
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={(values: IFormValue) => {
        onSubmit(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleChange, handleBlur } = props;
        console.log(errors);
        return (
          <Form className="flex flex-col gap-4">
            <div className="flex gap-4 md:gap-0 justify-between">
              <div>
                <Input
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${
                    errors.first_name && touched.first_name
                      ? "border-red-500"
                      : ""
                  } `}
                />
                {errors.first_name && touched.first_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${
                    errors.last_name && touched.last_name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {errors.last_name && touched.last_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex items-center gap-x-2">
              <span className="px-3 py-2 border border-input rounded-md bg-muted text-sm text-muted-foreground">
                +62
              </span>
              <Input
                id="phone"
                name="phone"
                type="number"
                onChange={handleChange}
              />
            </div>
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
            {loading ? (
              <Button type="button" disabled><Loader2 className="mr-2 animate-spin" /> Submitting ...</Button>
            ) : (
              <Button type="submit">Sign Up</Button>
            )
            }
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;

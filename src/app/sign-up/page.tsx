"use client";
import Navbar from "@/components/core/navbar";
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
import { ArrowRight, ArrowRightCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface IFormValue {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  confirm_password: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="h-screen bg-[#fafafa]">
      <Navbar />
      <div className="bg-white w-2/3 h-[35em] m-auto mt-16 rounded-2xl shadow-lg flex gap-4 p-4 text-primary">
        <div className="relative h-full w-1/2 bg-[#fafafa] rounded-2xl p-8 ">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 5000 })]}
          >
            <CarouselContent>
              <CarouselItem className="flex flex-col justify-center gap-4">
                <Image
                  src={"undraw_receipt_tzi0.svg"}
                  width={400}
                  height={400}
                  alt=""
                />
                <div className="text-2xl font-semibold text-center">
                  <p>Create your own receipt</p>
                  <p>Easy, fast and secure</p>
                </div>
              </CarouselItem>
              <CarouselItem className="flex flex-col justify-center gap-12">
                <Image src={"payment.svg"} width={400} height={400} alt="" />
                <div className="text-2xl font-semibold text-center">
                  <p>Easy Payment</p>
                  <p>Pay Anywhere With Ease</p>
                </div>
              </CarouselItem>
              <CarouselItem className="flex flex-col justify-center gap-12">
                <Image src={"secure.svg"} width={400} height={400} alt="" />
                <div className="text-2xl font-semibold text-center">
                  <p>100% Secure</p>
                  <p>Your Data Is Safe With Us</p>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        <div className="w-1/2 px-8">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-4xl font-semibold">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link className="underline hover:text-blue-700" href="/sign-in">
                Sign In
              </Link>
            </p>
          </div>
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
              console.log(values);
            }}
          >
            {(props: FormikProps<IFormValue>) => {
              const { errors, touched, handleChange, handleBlur } = props;
              console.log(errors);
              return (
                <Form className="flex flex-col gap-4">
                  <div className="flex justify-between">
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
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <Input
                    name="phone"
                    type="number"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                  <div>
                    <div className="flex gap-2">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
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
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
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
                  <Button type="submit">Sign Up</Button>
                </Form>
              );
            }}
          </Formik>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link className="underline hover:text-blue-700" href="/">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="underline hover:text-blue-700" href="/">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

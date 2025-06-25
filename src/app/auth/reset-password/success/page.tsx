import Navbar from "@/components/core/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface IResetPasswordSuccessPageProps {}

const ResetPasswordSuccessPage: React.FunctionComponent<
  IResetPasswordSuccessPageProps
> = (props) => {
  return (
    <>
      <div className="h-screen bg-[#fafafa] dark:bg-background">
        <Navbar />
        <div className="bg-card w-[90%] md:w-1/3 mx-auto mt-24 rounded-2xl shadow-lg p-8 text-primary">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-semibold mb-2">
              Password Reset Success
            </h1>
            <p className="text-sm text-muted-foreground">
              Your password has been successfully reset
            </p>
          </div>
          <div className="relative w-48 h-48 m-auto">
            <Image src={"../../verified.svg"} alt="verify" fill />
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Go back to Sign In Page
            </p>
            <Link href={"/auth/sign-in"}>
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordSuccessPage;

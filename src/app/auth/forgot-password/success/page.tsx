import Navbar from "@/components/core/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface ISucessSendEmailLinkProps {}

const SucessSendEmailLink: React.FunctionComponent<
  ISucessSendEmailLinkProps
> = (props) => {
  return (
    <>
      <div className="h-screen bg-[#fafafa]">
        <Navbar />
        <div className="bg-white w-1/3 h-[28em] mx-auto mt-24 rounded-2xl shadow-lg p-8 text-primary">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold mb-2">Email Sent Success</h1>
            <p className="text-sm text-muted-foreground">
              Please check your email for the reset link.
            </p>
          </div>
          <div className="relative w-48 h-48 m-auto">
            <Image src={"../../success_verify.svg"} alt="verify" fill />
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground mb-2">Go back to Sign In Page</p>
            <Link href={"/auth/sign-in"}>
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SucessSendEmailLink;

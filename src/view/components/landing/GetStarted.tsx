import { Button } from "@/components/ui/button";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div className="bg-black p-8 md:p-20 w-full">
      <div className="flex flex-col gap-8 justify-center items-center">
        <h2 className="text-white text-3xl md:text-5xl font-bold">Ready to Get Started</h2>
        <p className="text-[#D1D5DB] md:text-xl">
          Join thousands of businesses using InvoiceKu to streamline their
          invoicing
        </p>
        <div>
          <Link href="/auth/sign-up">
            <Button variant={"secondary"} size={"xl"}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
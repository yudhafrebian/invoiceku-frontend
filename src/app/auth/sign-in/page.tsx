import Navbar from "@/components/core/navbar";
import Link from "next/link";
import SignInForm from "@/view/components/auth/SignInForm";

const SignIn = () => {
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

         <SignInForm />

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

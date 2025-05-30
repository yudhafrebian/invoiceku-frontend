import Navbar from "@/components/core/navbar";
import ForgotPasswordForm from "@/view/components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="h-screen bg-[#fafafa]">
        <Navbar />
        <div className="bg-white w-[90%] md:w-1/3 m-auto mt-24 rounded-2xl shadow-lg gap-4 p-4 text-primary">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">Forgot Password</h1>
            <p className="text-sm text-muted-foreground">
              Please enter your email to reset your password
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;

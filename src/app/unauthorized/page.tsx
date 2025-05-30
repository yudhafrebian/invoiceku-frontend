import Navbar from "@/components/core/navbar";
import Image from "next/image";

const UnauthorizedPage= () => {
  return (
    <>
        <div className="h-screen bg-[#fafafa]">
            <Navbar />
            <div className="text-primary p-8">
                <div className="relative w-[200px] h-[300px] md:w-[400px] md:h-[500px] m-auto">
                    <Image src={"unauthorized.svg"} alt="not-found" fill />
                </div>
                <h2 className="text-2xl font-bold text-center">Unauthorized</h2>
                <p className="text-center text-sm md:text-base">You are not authorized to access this page</p>
            </div>
        </div>
    </>
  )
};

export default UnauthorizedPage;

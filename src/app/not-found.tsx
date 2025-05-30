
import Navbar from "@/components/core/navbar";
import Image from "next/image";

const NotFoundPage= () => {
  return (
    <>
        <div className="h-screen bg-[#fafafa]">
            <Navbar />
            <div className="text-primary p-8">
                <div className="relative w-[200px] h-[200px] md:w-[500px] md:h-[500px] m-auto">
                    <Image src={"../../../not-found.svg"} alt="not-found" fill />
                </div>
                <h2 className="text-2xl font-bold text-center">Page Not Found</h2>
                <p className="text-center text-sm md:text-base">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            </div>
        </div>
    </>
  )
};

export default NotFoundPage;

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const InvoicePaymentSkeleton = () => {
  return (
    <main className="w-full h-screen bg-[#F8FAFC] flex items-center justify-center flex-col">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            <Skeleton className="w-48 h-6 mx-auto" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-32 h-4 mx-auto mt-2" />
          </CardDescription>
        </CardHeader>

        <div className="p-6 space-y-4 text-sm text-gray-700">
          <div className="space-y-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>

          <div>
            <h4 className="font-semibold mt-4">Items</h4>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-16 h-4" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between border-t pt-4 font-bold text-lg">
            <Skeleton className="w-16 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>

          <div className="my-6 space-y-3">
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-2/3 h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>

          <div className="md:w-3/4 mx-auto">
            <Skeleton className="w-full h-10" />
            <div className="text-center mt-4">
              <Skeleton className="w-24 h-10 mx-auto" />
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default InvoicePaymentSkeleton;

import { Suspense } from "react";
import VerifyPageClient from "@/view/components/auth/client-page/VerifyPageClient";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageClient />
    </Suspense>
  );
}

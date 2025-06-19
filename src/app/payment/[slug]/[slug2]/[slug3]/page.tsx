import InvoicePaymentPortal from "@/view/components/payment-portal/InvoicePaymentPortal";

interface PageProps {
  params: {
    slug: string;
    slug2: string;
    slug3: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <InvoicePaymentPortal params={params} />;
};

export default Page;

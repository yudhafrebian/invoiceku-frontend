import RecurringInvoicePaymentPortal from "@/view/components/payment-portal/RecurringInvoicePaymentPortal";

interface PageProps {
  params: {
    slug: string;
    slug2: string;
    slug3: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <RecurringInvoicePaymentPortal params={params} />;
};

export default Page;

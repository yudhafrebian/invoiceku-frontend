import InvoicePaymentPortal from "@/view/components/payment-portal/InvoicePaymentPortal";

const Page = async ({ params }: { params: { slug: string } }) => {
  return <InvoicePaymentPortal params={Promise.resolve(params)} />;
};

export default Page;
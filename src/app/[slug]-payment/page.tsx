import PortalNavbar from "@/components/core/PortalNavbar";
import { apiCall } from "@/utils/apiHelper";
import { useEffect, useState } from "react";

interface IInvoicePaymentPortalProps {
  params : Promise<{slug: string}>;
}

interface IDetail {
  id: string
  client: string
  invoice_number: string
  start_date: Date
  due_date: Date
  total: number
  payment_method: string
  status: string
}

const InvoicePaymentPortal: React.FunctionComponent<IInvoicePaymentPortalProps> = (props) => {
  const [data, setData] = useState<IDetail[]>([]);
  const getDetailInvoice = async () => {
    try {
      const invoiceNumber = await props.params;
      const response = await apiCall.get(`/invoice/detail-payment/${invoiceNumber.slug}`);
      setData(response.data.data.invoice);
      console.log(response.data.data.invoice)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetailInvoice();
  },[])
  return (
    <main>
      <PortalNavbar name={data[0]?.client} />
    </main>
  )
};

export default InvoicePaymentPortal;

import CreateInvoiceForm from '@/view/components/invoice/CreateInvoiceForm';
import SelectClient from '@/view/components/invoice/CreateInvoiceForm';
import * as React from 'react';

interface ICreateInvoicePageProps {
}

const CreateInvoicePage: React.FunctionComponent<ICreateInvoicePageProps> = (props) => {
  return (
    <div className='p-4 md:p-10 flex flex-col gap-4'>
      <h1 className="font-bold text-lg md:text-2xl text-primary">Create Invoice Page</h1>
      <div>
        <CreateInvoiceForm />
      </div>
    </div>
  )
};

export default CreateInvoicePage;

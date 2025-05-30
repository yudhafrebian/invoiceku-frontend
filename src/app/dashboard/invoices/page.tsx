"use client";
import { withAuth } from '@/hoc/withAuth';
import * as React from 'react';

interface IInvoiceProps {
}

const Invoices: React.FunctionComponent<IInvoiceProps> = (props) => {
  return (
    <div>
      <h1>Invoices Page</h1>
    </div>
  )
};

export default withAuth(Invoices);

"use client";
import { withAuth } from '@/hoc/withAuth';
import * as React from 'react';

interface IReccuringInvoicePageProps {
}

const ReccuringInvoicePage: React.FunctionComponent<IReccuringInvoicePageProps> = (props) => {
  return (
    <div>
      <h1>Reccuring Invoice Page</h1>
    </div>
  )
};

export default withAuth(ReccuringInvoicePage);

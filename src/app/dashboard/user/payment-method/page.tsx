import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentMethodList from '@/view/components/user/PaymentMethod';
import * as React from 'react';

interface IPaymentMethodPageProps {
}

const PaymentMethodPage: React.FunctionComponent<IPaymentMethodPageProps> = (props) => {
  return (
    <div className="px-80 py-4">
      <Card>
        <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment method.</CardDescription>
        </CardHeader>
        <div>
            <PaymentMethodList />
        </div>
      </Card>
    </div>
  )
};

export default PaymentMethodPage;

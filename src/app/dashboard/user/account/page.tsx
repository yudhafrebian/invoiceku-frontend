"use client";
import { withAuth } from '@/hoc/withAuth';
import * as React from 'react';

interface IAccountPageProps {
}

const AccountPage: React.FunctionComponent<IAccountPageProps> = (props) => {
  return (
    <div>
      <h1>Account Page</h1>
    </div>
  )
};

export default withAuth(AccountPage);

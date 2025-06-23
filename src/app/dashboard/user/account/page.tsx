"use client";
import { withAuth } from '@/hoc/withAuth';
import AccountView from '@/view/components/user/account/AccountView';
import * as React from 'react';

interface IAccountPageProps {
}

const AccountPage: React.FunctionComponent<IAccountPageProps> = (props) => {
  return (
    <div className='px-8 md:px-80 py-12'>
      <AccountView />
    </div>
  )
};

export default withAuth(AccountPage);

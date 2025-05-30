"use client";
import { withAuth } from '@/hoc/withAuth';
import * as React from 'react';

interface IClientsProps {
}

const Clients: React.FunctionComponent<IClientsProps> = (props) => {
  return (
    <div>
      <h1>Clients Page</h1>
    </div>
  )
};

export default withAuth(Clients);

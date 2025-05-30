"use client";
import { withAuth } from '@/hoc/withAuth';
import * as React from 'react';

interface IProductsProps {
}

const Products: React.FunctionComponent<IProductsProps> = (props) => {
  return (
    <div>
      <h1>Products and services Page</h1>
    </div>
  )
};

export default withAuth(Products);

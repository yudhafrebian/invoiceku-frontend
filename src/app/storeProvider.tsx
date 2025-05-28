"use client"
import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface IStoreProviderProps {
 children : React.ReactNode
}

const StoreProvider: React.FunctionComponent<IStoreProviderProps> = (props) => {
  return <Provider store={store}>{props.children}</Provider> ;
};

export default StoreProvider;

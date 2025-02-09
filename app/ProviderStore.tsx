'use client';

import { ReactNode } from 'react';
import { store } from '@/store/index';
import { Provider } from 'react-redux';

interface ProviderStoreProps {
  children: ReactNode;
}

const ProviderStore = ({ children }: ProviderStoreProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderStore;

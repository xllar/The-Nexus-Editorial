// app/providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import ClientProvider from '../store/redux';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ClientProvider>
        {children}
      </ClientProvider>
    </SessionProvider>
  );
}

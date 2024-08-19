'use client';

import React, { JSXElementConstructor, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { ClerkProvider } from '@clerk/nextjs';

import logger from '@/logger';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'yes') {
  if (typeof window === 'undefined') {
    import('@/mocks/server')
      .then(({ server }) => {
        server.listen();
      })
      .catch(logger.error);
  } else {
    import('@/mocks/browser')
      .then(async ({ browser }) => browser.start())
      .catch(logger.error);
  }
}

const queryClient = new QueryClient();

export const Providers = ({ 
  children }: Readonly<{ children: ReactNode }>) => {
    console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  return (
    <>
      <ProviderStack
        providers={[
          [ClerkProvider, { 
            publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
            appearance: {
              variables: { colorPrimary: "#000000" },
              elements: {
                formButtonPrimary:
                  "bg-black border border-black border-solid hover:bg-white hover:text-black",
                socialButtonsBlockButton:
                  "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
                socialButtonsBlockButtonText: "font-semibold",
                formButtonReset:
                  "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
                membersPageInviteButton:
                  "bg-black border border-black border-solid hover:bg-white hover:text-black",
                card: "bg-[#fafafa]",
              },
            }
          }],
          [Provider, {}],
          [QueryClientProvider, { client: queryClient }],
        ]}
      >

        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </QueryClientProvider>
      </ProviderStack>
    </>
  )
}

type NoInfer<T> = [T][T extends any ? 0 : 1];

type ContainsChildren = {
  children?: React.ReactNode;
};

function ProviderStack<Providers extends [ContainsChildren, ...ContainsChildren[]]>({
  providers,
  children,
}: {
  providers: {
    [k in keyof Providers]: [
      JSXElementConstructor<Providers[k]>,
      Omit<NoInfer<Providers[k]>, 'children'>,
    ];
  };
  children: ReactNode;
}) {
  let node = children;

  for (const [Provider, props] of providers) {
    node = <Provider {...props}>{node}</Provider>;
  }

  return node;
}
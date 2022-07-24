import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import React, { useState } from 'react';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'next-themes';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';
// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import '@/assets/css/login.css';
import { MoralisProvider } from 'react-moralis';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  //could remove this if you don't need to page level layout
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <script src="https://accounts.google.com/gsi/client"></script>
      </Head>
      <MoralisProvider
        serverUrl="https://dwc2dbvhigbr.usemoralis.com:2053/server"
        appId="ghXDlm7dYNPmkxEiLM15rR9Jnr7LHyFGoWJy6C3J"
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <WalletProvider>
                {getLayout(<Component {...pageProps} />)}
                <SettingsButton />
                <SettingsDrawer />
                <ModalsContainer />
                <DrawersContainer />
              </WalletProvider>
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </MoralisProvider>
    </>
  );
}

export default CustomApp;

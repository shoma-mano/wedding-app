import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '../components/layout';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;

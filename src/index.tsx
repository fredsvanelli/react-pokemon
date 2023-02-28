import React, { Suspense } from 'react';

import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { PokemonProvider } from 'context/PokemonContext';

import GraphQLClient from 'services/GraphQL';

import 'services/i18n';

import GlobaStyles from 'styles/GlobaStyles';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense>
    <ApolloProvider client={GraphQLClient}>
      <PokemonProvider>
        <App />
        <GlobaStyles />
      </PokemonProvider>
    </ApolloProvider>
  </Suspense>,
);

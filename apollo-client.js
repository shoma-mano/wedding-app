import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'Fc1di9DdQKyT512aQvoZmVm5K0Mr21pku0q5GuSHAdVF1nJFkG8l1VBjhg0DmtsU',
  },
  uri: 'https://game-guinea-75.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
});

export default client;

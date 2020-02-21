import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// Allows rest of the app to access the state that is stored on Apollo
import { ApolloProvider } from "react-apollo";
// Connects client to the /graphql server
import { createHttpLink } from "apollo-link-http";
// Apollo uses this to cache the data it fetches
import { InMemoryCache } from "apollo-cache-inmemory";
// Is a bundle of smaller libraries including apollo-link-http & apollo-cache-inmemory
import { ApolloClient, gql } from "apollo-boost";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com/"
});

const cache = new InMemoryCache();

const client = new ApolloClient({ link: httpLink, cache });

// Using client to fetch data
client
  .query({
    query: gql`
      {
        collections {
          id
          title
          items {
            price
            name
          }
        }
      }
    `
  })
  .then(res => console.log(res));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

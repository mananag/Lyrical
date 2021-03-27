import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css'
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import './style/style.css'

import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";

import {BrowserRouter, HashRouter ,Router, Link, Route, Switch} from "react-router-dom";
import history from "./components/history";
import {createHashHistory} from "history";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
});
const Root = () => {
  return (
      <ApolloProvider client={client}>
        <HashRouter history={createHashHistory()}>
          {/*<nav>*/}
          {/*    <ul>*/}
          {/*        <li>*/}
          {/*            <Link to="/">Home</Link>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*            <Link to="/new">Add Song</Link>*/}
          {/*        </li>*/}
          {/*    </ul>*/}
          {/*</nav>*/}
          <Switch>
            <Route exact path={'/'}>
              <SongList />
            </Route>
            <Route path={"/new"}>
              <SongCreate />
            </Route>
          </Switch>
        </HashRouter>
      </ApolloProvider>
  )
};

ReactDOM.render(
    <Root/>,
    document.querySelector('#root')
);

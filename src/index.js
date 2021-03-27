import React from 'react';
import ReactDOM from 'react-dom';
// import './style/style.css'
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider} from "@apollo/client";
import './styles/style.css'
import './styles/sass/materialize.scss'

import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetails from "./components/SongDetails";

import {HashRouter , Route, Switch} from "react-router-dom";

const httpLink = new HttpLink({ uri: 'http://localhost:4001/graphql' })
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        dataIdFromObject: o => o.id
    })
})


const Root = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <Switch>
                    <Route exact path={'/'}>
                        <SongList />
                    </Route>
                    <Route path={"/new"}>
                        <SongCreate />
                    </Route>
                    <Route path={"/:id"}>
                        <SongDetails />
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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

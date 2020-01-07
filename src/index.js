import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Test from "./test";
import Login from "./Login";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Route path="/" component={Login}/>
            <Route path="/app" component={Test}/>
        </div>
    );
}

ReactDOM.render( <BrowserRouter> <App /> </BrowserRouter>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

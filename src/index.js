import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Test from "./test";
import Login from "./Login";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Login }/>
                <ProtectedRoute exact path="/app" component={Test} />
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </div>
    );
}

ReactDOM.render( <BrowserRouter> <App /> </BrowserRouter>, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Test from "./test";
import UserPage from './user';
import HistoryPage from './history';
import Login from "./Login";
import Dashboard from "./dashboard";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Login }/>
                {/* <ProtectedRoute exact path="/app" component={Test} /> */}
                <Route exact path="/app" component={Dashboard}/>
                <Route exact path="/app/user" component={UserPage}/>
                <Route exact path="/app/history" component={HistoryPage}/>
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </div>
    );
}

ReactDOM.render( <BrowserRouter> <App /> </BrowserRouter>, document.getElementById("root"));

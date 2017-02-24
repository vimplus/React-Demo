/**
 * overview: Build Entry
 * Created by vimplus on 2017/02/22.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router';

import routes from "../routes";

class App extends React.Component {
    render() {
        return (
            <div>
                <ul>
                  <li><Link to="/list">list</Link></li>
                  <li><Link to="/About">About</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <Router history = {browserHistory} routes = {routes}/>,
    document.getElementById("APP")
);
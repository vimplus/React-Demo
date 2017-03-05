/**
 * @overview: Build Entry
 * @author: txBoy
 * @created: 2017-02-22.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router';

import routes from "../routes";


ReactDOM.render(
    <Router history = {browserHistory} routes = {routes}/>,
    document.getElementById("ReactApp")
);

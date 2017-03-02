/**
 * @overview: Routes
 * @author: txBoy
 * @created: 2017-02-22.
 */

import React from "react";
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router';

import IndexPage from "./HelloWorld";
import List from "./BlogList";


var getAbout = (nextState, callback) => {
      require.ensure(['./About'], function(require) {
        var About = require("./About").default;
        console.log(callback)
        callback(null, About)
      })
    }

class App extends React.Component {
    render() {
        return (
            <div>
                <ul>
                  <li><IndexLink to="/">首页</IndexLink></li>
                  <li><Link to="/list">List</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

const routes = [
    { path: 'list', component: List },
    { path: 'about', getComponent: getAbout }
]

module.exports = {
    path: '/',
    component: App,
    childRoutes: routes,
    defaultIndex: IndexPage
}

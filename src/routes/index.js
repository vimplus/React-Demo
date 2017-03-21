/**
 * @overview: Routes
 * @author: txBoy
 * @created: 2017-02-22.
 */

import React from "react";
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router';

import IndexPage from "./homePage";

const getAbout = (nextState, callback) => {
    console.log(nextState)
    require.ensure([], (require) => {
        let About = require("./about").default;
        callback(null, About)
    })
}

const BlogPage = require('./blog').default;
const AboutPage = {path: 'about', getComponent: getAbout};
console.log(BlogPage)

function formatRoutes(routes) {
    let list = routes.slice(0);
    let defaultComponent = (props) => {props.chidren};
    while (list.length) {
        let route = list.shift();
        if (route.childRoutes && route.childRoutes.length) {
            list.push.apply(list, route.childRoutes);
        }
    }
    return routes;
}

var pageRoutes = formatRoutes([
    BlogPage,
    AboutPage
]);
console.log(pageRoutes)

class App extends React.Component {
    render() {
        return (
            <div>
                <ul>
                  <li><IndexLink to="/">首页</IndexLink></li>
                  <li><Link to="/blog/list" activeStyle={{color:'#f00'}}>List</Link></li>
                  <li><Link to="/about" activeClassName="active">About</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

const childRoutes = [
    BlogPage,
    AboutPage
]

const routes = {
    path: '/',
    component: App,  //主要组件
    childRoutes: childRoutes,  //子组件
    indexRoute: { component: IndexPage }  //默认展示的组件
}
module.exports = routes;

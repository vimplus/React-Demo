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
    require.ensure(['./about'], (require) => {
        let About = require("./about").default;
        callback(null, About)
      })
    }

const getList = require('./blog/list').default;
console.log(getAbout)
console.log(getList.getComponent)

class App extends React.Component {
    render() {
        return (
            <div>
                <ul>
                  <li><IndexLink to="/">首页</IndexLink></li>
                  <li><Link to="/list" activeStyle={{color:'#f00'}}>List</Link></li>
                  <li><Link to="/about" activeClassName="active">About</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

//Route Object写法
const childRoutes = [
    getList,
    { path: 'about', getComponent: getAbout }
]
const routes = {
    path: '/',
    component: App,  //主要组件
    childRoutes: childRoutes,  //子组件
    indexRoute: { component: IndexPage }  //默认展示的组件
}
module.exports = routes;

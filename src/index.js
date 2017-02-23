/**
 * Created by vimplus on 2017/02/22.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router';

import Index from "./routes/HelloWorld";
import List from "./routes/BlogList";
import About from "./routes/About";

import routes from "./routes";

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
    <Router history = {browserHistory} routes={routes}>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="list" component={List}/>
            <Route path="About" component={About}/>
        </Route>
    </Router>,
    document.getElementById("APP")
);
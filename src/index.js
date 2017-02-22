/**
 * Created by vimplus on 2017/02/22.
 */

import React from "react";
import ReactDOM from "react-dom";
import {
  Router, browserHistory
}
from 'react-router';

import HelloWorld from "./components/HelloWorld";


class App extends React.Component {
  render() {
    return ( < HelloWorld / > );
  }
}

ReactDOM.render( < Router / > ,
  document.getElementById("APP")
);

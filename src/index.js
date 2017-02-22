/**
 * Created by vimplus on 2017/02/22.
 */

import React from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./components/HelloWorld";


class App extends React.Component {
    render() {
        return (
            <HelloWorld />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("APP")
);
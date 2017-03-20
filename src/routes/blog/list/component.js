/**
 * @overview: list Page
 * @author: txBoy
 * @created: 2017-02-23.
 */
import React from "react";
import { Link } from "react-router";
import css from "css/master.scss";

class List extends React.Component{
    renderList () {
        var liDOM = [];
        var tmp = null;
        for (var i = 1; i < 10; i++) {
            tmp = <li key={i}><Link to={'/blog/detail/' + i}>列表{i}</Link></li>
            liDOM.push(tmp);
        }
        return liDOM;
    }

    render() {
        return (
            <div>
                <ul>
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}
export default List;

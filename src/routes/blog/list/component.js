/**
 * @overview: list Page
 * @author: txBoy
 * @created: 2017-02-23.
 */
import React from "react";
import { Link } from "react-router";
import css from "css/master.scss";

class List extends React.Component{
    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/blog/detail/01'>列表01</Link></li>
                    <li>列表02</li>
                    <li>列表03</li>
                    <li>列表04</li>
                    <li>列表05</li>
                    <li>列表06</li>
                    <li>列表07</li>
                    <li>列表08</li>
                </ul>
            </div>
        );
    }
}
export default List;

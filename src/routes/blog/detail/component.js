/**
 * @overview: detail Page
 * @author: txBoy
 * @created: 2017-03-20.
 */
import React from "react";
import css from "css/master.scss";

class Detail extends React.Component{
    render() {
        return (
            <div>
                <div className="detail">详情ID：{this.props.params.id}</div>
            </div>
        );
    }
}
export default Detail;

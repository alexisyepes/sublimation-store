import React, { Component } from "react";
import "./style.scss";

class index extends Component {
	render() {
		return (
			<div className="loading-status-full-page">
				<div className="loading-spinner">
					<i className="fa fa-refresh fa-spin "></i> Please wait... <br /> Do
					Not Close This Window Or Click The Back Button
				</div>
			</div>
		);
	}
}

export default index;

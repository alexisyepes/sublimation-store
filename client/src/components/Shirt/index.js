import React, { Component } from "react";
import "./style.scss";

class index extends Component {
	render() {
		return (
			<div className="shirt-container">
				<div className="img-product-container text-center">
					<img
						className="img-product__shirt"
						src={this.props.img}
						alt="shirt"
					/>
				</div>
			</div>
		);
	}
}

export default index;

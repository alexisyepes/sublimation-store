import React, { Component } from "react";
import "./style.scss";

class index extends Component {
	render() {
		return (
			<div className="petTagBone-main-container">
				<img
					className="img-product__petTagBone"
					src={this.props.img}
					alt="pillow"
				/>
				{this.props.imagePreviewUrl !== "" ? (
					<div className="img-preview-petTagBone-wrapper">
						<img
							className="product-img-preview-petTagBone"
							src={this.props.imagePreviewUrl}
							alt="bone"
						/>
					</div>
				) : (
					<div className="img-preview-petTagBone-wrapper">
						<img
							className="product-img-preview-petTagBone"
							src="./images/elsa.jpg"
							alt="bone"
						/>
					</div>
				)}
			</div>
		);
	}
}

export default index;

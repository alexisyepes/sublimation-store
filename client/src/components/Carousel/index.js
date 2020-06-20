import React from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
} from "mdbreact";
import "./style.scss";

const CarouselPage = () => {
  return (
    <div className="carousel-parent">
      <MDBContainer>
        <MDBCarousel
          activeItem={1}
          length={4}
          showControls={true}
          showIndicators={false}
          className="z-depth-1"
          interval={3000}
        >
          <a className="" href="/products">
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <MDBView>
                  <img
                    className="d-block "
                    src="./images/varios.jpg"
                    alt="First slide"
                  />
                  <MDBMask overlay="black-light" />
                </MDBView>
                <MDBCarouselCaption>
                  {/* <div style={{ background:"rgba(0,0,0,0.5)", padding: "15px" }}>
            <h3 className="h3-responsive" >Open Concept</h3>
            <h4>Clean and safe environment</h4>
            </div> */}
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="2">
                <MDBView>
                  <img
                    className="d-block "
                    src="./images/pet-tag-bone-img.png"
                    alt="Second slide"
                  />
                  <MDBMask overlay="black-strong" />
                </MDBView>
                <MDBCarouselCaption>
                  {/* <div style={{ background:"rgba(0,0,0,0.5)", padding: "15px" }}>
            <h3 className="h3-responsive" >Open Concept</h3>
            <h4>Clean and safe environment</h4>
            </div> */}
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <MDBView>
                  <img
                    className="d-block "
                    src="./images/mug.jpg"
                    alt="Third slide"
                  />
                  <MDBMask overlay="black-slight" />
                </MDBView>
                <MDBCarouselCaption>
                  {/* <div style={{ background:"rgba(0,0,0,0.5)", padding: "15px" }}>
            <h3 className="h3-responsive" >Open Concept</h3>
            <h4>Clean and safe environment</h4>
            </div> */}
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="4">
                <MDBView>
                  <img
                    className="d-block w-300"
                    src="./images/pillow.jpg"
                    alt="First slide"
                  />
                  <MDBMask overlay="black-light" />
                </MDBView>
                <MDBCarouselCaption>
                  {/* <div style={{ background:"rgba(0,0,0,0.5)", padding: "15px" }}>
            <h3 className="h3-responsive" >Open Concept</h3>
            <h4>Clean and safe environment</h4>
            </div> */}
                </MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </a>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
};

export default CarouselPage;

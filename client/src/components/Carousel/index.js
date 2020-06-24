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
          length={6}
          showControls={true}
          showIndicators={false}
          className="z-depth-1"
          interval={4000}
        >
          <a className="" href="/products">
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <MDBView>
                  <img
                    className="d-block "
                    src="./images/sublimation-group.png"
                    alt="First slide"
                  />
                  <MDBMask overlay="black-light" />
                </MDBView>
                <MDBCarouselCaption></MDBCarouselCaption>
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
                <MDBCarouselCaption></MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <MDBView>
                  <img
                    className="d-block "
                    src="./images/mug5.png"
                    alt="Third slide"
                  />
                  <MDBMask overlay="black-slight" />
                </MDBView>
                <MDBCarouselCaption></MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="4">
                <MDBView>
                  <img
                    className="d-block w-300"
                    src="./images/pillow1.png"
                    alt="First slide"
                  />
                  <MDBMask overlay="black-light" />
                </MDBView>
                <MDBCarouselCaption></MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="5">
                <MDBView>
                  <img
                    className="d-block w-300"
                    src="./images/keychain.png"
                    alt="First slide"
                  />
                  <MDBMask overlay="black-light" />
                </MDBView>
                <MDBCarouselCaption></MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="6">
                <MDBView>
                  <img
                    className="d-block w-300"
                    src="./images/mug3.png"
                    alt="First slide"
                  />
                  <MDBMask overlay="black-light" />
                </MDBView>
                <MDBCarouselCaption></MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </a>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
};

export default CarouselPage;

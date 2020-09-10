import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import LoadPage from "../LoadPage";
import axios from "axios";
import "./style.scss";
import { connect } from "react-redux";
import { emptyOutCart } from "../../actions/cartActions";

const Index = (props) => {
  const [loadingAxiosReq, setLoadingAxiosReq] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [clicks, setClicks] = useState(1);
  const shippingMethod = props.shippingMethod;

  useEffect(() => {
    console.log(props);
  });

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmitCheckoutForm = async (event) => {
      event.preventDefault();
      setClicks(clicks + 1);
      console.log(clicks);
      if (clicks !== 1) {
        setLoadingAxiosReq(false);
        return setClicks(1);
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: { name: props.firstName, email: props.email },
      });
      if (paymentMethod === undefined) {
        return alert("fill out the form with your card information");
      }

      const { id } = paymentMethod;

      if (error) {
        return console.log(error);
      }

      try {
        setLoadingAxiosReq(true);

        const { data } = await axios.post("/products/payment", {
          id,
          amount:
            props.shippingMethod !== "delivery"
              ? parseInt(props.total)
              : props.totalPlusShippipng,
          email: props.email,
          shippingMethod,
        });

        if (data.requiresAction === true) {
          stripe.confirmCardPayment(data.clientSecret).then(async (result) => {
            if (result.error) {
              alert(result.error.message);
              props.resetModal();
              setErrorMsg("");
              setLoadingAxiosReq(false);
            } else {
              if (result.paymentIntent.status === "succeeded") {
                let imgUrl = [];
                let imgScrSht = [];
                const URL =
                  "https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload";

                const imgForProductFormData = props.cart.map((item) => {
                  const fd = new FormData();
                  fd.append("file", item.images);
                  fd.append("upload_preset", "sublimation");
                  return fd;
                });

                const screenShotsFormData = props.cart.map((item) => {
                  const fd = new FormData();
                  fd.append("file", item.screenShots);
                  fd.append("upload_preset", "sublimation");
                  return fd;
                });

                const imgForProductRequests = imgForProductFormData.map(
                  async (fd) => await axios.post(URL, fd).catch((err) => null)
                );
                const screenshotsRequests = screenShotsFormData.map(
                  async (fd) => await axios.post(URL, fd).catch((err) => null)
                );

                try {
                  const imgForProductResponses = await axios.all(
                    imgForProductRequests
                  );
                  imgForProductResponses.map((res) => {
                    if (!res || res === null) {
                      return imgUrl.push("No photo provided!");
                    }
                    return imgUrl.push(res.data.secure_url);
                  });

                  const screenshotsResponses = await axios.all(
                    screenshotsRequests
                  );
                  screenshotsResponses.map((res) => {
                    // console.log(res.data.secure_url);
                    return res.data.secure_url
                      ? imgScrSht.push(res.data.secure_url)
                      : null;
                  });

                  let dataObj = {
                    email: props.email,
                    img: imgUrl,
                    screenshot: imgScrSht,
                    address: props.address,
                    city: props.city,
                    province: props.province,
                    postalCode: props.postalCode,
                    shippingMethod,
                    couponName: props.couponName,
                  };
                  // console.log(dataObj);

                  new Promise((resolve, reject) => {
                    axios.post("/email_to_ayp_sublimation", dataObj);
                    resolve((res) => {
                      console.log(res);
                    });
                    reject((err) => {
                      console.log(err);
                    });
                  });
                  setLoadingAxiosReq(false);
                  alert(
                    "Your order will be ready soon, check your email for updates"
                  );
                  window.location.href = "/";
                } catch (err) {
                  console.log(err);
                }
                props.resetModal();
                setLoadingAxiosReq(false);
              }
            }
          });
        } else {
          let imgUrl = [];
          let imgScrSht = [];
          const URL =
            "https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload";

          const imgForProductFormData = props.cart.map((item) => {
            const fd = new FormData();
            fd.append("file", item.images);
            fd.append("upload_preset", "sublimation");
            return fd;
          });

          const screenShotsFormData = props.cart.map((item) => {
            const fd = new FormData();
            fd.append("file", item.screenShots);
            fd.append("upload_preset", "sublimation");
            return fd;
          });

          const imgForProductRequests = imgForProductFormData.map(
            async (fd) => await axios.post(URL, fd).catch((err) => null)
          );
          const screenshotsRequests = screenShotsFormData.map(
            async (fd) => await axios.post(URL, fd).catch((err) => null)
          );

          try {
            const imgForProductResponses = await axios.all(
              imgForProductRequests
            );
            imgForProductResponses.map((res) => {
              if (!res || res === null) {
                return imgUrl.push("No photo provided!");
              }
              return imgUrl.push(res.data.secure_url);
            });

            const screenshotsResponses = await axios.all(screenshotsRequests);
            screenshotsResponses.map((res) => {
              // console.log(res.data.secure_url);
              return res.data.secure_url
                ? imgScrSht.push(res.data.secure_url)
                : null;
            });

            let dataObj = {
              email: props.email,
              img: imgUrl,
              screenshot: imgScrSht,
              address: props.address,
              city: props.city,
              province: props.province,
              postalCode: props.postalCode,
              shippingMethod,
              couponName: props.couponName,
            };
            // console.log(dataObj);

            new Promise((resolve, reject) => {
              axios.post("/email_to_ayp_sublimation", dataObj);
              resolve((res) => {
                console.log(res);
              });
              reject((err) => {
                console.log(err);
              });
            });
            setLoadingAxiosReq(false);
            props.resetModal();
            props.emptyOutCart();
            function announceSuccess() {
              alert(
                "Order submitted successfully... check your email for updates"
              );
              window.location.href = "/";
            }
            setTimeout(announceSuccess, 1000);
          } catch (err) {
            console.log(err);
            props.resetModal();
          }
        }
      } catch (error) {
        console.log(error);
        // alert(
        //   error.response.data + "\nTry to check out using a different card"
        // );
        setLoadingAxiosReq(false);
        props.resetModal();
      }
    };

    return (
      <form onSubmit={handleSubmitCheckoutForm}>
        <h3 className="text-center">
          Total to Pay: $
          {props.shippingMethod !== "delivery"
            ? (props.total / 100).toFixed(2)
            : (props.totalPlusShippipng / 100).toFixed(2)}
          <img
            className="credit-cards"
            src="./images/credit-cards.png"
            alt="cards"
          />{" "}
        </h3>

        {loadingAxiosReq ? (
          <div className="loadPage-stripeForm">
            <LoadPage />
          </div>
        ) : (
          <button
            disabled={loadingAxiosReq}
            type="submit"
            className="btns-checkout-stripe "
          >
            Pay now {""}
          </button>
        )}
      </form>
    );
  };

  const stripePromise = loadStripe(
    "pk_test_5Oyk1YnGn6dPTwNAJ5KhOIcN00lcwk3Oqk" //Test mode
  );
  // const stripePromise = loadStripe(
  //   "pk_live_X5VIPRMcJH7dLUplWTMEgTmg00DLrg3Eu6" //Live mode
  // );

  return (
    <div className="container main-container-billing">
      <h1 className="text-center payment-info-title">Checkout</h1>
      <hr />
      <div className="cart-summary-container">
        <h3 className="text-center">Order Summary</h3>
        {props.itemsInCartList}
        <p className="cart-info-parag">
          Subtotal: ${(props.subTotal / 100).toFixed(2)}
        </p>
        <p className="cart-info-parag">Tax: ${(props.tax / 100).toFixed(2)}</p>
        {props.shippingMethod === "delivery" ? (
          <p className="cart-info-parag">Shipping: $15</p>
        ) : props.shippingMethod === "pickUpMilton" ? (
          <p className="cart-info-parag">
            Order to be picked up from our Milton pickup spot
          </p>
        ) : (
          <p className="cart-info-parag">
            Order to be picked up from our Cambridge pickup spot
          </p>
        )}
        <p className="cart-info-parag">
          Total to Pay: $
          {props.shippingMethod !== "delivery"
            ? (props.total / 100).toFixed(2)
            : (props.totalPlusShippipng / 100).toFixed(2)}
        </p>
      </div>
      <Elements stripe={stripePromise}>
        <div className="card-element-wrapper">
          <CardElement />
        </div>
        <CheckoutForm />
        <p
          style={{
            textAlign: "center",
            color: "red",
            marginTop: "10px",
          }}
        >
          {errorMsg}
        </p>
      </Elements>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});
//

export default connect(mapStateToProps, {
  emptyOutCart,
})(Index);

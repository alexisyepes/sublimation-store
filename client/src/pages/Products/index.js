import React, { Component, Fragment } from "react";
import Select from "react-select";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import Modal from "react-modal";
import Mugs from "../../components/Mugs";
import Shirts from "../../components/Shirt";
import Pillow from "../../components/Pillow";
import PetTagBone from "../../components/PetTagBone";
import CosmeticBag from "../../components/CosmeticBag";
import FaceMaskHolder from "../../components/FaceMaskHolder";
import axios from "axios";
import { connect } from "react-redux";
import { getCart, addItemToCart } from "../../actions/cartActions";
import { getProductsCustomized } from "../../actions/productActions";
import ShoppingCart from "../../components/ShoppingCart";

import "./style.scss";

let optionsBackgrounds = [
  {
    value: "",
    label: "None",
  },
  {
    value: "./images/backgrounds/blue-balls.png",
    label: "Blue",
  },
  {
    value: "./images/backgrounds/blue-purpple.png",
    label: "Purple",
  },
  {
    value: "./images/backgrounds/green.png",
    label: "Green",
  },
  {
    value: "./images/backgrounds/grey.png",
    label: "Grey",
  },
  {
    value: "./images/backgrounds/pink-balls.png",
    label: "Pink",
  },
  {
    value: "./images/backgrounds/yellow-dots.png",
    label: "Yellow",
  },
  {
    value: "./images/backgrounds/party.png",
    label: "Party",
  },
];

let sizeShirtsOptionsMen = [
  {
    value: "sm",
    label: "S",
  },
  {
    value: "m",
    label: "M",
  },
  {
    value: "l",
    label: "L",
  },
  {
    value: "xl",
    label: "XL",
  },
  {
    value: "xxl",
    label: "XXL",
  },
  {
    value: "xxxl",
    label: "XXXL",
  },
];

let sizeShirtsOptionsWoman = [
  {
    value: "sm",
    label: "S",
  },
  {
    value: "m",
    label: "M (Out of stock)",
  },
  {
    value: "l",
    label: "L (Out of stock)",
  },
  {
    value: "xl",
    label: "XL",
  },
];

let sizeShirtsOptionsKid = [
  {
    value: "one",
    label: "One size",
  },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
    color: "white",
    borderRadius: "10px",
    width: "60%",
  },
  overlay: { zIndex: 10000 },
};

const selectColorOptions = [
  {
    value: "blue",
    label: "Blue",
  },
  {
    value: "pink",
    label: "Pink",
  },
  {
    value: "green",
    label: "Green",
  },
  {
    value: "yellow",
    label: "Yellow",
  },
  {
    value: "brown",
    label: "Brown",
  },
];

const genderShirtsOptions = [
  {
    value: "male",
    label: "Men",
  },
  {
    value: "female",
    label: "Women",
  },
  {
    value: "kid",
    label: "Kid",
  },
];

const product = [
  //DELETE
  {
    Mug: {
      name: "mug",
      price: 1599,
    },
    PetTagBone: {
      name: "petTagBone",
      price: 1299,
    },
    Shirt: {
      name: "shirt",
      price: 1999,
    },
    Pillow: {
      name: "pillow",
      price: 2499,
    },
    CosmeticBag: {
      name: "cosmeticBag",
      price: 1899,
    },
    WoodSign: {
      name: "woodSign",
      price: 3499,
    },
  },
];

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnStep1: true,
      btnStep2: false,
      btnStep3: false,
      toggleStep1: false,
      toggleStep2: false,
      toggleStep3: false,
      toggleSelectProductBtn: true,
      step1: false,
      step2: false,
      step3: false,
      productImgArray: [
        {
          mug1: "./images/mug.png",
          mug2: "./images/mug-back.png",
        },
        "./images/shirt.png",
        "./images/pillow.png",
        "./images/pet-tag-bone.png",
        "./images/cartera-front.png",
        "./images/wood-sign-face-mask.png",
      ],
      productImg: "",
      productImgBack: "",
      productImgShirt: "",
      productImgPillow: "",
      productImgPetTagBone: "",
      productImgCosmeticBag: "",
      productImgFaceMaskHolder: "",
      faceMaskHolderChosen: false,
      finalProductImg: null,
      file: "",
      fileArray: [],
      imagePreviewUrl: "",
      imgPreviewArray: [],
      screenshot: [],
      bg: "",
      textOnMugs: "",
      modalToConfirm: false,
      modalToCheckout: false,
      notChecked: true,
      checkboxShipping: undefined,
      errorMsg: "",
      errorCoupon: "",
      textFormatOptions: false,
      textFormatOptionsForPetTagBone: false,
      textFormatOptionsForCosmeticBag: false,
      mugPrice: 0,
      productToPay: [],
      // cart: this.props.cart,
      totalMugsInCart: 0,
      totalShirtsInCart: 0,
      totalPillowsInCart: 0,
      totalKeychainsInCart: 0,
      totalPetTagBonesInCart: 0,
      totalCosmeticBagsInCart: 0,
      totalFacemaskHolderInCart: 0,
      firstName: "",
      email: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      couponCodeInput: "",
      billingDetails: false,
      checkOutStripe: false,
      showMsgInput: false,
      showPetTagsInput: false,
      qty: 1,
      step2ActualProd: "",
      designSquare: true,
      shirtSize: "",
      shirtGender: "",
      shippingMethod: "",
      photoControlShirts: false,
      photoControlPillow: false,
      photoControlPetTagBone: false,
      petTagBonePhone: "123456789",
      petTagBonePetName: "Elsa",
      boneColor: "blue",

      //Avatars
      avatarsArray: [],

      //loadingAxios
      loadingAxiosReq: false,
      coupons: [],
      selectedCouponName: "",
      selectedCouponPrice: 0,
    };
  }

  async componentDidMount() {
    await this.props.getProductsCustomized();
    console.log(this.props);
  }

  toggleModalToConfirmOrder = () => {
    this.setState({
      modalToConfirm: true,
    });
  };

  modalToCheckoutOpen = () => {
    if (!this.state.modalToCheckout) {
      this.setState({
        firstName: "",
        email: "",
        billingDetails: false,
        checkOutStripe: false,
        errorMsg: "",
        shippingMethod: "",
      });
    }
    this.setState({
      modalToCheckout: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalToConfirm: false,
    });
  };

  closeModalCheckout = async () => {
    await this.setState({
      modalToCheckout: false,
      errorMsg: "",
      errorCoupon: "",
      selectedCouponPrice: 0,
      couponCodeInput: "h873huih8",
      selectedCouponName: "",
    });
  };

  handleToggleStep1 = () => {
    this.setState({
      toggleStep1: !this.state.toggleStep1,
    });
  };

  handleToggleStep2 = () => {
    this.setState({
      toggleStep2: !this.state.toggleStep2,
    });
  };
  handleToggleStep3 = () => {
    this.setState({
      toggleStep3: !this.state.toggleStep3,
      btnStep3: !this.state.btnStep3,
    });
  };

  handleMugImg = () => {
    this.setState({
      productImg: this.state.productImgArray[0].mug1,
      productImgBack: this.state.productImgArray[0].mug2,
      mugPrice: 12.0,
      productImgShirt: "",
      step2ActualProd: "mug",
      step2: true,
    });
  };

  handleShirtImg = async () => {
    await this.setState({
      step2ActualProd: "shirt",
      productImgShirt: this.state.productImgArray[1],
      productImg: "",
      step2: true,
      photoControlShirts: true,
    });
    // console.log(this.state.productImgShirt);
  };

  handlePillowcaseImg = async () => {
    await this.setState({
      step2ActualProd: "pillow",
      productImgPillow: this.state.productImgArray[2],
      productImg: "",
      step2: true,
      photoControlPillow: true,
    });
  };

  handlePetTagBoneImg = async () => {
    await this.setState({
      step2ActualProd: "petTagBone",
      productImgPetTagBone: this.state.productImgArray[3],
      productImg: "",
      step2: true,
    });
  };

  handleCosmeticBagImg = async () => {
    await this.setState({
      step2ActualProd: "cosmeticBag",
      productImgCosmeticBag: this.state.productImgArray[4],
      productImg: "",
      step2: true,
    });
  };

  handleFaceMaskHolder = async () => {
    await this.setState({
      step2ActualProd: "faceMaskHolder",
      productImgFaceMaskHolder: this.state.productImgArray[5],
      productImg: "",
      step2: true,
    });
  };

  productSelectedConfirmed = () => {
    this.setState({
      btnStep1: false,
      btnStep2: true,
      btnStep3: false,
      toggleStep1: false,
      toggleStep3: false,
      toggleStep2: true,
      toggleSelectProductBtn: false,
      designSquare: false,
      textFormatOptions: true,
      textFormatOptionsForPetTagBone: true,
      textFormatOptionsForCosmeticBag: true,
      photoControlPetTagBone: true,
      faceMaskHolderChosen: true,
    });
  };

  fileSelectedHandler = async (event) => {
    await this.setState({
      finalProductImg: event.target.files[0],
    });
    const fd = new FormData();
    fd.append("file", this.state.finalProductImg);
    // console.log(this.state.finalProductImg);
    // this.fileUploadHandler();
  };

  clearPhoto = () => {
    this.setState({
      imagePreviewUrl: "",
    });
  };

  _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        photoControlPetTagBone: true,
        // imagePreviewUrl: [...this.state.imagePreviewUrl, reader.result], to add to array
      });
    };
  };

  updateComponent = () => {
    if (this.state.productToPay.length === 0) {
      return;
    }
    if (
      window.confirm(
        `Are you sure you wish to empty your cart? This operation cannot be reversed!`
      )
    ) {
      this.props.resetCart();
      this.setState({
        modalToCheckout: false,
        btnStep1: true,
        btnStep2: false,
        btnStep3: false,
        toggleStep1: false,
        toggleStep2: false,
        toggleStep3: false,
        toggleSelectProductBtn: true,
        step1: false,
        step2: false,
        step3: false,
        productImg: "",
        productImgBack: "",
        imagePreviewUrl: "",
        bg: "",
        textOnMugs: "",
        textFormatOptionsForPetTagBone: false,
        textFormatOptions: false,
        notChecked: true,
        faceMaskHolderChosen: false,
        // cart: 0,
        totalMugsInCart: 0,
        totalShirtsInCart: 0,
        totalPillowsInCart: 0,
        totalKeychainsInCart: 0,
        totalPetTagBonesInCart: 0,
        totalCosmeticBagsInCart: 0,
        totalFacemaskHolderInCart: 0,
        // qty: 1,
        productToPay: [],
        showMsgInput: false,
        boneColor: "blue",
        photoControlPetTagBone: false,
        btnConfirmed: false,
      });
      this.props.resetQty();
      this.props.resetCart();
    }
  };

  resetForNewProduct = () => {
    this.setState({
      btnStep1: true,
      btnStep2: false,
      btnStep3: false,
      toggleStep1: false,
      toggleStep2: false,
      toggleStep3: false,
      toggleSelectProductBtn: true,
      step1: false,
      step2: false,
      step3: false,
      productImg: "",
      productImgBack: "",
      file: "",
      imagePreviewUrl: "",
      bg: "",
      textOnMugs: "",
      textFormatOptions: false,
      notChecked: true,
      // qty: 1,
      showMsgInput: false,
      boneColor: "blue",
      petTagBonePhone: "123456789",
      petTagBonePetName: "Elsa",
      textFormatOptionsForPetTagBone: false,
      textFormatOptionsForCosmeticBag: false,
      faceMaskHolderChosen: false,
      errorCoupon: "",
    });
    this.props.resetQty();
  };

  onSelectedChange = async (value) => {
    await this.setState({
      bg: value.value,
    });
  };

  onSelectedChangeBone = async (value) => {
    await this.setState({
      colorBone: value.value,
    });
  };

  onSelectedChangeSize = async (value) => {
    await this.setState({
      shirtSize: value.value,
    });
  };

  onSelectedChangeGender = async (value) => {
    await this.setState({
      shirtGender: value.value,
    });
  };

  onSelectedShipping = async (value) => {
    await this.setState({
      shippingMethod: value.value,
      errorMsg: "",
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      textFormatOptions: true,
    });
  };

  onChangeHandlerBillingDetails = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  increaseQty = () => {
    this.setState({
      qty: this.state.qty + 1,
    });
  };

  decreaseQty = () => {
    if (this.state.qty === 1) {
      return;
    }
    this.setState({
      qty: this.state.qty - 1,
    });
  };

  addFaceMaskHolderToCart = async () => {
    this.toggleModalToConfirmOrder();
    let _id = "5f59fb8298979f54486e2b45";

    await this.props.getCart();
    const checkCartIfProductExists = this.props.cart.filter(
      (item) => item._id === _id
    );

    await axios
      .get("/customized_product/" + _id)
      .then(async (res) => {
        await html2canvas(
          document.getElementById("product-screen-container-facemask"),
          {
            width: 1400,
            height: 2800,
          }
        ).then(async (canvas) => {
          // zip and convert
          var zip = new JSZip();
          var savable = new Image();
          savable.src = canvas.toDataURL("image/jpeg", 0.5);
          zip.file(
            "image.png",
            savable.src.substr(savable.src.indexOf(",") + 1),
            {
              base64: true,
            }
          );

          await this.setState({
            fileArray: this.state.file,
            screenshot: savable.src,
            toggleStep3: true,
            toggleStep2: false,
          });
        });

        let productToAddToCart = {
          _id: checkCartIfProductExists.length > 0 ? _id + Date.now() : _id,
          productName: res.data.productName,
          price: res.data.price,
          qty: this.state.qty,
          subTotal: res.data.price * this.state.qty,
          images: this.state.screenshot,
          screenShots: this.state.screenshot,
        };

        this.props.addItemToCart(productToAddToCart);
      })
      .catch((err) => console.log(err));
  };

  addProductToCart = async ({ currentTarget }) => {
    let _id = currentTarget.value;

    if (this.state.notChecked === true) {
      return this.setState({
        errorMsg: "Confirm before continuing",
      });
    }

    //Image required for mug and pet-tag-bone products
    if (
      this.state.step2ActualProd === "mug" ||
      this.state.step2ActualProd === "petTagBone"
    ) {
      if (this.state.imagePreviewUrl === "") {
        return alert("A photo is required to proceed, please upload one.");
      }
    }

    //Check size and gender in Shirt component
    if (this.state.step2ActualProd === "shirt") {
      if (this.state.shirtSize === "") {
        return alert("Oops! you forgot to select gender and size");
      }
      if (this.state.shirtGender === "") {
        return alert("Oops! you forgot to select the Type");
      }
    }

    await this.props.getCart();
    const checkCartIfProductExists = this.props.cart.filter(
      (item) => item._id === _id
    );

    return await axios
      .get("/customized_product/" + _id)
      .then(async (res) => {
        // console.log(res);

        await html2canvas(document.getElementById("product-screen-container"), {
          width: 1200,
          height: 1400,
        }).then(async (canvas) => {
          // zip and convert
          this.toggleModalToConfirmOrder();
          var zip = new JSZip();
          var savable = new Image();
          savable.src = canvas.toDataURL("image/jpeg", 0.5);
          zip.file(
            "image.png",
            savable.src.substr(savable.src.indexOf(",") + 1),
            {
              base64: true,
            }
          );

          if (this.state.step2ActualProd === "mug") {
            await this.setState({
              fileArray: this.state.file,
              screenshot: savable.src,
              textFormatOptions: false,
              productToPay: this.state.productToPay.concat(
                product[0].Mug.price * this.props.qty
              ),
              totalMugsInCart: this.state.totalMugsInCart + this.props.qty,
            });
          }
          if (this.state.step2ActualProd === "shirt") {
            await this.setState({
              fileArray: this.state.file,
              screenshot: savable.src,
              textFormatOptions: false,
              photoControlShirts: false,
              productToPay: this.state.productToPay.concat(
                product[0].Shirt.price * this.props.qty
              ),
              // cart: this.state.cart + this.state.qty,
              totalShirtsInCart: this.state.totalShirtsInCart + this.props.qty,
            });
          }
          if (this.state.step2ActualProd === "petTagBone") {
            await this.setState({
              fileArray: this.state.file,
              screenshot: savable.src,
              textFormatOptionsForPetTagBone: false,
              photoControlPetTagBone: false,
              productToPay: this.state.productToPay.concat(
                product[0].PetTagBone.price * this.props.qty
              ),
              // cart: this.state.cart + this.state.qty,
              totalPetTagBonesInCart:
                this.state.totalPetTagBonesInCart + this.props.qty,
            });
          }
          if (this.state.step2ActualProd === "cosmeticBag") {
            await this.setState({
              fileArray: this.state.file,
              screenshot: savable.src,
              textFormatOptionsForCosmeticBag: false,
              productToPay: this.state.productToPay.concat(
                product[0].CosmeticBag.price * this.props.qty
              ),
              totalCosmeticBagsInCart:
                this.state.totalCosmeticBagsInCart + this.props.qty,
            });
          }

          await this.setState({
            // fileArray: this.state.file,
            // screenshot: savable.src,
            toggleStep3: true,
            toggleStep2: false,
          });
        });

        let productToAddToCart = {
          _id:
            checkCartIfProductExists.length > 0
              ? res.data._id + Date.now()
              : res.data._id,
          productName: res.data.productName,
          price: res.data.price,
          qty: this.state.qty,
          subTotal: res.data.price * this.state.qty,
          images: this.state.fileArray,
          screenShots: this.state.screenshot,
        };

        this.props.addItemToCart(productToAddToCart);
        // console.log(this.props.cart);
      })
      .catch((err) => console.log(err));
  };

  goBackToStep2 = async () => {
    if (
      window.confirm(
        `If you continue, some of your progress will be lost and you will need to re-create this product and its quantities. \nDo you still want to proceed?`
      )
    ) {
      if (this.state.step2ActualProd === "mug") {
        await this.setState({
          toggleStep3: false,
          toggleStep2: true,
          btnStep2: true,
          textFormatOptions: true,
          notChecked: true,
          totalMugsInCart: this.state.totalMugsInCart - this.props.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
          errorCoupon: "",
        });
        this.props.updateCartToPrevQty();
        this.props.resetQty();
      }
      if (this.state.step2ActualProd === "shirt") {
        await this.setState({
          toggleStep3: false,
          toggleStep2: true,
          textFormatOptions: true,
          notChecked: true,
          totalShirtsInCart: this.state.totalShirtsInCart - this.state.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
          shirtGender: "",
          errorCoupon: "",
        });
        this.props.updateCartToPrevQty();
        this.props.resetQty();
      }
      if (this.state.step2ActualProd === "pillow") {
        await this.setState({
          toggleStep3: false,
          toggleStep2: true,
          textFormatOptions: true,
          notChecked: true,
          totalPillowsInCart: this.state.totalPillowsInCart - this.props.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
          errorCoupon: "",
        });
        this.props.updateCartToPrevQty();
        this.props.resetQty();
      }
      if (this.state.step2ActualProd === "petTagBone") {
        await this.setState({
          toggleStep3: false,
          toggleStep2: true,
          notChecked: true,
          totalPetTagBonesInCart:
            this.state.totalPetTagBonesInCart - this.props.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
          textFormatOptionsForPetTagBone: true,
          photoControlPetTagBone: true,
          errorCoupon: "",
        });
        this.props.updateCartToPrevQty();
        this.props.resetQty();
      }
      if (this.state.step2ActualProd === "cosmeticBag") {
        await this.setState({
          toggleStep3: false,
          toggleStep2: true,
          notChecked: true,
          totalCosmeticBagsInCart:
            this.state.totalCosmeticBagsInCart - this.props.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
          textFormatOptionsForCosmeticBag: true,
          errorCoupon: "",
        });
        this.props.updateCartToPrevQty();
        this.props.resetQty();
      }
    }
  };

  toggleChangeTermsAndConditions = () => {
    if (this.state.notChecked) {
      this.setState({
        errorMsg: "",
      });
    }
    this.setState({
      notChecked: !this.state.notChecked,
    });
  };

  toggleChangeShipping = async () => {
    await this.setState({
      checkboxShipping: !this.state.checkboxShipping,
    });
    console.log(this.state.checkboxShipping);
  };

  validateCouponHandler = async (e) => {
    e.preventDefault();
    if (this.state.productToPay.length === 0) {
      return this.setState({
        errorMsg: "No Coupons can be used without a product in cart!",
      });
    }
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .get("/all_coupons")
      .then(async (res) => {
        const couponValidated = res.data.filter((word) =>
          word.couponName.includes(this.state.couponCodeInput.trim())
        );
        // console.log(couponValidated[0]);
        if (couponValidated.length !== 0) {
          await this.setState({
            loadingAxiosReq: false,
            selectedCouponName: couponValidated[0].couponName,
            selectedCouponPrice: couponValidated[0].price,
            errorCoupon: "",
          });
        } else {
          await this.setState({
            loadingAxiosReq: false,
            selectedCouponPrice: 0,
            errorCoupon: "Coupon is Invalid",
          });
        }
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  submitBillingDetails = (e) => {
    e.preventDefault();

    if (
      !this.state.firstName ||
      !this.state.email ||
      !this.state.address ||
      !this.state.city ||
      !this.state.province ||
      !this.state.postalCode
    ) {
      return this.setState({
        errorMsg: "All the fields are required!",
      });
    }
    if (!this.state.shippingMethod) {
      return this.setState({
        errorMsg: "Please choose one of the delivery or pickup options above",
      });
    }

    this.setState({
      billingDetails: true,
      checkOutStripe: true,
    });
  };

  showInputFields = () => {
    this.setState({
      showMsgInput: true,
      showPetTagsInput: true,
    });
  };

  toggleDesignSquare = async () => {
    this.setState((prevState) => ({
      designSquare: !prevState.designSquare,
    }));
  };

  render() {
    const cartContent = this.props.cart;
    const itemsInCartList =
      cartContent.length > 0 ? (
        cartContent.map((item) => {
          return (
            <div key={item._id} className="itemInCart-wrapper">
              <p className="cart-info-parag">
                Product Name: {item.productName}
              </p>
              <p className="cart-info-parag">Price: ${item.price / 100}</p>
              <div>
                <p className="cart-info-parag">
                  <span>Qty: {item.qty}</span>{" "}
                  <button
                    value={item._id}
                    onClick={this.increaseQtyInCart}
                    className="counter-btns counter-btns__plus"
                  >
                    {" "}
                    <i className="fas fa-plus"></i>
                  </button>{" "}
                  <button
                    value={item._id}
                    onClick={this.decreaseQtyInCart}
                    className="counter-btns counter-btns__minus"
                  >
                    <i className="fas fa-minus"></i>
                  </button>{" "}
                  <button
                    value={item._id}
                    className="remove-item-from-cart-modal-btn"
                    onClick={this.removeItemFromCart}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </p>
              </div>

              <hr />
            </div>
          );
        })
      ) : (
        <p className="text-center">Cart is empty</p>
      );

    return (
      <div className="product-creation-container">
        <div className="shoppingCart-container">
          <ShoppingCart
            screenshot={this.state.screenshot}
            imgForProduct={this.state.fileArray}
          />
        </div>
        <h1 className="home__heading text-center">
          Create your product in 3 easy steps{" "}
        </h1>
        <div className="steps-parent">
          {/* STEPS */}

          <div className="steps-container">
            {/* step 1 Container */}
            <button
              onClick={this.handleToggleStep1}
              className="step-btn step-btn__1"
              value={this.state.btnstep1}
              disabled={this.state.btnStep2}
            >
              STEP 1
            </button>
            {this.state.toggleStep1 ? (
              <div className="text-center">
                <h1 className="product-select-title">
                  Choose one product below
                </h1>
                <h2 className="product-select" onClick={this.handleMugImg}>
                  <i className="fas fa-coffee productList-icons"></i> Mug
                  11-Oz($15.99)
                </h2>
                <h2 className="product-select" onClick={this.handleShirtImg}>
                  <i className="fas fa-tshirt productList-icons"></i> Shirt
                  ($19.99)
                </h2>
                <h2
                  className="product-select"
                  onClick={this.handlePillowcaseImg}
                >
                  <i className="fas fa-couch productList-icons"></i> Pillow
                  (16"w X16"h) ($24.99)
                </h2>
                <h2
                  className="product-select"
                  onClick={this.handlePetTagBoneImg}
                >
                  <i className="fas fa-bone productList-icons"></i> Pet-tag
                  1.25"w X 1"h ($12.99)
                </h2>
                <h2
                  className="product-select"
                  onClick={this.handleCosmeticBagImg}
                >
                  <i className="fas fa-wallet productList-icons"></i> Cosmetic
                  bag / Pencil case 8.5"w X 5"h ($18.99)
                </h2>
                <h2
                  className="product-select"
                  onClick={this.handleFaceMaskHolder}
                >
                  <i className="fas fa-smile-wink productList-icons"></i> Wooden
                  Sign Key/Facemask Holder 11"w X 8.5"h ($34.99)
                </h2>
                <h2 className="product-select">More products coming soon...</h2>
              </div>
            ) : null}

            {/* step 2 Container */}
            <button
              onClick={this.handleToggleStep2}
              className="step-btn step-btn__2"
              disabled={this.state.btnStep1 || this.state.btnStep2}
              value={this.state.btnstep2}
            >
              STEP 2
            </button>
            {this.state.toggleStep2 ? (
              <div>
                <h1 className="text-center arrowToRight hideInSmallScreens">
                  Build your product &#x21f6;
                </h1>
                <h1 className="text-center arrowToRight hideInBigScreens">
                  Build your product &dArr;
                </h1>
              </div>
            ) : null}

            {/* step 3 Container */}
            <div>
              <button
                onClick={this.handleToggleStep3}
                className="step-btn step-btn__3"
                disabled={this.state.btnStep1 || this.state.btnStep2}
                value={this.state.btnstep3}
              >
                STEP 3
              </button>
              <div className="order-summary text-center">
                <h4>Cart Summary</h4>
                {itemsInCartList}
              </div>
            </div>
            {/* step 3 Container ENDS***********************/}
          </div>

          <div
            id="product-screen-container"
            className="virtual-image-container"
          >
            <h1 className="product-main-title">My Product</h1>
            {this.state.step2 ? (
              <div>
                <div className="product-image-container text-center">
                  {this.state.toggleSelectProductBtn ? (
                    <div>
                      <button
                        onClick={this.productSelectedConfirmed}
                        className={
                          this.state.step2ActualProd === "pillow"
                            ? "btn-to-confirm-product confirm-product-button__pillow"
                            : this.state.step2ActualProd === "petTagBone" ||
                              this.state.step2ActualProd === "shirt"
                            ? "btn-to-confirm-product confirm-product-button__petTagBone"
                            : "btn-to-confirm-product confirm-product-button"
                        }
                      >
                        <span aria-label="0" role="img">
                          &#10003;{" "}
                        </span>
                        Build this product
                      </button>
                    </div>
                  ) : (
                    <div className="startover-btn-container">
                      <span
                        onClick={this.resetForNewProduct}
                        className="startOver-button"
                      >
                        &#8634; Back to Step 1
                      </span>
                    </div>
                  )}

                  {this.state.step2ActualProd === "mug" ? (
                    <Mugs
                      productImg={this.state.productImg}
                      productImgBack={this.state.productImgBack}
                      imagePreviewUrl={this.state.imagePreviewUrl}
                      bg={this.state.bg}
                      textOnMugs={this.state.textOnMugs}
                      textFormatOptions={this.state.textFormatOptions}
                    />
                  ) : null}
                  {this.state.step2ActualProd === "shirt" ? (
                    <Fragment>
                      <Shirts
                        showGuide={this.state.designSquare}
                        toggleDesignSquare={this.toggleDesignSquare}
                        img={this.state.productImgShirt}
                        imagePreviewUrl={this.state.imagePreviewUrl}
                        textOnMugs={this.state.textOnMugs}
                        textFormatOptions={this.state.textFormatOptions}
                        photoControlShirts={this.state.photoControlShirts}
                      />
                      {this.state.toggleStep2 &&
                      !this.state.textOnMugs &&
                      !this.state.imagePreviewUrl ? (
                        <div className="shirt-mobile-heading">
                          <h1>Design your shirt below</h1>
                          <h1>&#8659;</h1>
                        </div>
                      ) : null}
                    </Fragment>
                  ) : null}
                  {this.state.step2ActualProd === "pillow" ? (
                    <Fragment>
                      <Pillow
                        showGuide={this.state.designSquare}
                        toggleDesignSquare={this.toggleDesignSquare}
                        img={this.state.productImgPillow}
                        imagePreviewUrl={this.state.imagePreviewUrl}
                        textOnMugs={this.state.textOnMugs}
                        textFormatOptions={this.state.textFormatOptions}
                        photoControlPillow={this.state.photoControlPillow}
                      />
                      {this.state.toggleStep2 &&
                      !this.state.textOnMugs &&
                      !this.state.imagePreviewUrl ? (
                        <div className="shirt-mobile-heading">
                          <h1>Design your pillow below</h1>
                          <h1>&#8659;</h1>
                        </div>
                      ) : null}
                    </Fragment>
                  ) : null}
                  {this.state.step2ActualProd === "petTagBone" ? (
                    <PetTagBone
                      boneColor={this.state.colorBone}
                      petName={this.state.petTagBonePetName}
                      phone={this.state.petTagBonePhone}
                      img={this.state.productImgPetTagBone}
                      imagePreviewUrl={this.state.imagePreviewUrl}
                      btnConfirmed={this.state.textFormatOptionsForPetTagBone}
                      photoControlPetTagBone={this.state.photoControlPetTagBone}
                    />
                  ) : null}
                  {this.state.step2ActualProd === "cosmeticBag" ? (
                    <Fragment>
                      <CosmeticBag
                        // petName={this.state.petTagBonePetName}
                        textOnMugs={this.state.textOnMugs}
                        img={this.state.productImgCosmeticBag}
                        imagePreviewUrl={this.state.imagePreviewUrl}
                        btnConfirmed={
                          this.state.textFormatOptionsForCosmeticBag
                        }
                      />
                      {this.state.toggleStep2 &&
                      !this.state.textOnMugs &&
                      !this.state.imagePreviewUrl ? (
                        <div className="shirt-mobile-heading">
                          <h1>Design your Cosmetic bag below</h1>
                          <h1>&#8659;</h1>
                        </div>
                      ) : null}
                    </Fragment>
                  ) : null}
                  {this.state.step2ActualProd === "faceMaskHolder" ? (
                    <div>
                      <FaceMaskHolder
                        avatarsArray={this.addAvatarsToArray}
                        img={this.state.productImgFaceMaskHolder}
                        faceMaskWasChosen={this.state.faceMaskHolderChosen}
                        screenShotFunction={this.addFaceMaskHolderToCart}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div>
                <div className="arrowToLeft hideInSmallScreens">
                  <h1 className="text-center">
                    &#x21da; Click on Step 1 to begin
                  </h1>
                </div>
                <div className="arrowToLeft hideInBigScreens">
                  <h1 className="text-center">
                    &uArr; Click on Step 1 to begin
                  </h1>
                </div>
              </div>
            )}

            {this.state.toggleStep2 ? (
              <div className="step-2-container">
                {this.state.step2ActualProd === "faceMaskHolder" ? null : (
                  <div className="controls-to-add-content-to-mugs">
                    {/* QUANTITY */}
                    <div className="qty-container">
                      <h4 className="h2-qty">
                        QTY:
                        <div className="qty-symbols qty-symbols__number">
                          {this.state.qty}
                        </div>
                        <button
                          onClick={this.increaseQty}
                          className="qty-symbols qty-symbols__plus"
                        >
                          +
                        </button>
                        <button
                          onClick={this.decreaseQty}
                          className="qty-symbols qty-symbols__minus"
                        >
                          -
                        </button>{" "}
                      </h4>
                      {this.state.step2ActualProd === "shirt" ? (
                        <div>
                          <div className="shirt-size-select">
                            <Select
                              isSearchable={false}
                              menuPlacement="top"
                              placeholder="Gender"
                              onChange={this.onSelectedChangeGender}
                              options={genderShirtsOptions}
                            />
                            {this.state.shirtGender === "male" ? (
                              <Select
                                isSearchable={false}
                                menuPlacement="top"
                                placeholder="size"
                                onChange={this.onSelectedChangeSize}
                                options={sizeShirtsOptionsMen}
                              />
                            ) : null}
                            {this.state.shirtGender === "female" ? (
                              <Select
                                isSearchable={false}
                                menuPlacement="top"
                                placeholder="size"
                                onChange={this.onSelectedChangeSize}
                                options={sizeShirtsOptionsWoman}
                              />
                            ) : null}
                            {this.state.shirtGender === "kid" ? (
                              <Select
                                isSearchable={false}
                                menuPlacement="top"
                                placeholder="size"
                                onChange={this.onSelectedChangeSize}
                                options={sizeShirtsOptionsKid}
                              />
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                      {this.state.step2ActualProd === "petTagBone" ? (
                        <div className="shirt-size-select">
                          <Select
                            isSearchable={false}
                            menuPlacement="top"
                            placeholder="Color"
                            onChange={this.onSelectedChangeBone}
                            options={selectColorOptions}
                          />
                        </div>
                      ) : null}
                    </div>

                    {this.state.step2ActualProd !== "faceMaskHolder" ? (
                      <div className="upload-photo-parent">
                        <h2
                          onClick={() => {
                            this.fileInput.click();
                          }}
                          className="heading-product heading-product__upload text-center"
                        >
                          &#x2912; Upload Photo
                        </h2>
                        <button
                          onClick={this.clearPhoto}
                          className="clear-photo-btn"
                        >
                          &#128465; Clear Photo
                        </button>
                      </div>
                    ) : null}
                    {this.state.step2ActualProd === "mug" ? (
                      <Select
                        isSearchable={false}
                        className="background-select"
                        menuPlacement="bottom"
                        placeholder="Choose background"
                        options={optionsBackgrounds}
                        onChange={this.onSelectedChange}
                      />
                    ) : null}
                    <input
                      capture="environment"
                      ref={(fileInput) => (this.fileInput = fileInput)}
                      className="input-img"
                      type="file"
                      onChange={this._handleImageChange}
                      style={{ display: "none" }}
                    />
                    {this.state.step2ActualProd === "petTagBone" ? (
                      <div>
                        <h2
                          onClick={this.showInputFields}
                          className="heading-product heading-product__message text-center"
                        >
                          &darr; ADD NAME AND PHONE &darr;{" "}
                        </h2>
                        <div className="petTagBone-input-container">
                          <input
                            // maxLength="50"
                            className="text-petTagBone-input "
                            placeholder="Pet Name"
                            name="petTagBonePetName"
                            onChange={this.onChangeHandler}
                            type="text"
                          />
                          <input
                            // maxLength="50"
                            className="text-petTagBone-input "
                            placeholder="Phone number"
                            name="petTagBonePhone"
                            onChange={this.onChangeHandler}
                            type="text"
                          />
                        </div>
                      </div>
                    ) : null}
                    {/* CLICK TO ADD MESSAGE CONTROLS */}
                    {this.state.step2ActualProd === "mug" ||
                    this.state.step2ActualProd === "shirt" ||
                    this.state.step2ActualProd === "pillow" ||
                    this.state.step2ActualProd === "cosmeticBag" ? (
                      <div>
                        <h2
                          onClick={this.showInputFields}
                          className="heading-product heading-product__message text-center"
                        >
                          &darr; Click to Add Text &darr;{" "}
                          {50 - this.state.textOnMugs.length + " letters left"}
                        </h2>
                        {this.state.showMsgInput ? (
                          <div className="text-area-container">
                            <textarea
                              maxLength="50"
                              className="text-msg-input "
                              placeholder="Type your message here"
                              name="textOnMugs"
                              onChange={this.onChangeHandler}
                              type="text"
                            />
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {this.state.imagePreviewUrl.length > 0 ||
                    this.state.textOnMugs !== "" ? (
                      <div className="continue-button-container">
                        <p className="agree-with-order">
                          <input
                            className="checkbox-order"
                            onChange={this.toggleChangeTermsAndConditions}
                            type="checkbox"
                            name="checkbox"
                            value={this.state.notChecked}
                          />
                          <b> I confirm my product is accurate</b>
                        </p>
                        {this.state.errorMsg ? (
                          <p className="error-msg-confirm-product">
                            &#8593; {this.state.errorMsg}
                          </p>
                        ) : null}

                        {/* CONFIRM ORDER FOR MUGS */}
                        {this.state.step2ActualProd === "mug" ? (
                          <button
                            value="5f59fad398979f54486e2b40"
                            onClick={this.addProductToCart}
                            className="continue-button"
                          >
                            Click here if you're done &#10003;
                          </button>
                        ) : null}

                        {/* CONFIRM ORDER FOR SHIRTS */}
                        {this.state.step2ActualProd === "shirt" ? (
                          <button
                            value="5f59fb3d98979f54486e2b42"
                            onClick={this.addProductToCart}
                            className="continue-button"
                          >
                            Click here if you're done &#10003;
                          </button>
                        ) : null}

                        {/* CONFIRM ORDER FOR PILLOWS */}
                        {this.state.step2ActualProd === "pillow" ? (
                          <button
                            value="5f59fb4e98979f54486e2b43"
                            onClick={this.addProductToCart}
                            className="continue-button"
                          >
                            Click here if you're done &#10003;
                          </button>
                        ) : null}

                        {/* CONFIRM ORDER FOR PET TAG BONES */}
                        {this.state.step2ActualProd === "petTagBone" ? (
                          <button
                            value="5f59fb2a98979f54486e2b41"
                            onClick={this.addProductToCart}
                            className="continue-button"
                          >
                            Click here if you're done &#10003;
                          </button>
                        ) : null}

                        {/* CONFIRM ORDER FOR COSMETIC BAGS */}
                        {this.state.step2ActualProd === "cosmeticBag" ? (
                          <button
                            value="5f59fb6298979f54486e2b44"
                            onClick={this.addProductToCart}
                            className="continue-button"
                          >
                            Click here if you're done &#10003;
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}

            {/* Modal Confirming creation of product */}
            <Modal
              appElement={document.getElementById("root")}
              style={customStyles}
              isOpen={this.state.modalToConfirm}
              onRequestClose={this.closeModal}
            >
              <span className="x-close-modal-step3" onClick={this.closeModal}>
                X
              </span>
              <h2 className="text-center">
                Your product has been created! <br />
                <img
                  className="thumbs-up"
                  src="./images/thumbs-up.png"
                  alt="thumbs up"
                />
                <br /> You can proceed to step 3
              </h2>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  products: state.products,
});

export default connect(mapStateToProps, {
  getCart,
  addItemToCart,
  getProductsCustomized,
})(index);

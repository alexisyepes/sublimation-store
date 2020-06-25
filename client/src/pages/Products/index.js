import React, { Component } from "react";
import Select from "react-select";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import Modal from "react-modal";
import CheckoutStripe from "../../components/StripeForm";
import Mugs from "../../components/Mugs";
import Shirts from "../../components/Shirt";
import Pillow from "../../components/Pillow";
import PetTagBone from "../../components/PetTagBone";
import CosmeticBag from "../../components/CosmeticBag";

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

let shippingOptions = [
  {
    value: "delivery",
    label: "Delivered to you $15.00 (3-4 business days. Ontario only)",
  },
  {
    value: "pickUpCambridge",
    label: "Pickup from Cambridge, ON (FREE)",
  },
  {
    value: "pickUpMilton",
    label: "Pickup from Milton, ON (FREE)",
  },
];

const customStylesCheckout = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(199, 218, 166)",
    marginTop: window.innerWidth < 450 ? "20px" : "0",
    overflow: window.innerWidth < 450 ? "scroll" : "auto",
    // paddingBottom: window.innerWidth < 450 ? "50px" : "0",
    height: window.innerHeight < 520 ? "100%" : "auto",
    color: "black",
    borderRadius: "5px",
    width: "65%",
    border: "1px solid black",
    boxShadow: "0px 60px 150px black",
    display: "flex-box",
  },

  overlay: { zIndex: 1000 },
};

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
  {
    Mug: {
      name: "mug",
      price: 1599,
    },
    PetTagBone: {
      name: "petTagBone",
      price: 1999,
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
  },
];

export default class index extends Component {
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
      ],
      productImg: "",
      productImgBack: "",
      productImgShirt: "",
      productImgPillow: "",
      productImgPetTagBone: "",
      productImgCosmeticBag: "",
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
      firstName: "",
      email: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      billingDetails: false,
      checkOutStripe: false,
      showMsgInput: false,
      showPetTagsInput: false,
      // qty: 1,
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
    };
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

  closeModalCheckout = () => {
    this.setState({
      modalToCheckout: false,
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
      textFormatOptionsForPetTagBone: true,
      textFormatOptionsForCosmeticBag: true,
      photoControlPetTagBone: true,
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
        notChecked: true,
        // cart: 0,
        totalMugsInCart: 0,
        totalShirtsInCart: 0,
        totalPillowsInCart: 0,
        totalKeychainsInCart: 0,
        totalPetTagBonesInCart: 0,
        totalCosmeticBagsInCart: 0,
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
      notChecked: true,
      // qty: 1,
      showMsgInput: false,
      boneColor: "blue",
      petTagBonePhone: "123456789",
      petTagBonePetName: "Elsa",
      textFormatOptionsForPetTagBone: false,
      textFormatOptionsForCosmeticBag: false,
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

  screenshotMugs = async () => {
    if (this.state.notChecked === true) {
      return this.setState({
        errorMsg: "Confirm before continuing",
      });
    }
    if (this.state.imagePreviewUrl === "") {
      return alert("A photo is required to proceed, please upload one.");
    }
    this.toggleModalToConfirmOrder();

    await html2canvas(document.getElementById("product-screen-container"), {
      width: 1200,
      height: 1400,
    }).then(async (canvas) => {
      // zip and convert
      var zip = new JSZip();
      var savable = new Image();
      savable.src = canvas.toDataURL("image/jpeg", 0.5);
      zip.file("image.png", savable.src.substr(savable.src.indexOf(",") + 1), {
        base64: true,
      });
      // console.log(savable.src);

      await this.setState({
        fileArray: [...this.state.fileArray, this.state.file],
        screenshot: [...this.state.screenshot, savable.src],
        toggleStep3: true,
        toggleStep2: false,
        textFormatOptions: false,
        productToPay: this.state.productToPay.concat(
          product[0].Mug.price * this.props.qty
        ),
        // cart: this.state.cart + this.props.qty,
        totalMugsInCart: this.state.totalMugsInCart + this.props.qty,
      });

      this.props.updateCart();
    });
  };

  screenshotShirts = async () => {
    if (this.state.notChecked === true) {
      return this.setState({
        errorMsg: "Confirm before continuing",
      });
    }
    if (this.state.shirtSize === "") {
      return alert("Oops! you forgot to select gender and size");
    }
    if (this.state.shirtGender === "") {
      return alert("Oops! you forgot to select the Type");
    }

    this.toggleModalToConfirmOrder();

    await html2canvas(document.getElementById("product-screen-container"), {
      width: 1200,
      height: 1400,
    }).then(async (canvas) => {
      // zip and convert
      var zip = new JSZip();
      var savable = new Image();
      savable.src = canvas.toDataURL("image/jpeg", 0.5);
      zip.file("image.png", savable.src.substr(savable.src.indexOf(",") + 1), {
        base64: true,
      });

      await this.setState({
        fileArray: [...this.state.fileArray, this.state.file],
        screenshot: [...this.state.screenshot, savable.src],
        toggleStep3: true,
        toggleStep2: false,
        textFormatOptions: false,
        photoControlShirts: false,
        productToPay: this.state.productToPay.concat(
          product[0].Shirt.price * this.props.qty
        ),
        // cart: this.state.cart + this.state.qty,
        totalShirtsInCart: this.state.totalShirtsInCart + this.props.qty,
      });
      this.props.updateCart();
    });
  };

  screenshotPillow = async () => {
    if (this.state.notChecked === true) {
      return this.setState({
        errorMsg: "Confirm before continuing",
      });
    }

    this.toggleModalToConfirmOrder();

    await html2canvas(document.getElementById("product-screen-container"), {
      width: 1200,
      height: 1400,
    }).then(async (canvas) => {
      // zip and convert
      var zip = new JSZip();
      var savable = new Image();
      savable.src = canvas.toDataURL("image/jpeg", 0.5);
      zip.file("image.png", savable.src.substr(savable.src.indexOf(",") + 1), {
        base64: true,
      });

      await this.setState({
        fileArray: [...this.state.fileArray, this.state.file],
        screenshot: [...this.state.screenshot, savable.src],
        toggleStep3: true,
        toggleStep2: false,
        textFormatOptions: false,
        photoControlPillow: false,
        productToPay: this.state.productToPay.concat(
          product[0].Pillow.price * this.props.qty
        ),
        // cart: this.state.cart + this.state.qty,
        totalPillowsInCart: this.state.totalPillowsInCart + this.props.qty,
      });
      this.props.updateCart();
    });
  };

  screenshotPetTagBone = async () => {
    if (this.state.notChecked === true) {
      return this.setState({
        errorMsg: "Confirm before continuing",
      });
    }
    if (this.state.imagePreviewUrl === "") {
      return alert("A photo is required to proceed, please upload one.");
    }

    this.toggleModalToConfirmOrder();

    await html2canvas(document.getElementById("product-screen-container"), {
      width: 1200,
      height: 1400,
    }).then(async (canvas) => {
      // zip and convert
      var zip = new JSZip();
      var savable = new Image();
      savable.src = canvas.toDataURL("image/jpeg", 0.5);
      zip.file("image.png", savable.src.substr(savable.src.indexOf(",") + 1), {
        base64: true,
      });

      await this.setState({
        fileArray: [...this.state.fileArray, this.state.file],
        screenshot: [...this.state.screenshot, savable.src],
        toggleStep3: true,
        toggleStep2: false,
        textFormatOptionsForPetTagBone: false,
        photoControlPetTagBone: false,
        productToPay: this.state.productToPay.concat(
          product[0].PetTagBone.price * this.props.qty
        ),
        // cart: this.state.cart + this.state.qty,
        totalPetTagBonesInCart:
          this.state.totalPetTagBonesInCart + this.props.qty,
      });
      this.props.updateCart();
    });
  };

  screenshotCosmeticBag = async () => {
    if (this.state.notChecked === true) {
      return this.setState({
        errorMsg: "Confirm before continuing",
      });
    }
    // if (this.state.imagePreviewUrl === "") {
    //   return alert("A photo is required to proceed, please upload one.");
    // }

    this.toggleModalToConfirmOrder();

    await html2canvas(document.getElementById("product-screen-container"), {
      width: 1200,
      height: 1400,
    }).then(async (canvas) => {
      // zip and convert
      var zip = new JSZip();
      var savable = new Image();
      savable.src = canvas.toDataURL("image/jpeg", 0.5);
      zip.file("image.png", savable.src.substr(savable.src.indexOf(",") + 1), {
        base64: true,
      });

      await this.setState({
        fileArray: [...this.state.fileArray, this.state.file],
        screenshot: [...this.state.screenshot, savable.src],
        toggleStep3: true,
        toggleStep2: false,
        textFormatOptionsForCosmeticBag: false,
        productToPay: this.state.productToPay.concat(
          product[0].CosmeticBag.price * this.props.qty
        ),
        totalCosmeticBagsInCart:
          this.state.totalCosmeticBagsInCart + this.props.qty,
      });
      this.props.updateCart();
    });
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
          // cart: this.state.cart - this.state.qty,
          // qty: 1,
          totalMugsInCart: this.state.totalMugsInCart - this.props.qty,

          // totalShirtsInCart: this.state.totalShirtsInCart - this.state.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
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
          // cart: this.state.cart - this.state.qty,
          // qty: 1,
          // totalMugsInCart: this.state.totalMugsInCart - this.state.qty,
          totalShirtsInCart: this.state.totalShirtsInCart - this.state.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
          shirtGender: "",
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
          // cart: this.state.cart - this.state.qty,
          // qty: 1,
          // totalMugsInCart: this.state.totalMugsInCart - this.state.qty,
          totalPillowsInCart: this.state.totalPillowsInCart - this.props.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
        });
        this.props.updateCartToPrevQty();
        this.props.resetQty();
      }
      if (this.state.step2ActualProd === "petTagBone") {
        await this.setState({
          toggleStep3: false,
          toggleStep2: true,
          notChecked: true,
          // cart: this.state.cart - this.state.qty,
          // qty: 1,
          // totalMugsInCart: this.state.totalMugsInCart - this.state.qty,
          totalPetTagBonesInCart:
            this.state.totalPetTagBonesInCart - this.props.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
          textFormatOptionsForPetTagBone: true,
          photoControlPetTagBone: true,
        });
        this.props.updateCartToPrevQty();
        this.props.resetQty();
      }
      if (this.state.step2ActualProd === "cosmeticBag") {
        await this.setState({
          toggleStep3: false,
          toggleStep2: true,
          notChecked: true,
          // cart: this.state.cart - this.state.qty,
          // qty: 1,
          // totalMugsInCart: this.state.totalMugsInCart - this.state.qty,
          totalCosmeticBagsInCart:
            this.state.totalCosmeticBagsInCart - this.props.qty,
          productToPay: this.state.productToPay.slice(0, -1),
          fileArray: this.state.fileArray.slice(0, -1),
          screenshot: this.state.screenshot.slice(0, -1),
          imagePreviewUrl: "",
          file: "",
          textFormatOptionsForCosmeticBag: true,
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
    return (
      <div className="product-creation-container">
        <h1 className="home__heading text-center">
          Create your product in 3 easy steps{" "}
        </h1>
        {!this.state.modalToCheckout ? (
          <div onClick={this.modalToCheckoutOpen} className="cart-container">
            <span aria-label="0" role="img">
              &#128722; {this.props.cart}
            </span>
          </div>
        ) : null}
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
                  Mug 11-Oz($15.99)
                </h2>
                <h2 className="product-select" onClick={this.handleShirtImg}>
                  Shirt ($19.99)
                </h2>
                <h2
                  className="product-select"
                  onClick={this.handlePillowcaseImg}
                >
                  Pillow (16"w X16"h) ($24.99)
                </h2>
                <h2
                  className="product-select"
                  onClick={this.handlePetTagBoneImg}
                >
                  Pet-tag 1.25"w X 1"h ($19.99)
                </h2>
                <h2
                  className="product-select"
                  onClick={this.handleCosmeticBagImg}
                >
                  Cosmetic bag / Pencil case 8.5"w X 5"h ($18.99)
                </h2>
                <h2 className="product-select">More products coming soon...</h2>
                {/* <h2 className="product-select" onClick={this.handleKeychainImg}>
                  Pet-walking-license ($20)
                </h2> */}
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
              {this.state.toggleStep3 ? (
                <div className="order-summary text-center">
                  <h1 className="text-center arrowToRight arrowDown">
                    &#8659;
                  </h1>
                  {this.state.totalMugsInCart > 0 ? (
                    <div>
                      <p>
                        Total Mugs in Cart: {this.state.totalMugsInCart}{" "}
                        <span>
                          (Mug: ${(product[0].Mug.price * 0.01).toFixed(2)} ea)
                        </span>
                      </p>
                    </div>
                  ) : null}
                  {this.state.totalShirtsInCart > 0 ? (
                    <div>
                      <p>
                        Total Shirts in Cart: {this.state.totalShirtsInCart}{" "}
                        {""}
                        <span>
                          (Shirt: ${(product[0].Shirt.price * 0.01).toFixed(2)}{" "}
                          ea)
                        </span>
                      </p>
                    </div>
                  ) : null}
                  {this.state.totalPillowsInCart > 0 ? (
                    <div>
                      <p>
                        Total Pillows in Cart: {this.state.totalPillowsInCart}{" "}
                        {""}
                        <span>
                          (Pillow: $
                          {(product[0].Pillow.price * 0.01).toFixed(2)} ea)
                        </span>
                      </p>
                    </div>
                  ) : null}
                  {this.state.totalPetTagBonesInCart > 0 ? (
                    <div>
                      <p>
                        Total Pet-tag-bones in Cart:{" "}
                        {this.state.totalPetTagBonesInCart} {""}
                        <span>
                          (Pet-tag: $
                          {(product[0].PetTagBone.price * 0.01).toFixed(2)} ea)
                        </span>
                      </p>
                    </div>
                  ) : null}
                  {this.state.totalCosmeticBagsInCart > 0 ? (
                    <div>
                      <p>
                        Total Cosmetic bags in Cart:{" "}
                        {this.state.totalCosmeticBagsInCart} {""}
                        <span>
                          (Cosmetic bag: $
                          {(product[0].CosmeticBag.price * 0.01).toFixed(2)}
                          {""}
                          ea)
                        </span>
                      </p>
                    </div>
                  ) : null}
                  <p>
                    Sub-Total: $
                    {(
                      product[0].Mug.price * 0.01 * this.state.totalMugsInCart +
                      product[0].Shirt.price *
                        0.01 *
                        this.state.totalShirtsInCart +
                      product[0].Pillow.price *
                        0.01 *
                        this.state.totalPillowsInCart +
                      product[0].PetTagBone.price *
                        0.01 *
                        this.state.totalPetTagBonesInCart +
                      product[0].CosmeticBag.price *
                        0.01 *
                        this.state.totalCosmeticBagsInCart
                    ).toFixed(2)}
                  </p>
                  <p>
                    Total Tax: $
                    {
                      // 0.13 * this.state.mugPrice * this.state.totalMugsInCart +
                      (
                        product[0].Mug.price *
                          this.state.totalMugsInCart *
                          0.01 *
                          0.13 +
                        product[0].Shirt.price *
                          this.state.totalShirtsInCart *
                          0.01 *
                          0.13 +
                        product[0].Pillow.price *
                          this.state.totalPillowsInCart *
                          0.01 *
                          0.13 +
                        product[0].PetTagBone.price *
                          this.state.totalPetTagBonesInCart *
                          0.01 *
                          0.13 +
                        product[0].CosmeticBag.price *
                          this.state.totalCosmeticBagsInCart *
                          0.01 *
                          0.13
                      ).toFixed(2)
                    }
                  </p>
                  <hr />
                  <p>
                    Grand Subtotal: $
                    {this.state.productToPay.length > 0
                      ? (
                          this.state.productToPay.reduce((a, b) => a + b) *
                            0.01 +
                          this.state.productToPay.reduce((a, b) => a + b) *
                            0.01 *
                            0.13
                        ).toFixed(2)
                      : 0}{" "}
                    <span aria-label="0" role="img">
                      &#128722;
                    </span>
                    <button
                      onClick={this.updateComponent}
                      className="empty-cart-button"
                    >
                      <i className="fas fa-trash"></i> Empty cart
                    </button>
                  </p>
                  <div className="btns-checkout">
                    <button
                      onClick={this.goBackToStep2}
                      className="modify-product-btn"
                    >
                      Modify the Last product added {""}
                      <span aria-label="0" role="img">
                        <i className="fas fa-cog"></i>
                      </span>
                    </button>

                    <button
                      onClick={this.resetForNewProduct}
                      className="btns-checkout btns-checkout__create-product"
                    >
                      &#x271C; Create more products {""}
                    </button>
                    <button
                      onClick={this.modalToCheckoutOpen}
                      className="btns-checkout btns-checkout__checkout"
                    >
                      Checkout now{" "}
                      <span aria-label="0" role="img">
                        &#128722;
                      </span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            {/* step 3 Container ENDS***********************/}
          </div>

          <div
            id="product-screen-container"
            className="virtual-image-container"
          >
            <h1 className="product-main-title">MY PRODUCT</h1>
            {this.state.step2 ? (
              <div>
                <div className="product-image-container text-center">
                  {this.state.toggleSelectProductBtn ? (
                    <button
                      onClick={this.productSelectedConfirmed}
                      className="confirm-product-button"
                    >
                      <span aria-label="0" role="img">
                        &#10003;{" "}
                      </span>
                      Click here to confirm product
                    </button>
                  ) : (
                    <div className="startover-btn-container">
                      <button
                        onClick={this.resetForNewProduct}
                        className="startOver-button"
                      >
                        &#8634; Back to Step 1
                      </button>
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
                    <Shirts
                      showGuide={this.state.designSquare}
                      toggleDesignSquare={this.toggleDesignSquare}
                      img={this.state.productImgShirt}
                      imagePreviewUrl={this.state.imagePreviewUrl}
                      textOnMugs={this.state.textOnMugs}
                      textFormatOptions={this.state.textFormatOptions}
                      photoControlShirts={this.state.photoControlShirts}
                    />
                  ) : null}
                  {this.state.step2ActualProd === "pillow" ? (
                    <Pillow
                      showGuide={this.state.designSquare}
                      toggleDesignSquare={this.toggleDesignSquare}
                      img={this.state.productImgPillow}
                      imagePreviewUrl={this.state.imagePreviewUrl}
                      textOnMugs={this.state.textOnMugs}
                      textFormatOptions={this.state.textFormatOptions}
                      photoControlPillow={this.state.photoControlPillow}
                    />
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
                    <CosmeticBag
                      // petName={this.state.petTagBonePetName}
                      textOnMugs={this.state.textOnMugs}
                      img={this.state.productImgCosmeticBag}
                      imagePreviewUrl={this.state.imagePreviewUrl}
                      btnConfirmed={this.state.textFormatOptionsForCosmeticBag}
                    />
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
                {/* CONTROLS TO ADD CONTENT ON PRODUCTS */}
                <div className="  controls-to-add-content-to-mugs">
                  {/* QUANTITY */}
                  <div className="qty-container">
                    <h4 className="h2-qty">
                      QTY:
                      <div className="qty-symbols qty-symbols__number">
                        {this.props.qty}
                      </div>
                      <button
                        onClick={this.props.increaseQty}
                        className="qty-symbols qty-symbols__plus"
                      >
                        +
                      </button>
                      <button
                        onClick={this.props.decreaseQty}
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
                  <div className="upload-photo-parent">
                    <h2
                      onClick={() => {
                        this.fileInput.click();
                      }}
                      className="heading-product heading-product__upload text-center"
                    >
                      &#x2912; CLICK TO UPLOAD PHOTO
                    </h2>
                    <button
                      onClick={this.clearPhoto}
                      className="clear-photo-btn"
                    >
                      &#128465; Clear Photo
                    </button>
                  </div>
                  {this.state.step2ActualProd === "mug" ? (
                    <Select
                      isSearchable={false}
                      className="background-select"
                      menuPlacement="top"
                      placeholder="Choose background (optional)"
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
                        className="heading-product heading-product__message"
                      >
                        &darr; CLICK TO ADD A MESSAGE &darr;{" "}
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
                        <p className="error-msg-confirm-product color-yellow">
                          &#8593; {this.state.errorMsg}
                        </p>
                      ) : null}

                      {/* CONFIRM ORDER FOR MUGS */}
                      {this.state.step2ActualProd === "mug" ? (
                        <button
                          onClick={this.screenshotMugs}
                          className="continue-button"
                        >
                          Click here if you're done &#10003;
                        </button>
                      ) : null}

                      {/* CONFIRM ORDER FOR SHIRTS */}
                      {this.state.step2ActualProd === "shirt" ? (
                        <button
                          onClick={this.screenshotShirts}
                          className="continue-button"
                        >
                          Click here if you're done &#10003;
                        </button>
                      ) : null}

                      {/* CONFIRM ORDER FOR PILLOWS */}
                      {this.state.step2ActualProd === "pillow" ? (
                        <button
                          onClick={this.screenshotPillow}
                          className="continue-button"
                        >
                          Click here if you're done &#10003;
                        </button>
                      ) : null}

                      {/* CONFIRM ORDER FOR PET TAG BONES */}
                      {this.state.step2ActualProd === "petTagBone" ? (
                        <button
                          onClick={this.screenshotPetTagBone}
                          className="continue-button"
                        >
                          Click here if you're done &#10003;
                        </button>
                      ) : null}

                      {/* CONFIRM ORDER FOR COSMETIC BAGS */}
                      {this.state.step2ActualProd === "cosmeticBag" ? (
                        <button
                          onClick={this.screenshotCosmeticBag}
                          className="continue-button"
                        >
                          Click here if you're done &#10003;
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Modal Confirming creation of product */}
            <Modal
              appElement={document.getElementById("root")}
              style={customStyles}
              isOpen={this.state.modalToConfirm}
              onRequestClose={this.closeModal}
            >
              <span className="x-close-modal" onClick={this.closeModal}>
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

            {/* Modal To Checkout */}
            <Modal
              appElement={document.getElementById("root")}
              style={customStylesCheckout}
              isOpen={this.state.modalToCheckout}
            >
              <span className="x-close-modal" onClick={this.closeModalCheckout}>
                X
              </span>
              <div className="checkout-modal-wrapper">
                {!this.state.checkOutStripe ? (
                  <div className="text-center">
                    <button
                      onClick={this.updateComponent}
                      className="empty-cart-button__checkout"
                    >
                      <i className="fas fa-trash"></i> Cancel and empty cart
                    </button>
                    {this.state.totalMugsInCart > 0 ? (
                      <div>
                        <p>
                          Total Mugs in Cart: {this.state.totalMugsInCart}{" "}
                          <span>
                            (Mug: ${(product[0].Mug.price * 0.01).toFixed(2)}
                            ea)
                          </span>
                        </p>
                      </div>
                    ) : null}
                    {this.state.totalShirtsInCart > 0 ? (
                      <div>
                        <p>
                          Total Shirts in Cart: {this.state.totalShirtsInCart}{" "}
                          {""}
                          <span>
                            (Shirt: $
                            {(product[0].Shirt.price * 0.01).toFixed(2)} ea)
                          </span>
                        </p>
                      </div>
                    ) : null}
                    {this.state.totalPillowsInCart > 0 ? (
                      <div>
                        <p>
                          Total Shirts in Cart: {this.state.totalPillowsInCart}{" "}
                          {""}
                          <span>
                            (Pillow: $
                            {(product[0].Pillow.price * 0.01).toFixed(2)} ea)
                          </span>
                        </p>
                      </div>
                    ) : null}
                    {this.state.totalPetTagBonesInCart > 0 ? (
                      <div>
                        <p>
                          Total Pet-tags in Cart:{" "}
                          {this.state.totalPetTagBonesInCart} {""}
                          <span>
                            (Pet-tag: $
                            {(product[0].PetTagBone.price * 0.01).toFixed(2)}{" "}
                            ea)
                          </span>
                        </p>
                      </div>
                    ) : null}
                    {this.state.totalCosmeticBagsInCart > 0 ? (
                      <div>
                        <p>
                          Total Cosmetic bags in Cart:{" "}
                          {this.state.totalCosmeticBagsInCart} {""}
                          <span>
                            (Cosmetic bag: $
                            {(product[0].CosmeticBag.price * 0.01).toFixed(2)}
                            {""}
                            ea)
                          </span>
                        </p>
                      </div>
                    ) : null}
                    <p>
                      Sub-Total: $
                      {(
                        product[0].Mug.price *
                          0.01 *
                          this.state.totalMugsInCart +
                        product[0].Shirt.price *
                          0.01 *
                          this.state.totalShirtsInCart +
                        product[0].Pillow.price *
                          0.01 *
                          this.state.totalPillowsInCart +
                        product[0].PetTagBone.price *
                          0.01 *
                          this.state.totalPetTagBonesInCart +
                        product[0].CosmeticBag.price *
                          0.01 *
                          this.state.totalCosmeticBagsInCart
                      ).toFixed(2)}
                    </p>
                    <p>
                      Total Tax: $
                      {
                        // 0.13 * this.state.mugPrice * this.state.totalMugsInCart +
                        (
                          product[0].Mug.price *
                            this.state.totalMugsInCart *
                            0.01 *
                            0.13 +
                          product[0].Shirt.price *
                            this.state.totalShirtsInCart *
                            0.01 *
                            0.13 +
                          product[0].Pillow.price *
                            this.state.totalPillowsInCart *
                            0.01 *
                            0.13 +
                          product[0].PetTagBone.price *
                            this.state.totalPetTagBonesInCart *
                            0.01 *
                            0.13 +
                          product[0].CosmeticBag.price *
                            this.state.totalCosmeticBagsInCart *
                            0.01 *
                            0.13
                        ).toFixed(2)
                      }
                    </p>

                    {this.state.shippingMethod === "delivery" ? (
                      <p>
                        <b>
                          {" "}
                          + Shipping to address below{" "}
                          <i className="fas fa-truck"></i>: $15.00
                        </b>
                      </p>
                    ) : this.state.shippingMethod === "pickUpMilton" ? (
                      <p>
                        <b>
                          Pickup from 724 Main St. Milton, ON L9T 3P6 Unit 2
                          (Free)
                        </b>
                      </p>
                    ) : this.state.shippingMethod === "pickUpCambridge" ? (
                      <p>
                        <b>
                          Pickup from 205 Cowan Blvd, Cambridge, ON N1T 1J8
                          (Free)
                        </b>
                      </p>
                    ) : null}
                    <hr />
                    {this.state.shippingMethod === "delivery" ? (
                      <p>
                        <b>
                          {" "}
                          TOTAL: $
                          {this.state.productToPay.length > 0
                            ? (
                                this.state.productToPay.reduce(
                                  (a, b) => a + b
                                ) *
                                  0.01 +
                                this.state.productToPay.reduce(
                                  (a, b) => a + b
                                ) *
                                  0.01 *
                                  0.13 +
                                15.0
                              ).toFixed(2)
                            : 0}{" "}
                          <span aria-label="0" role="img">
                            &#128722;
                          </span>
                        </b>
                      </p>
                    ) : (
                      <p>
                        <b>
                          {" "}
                          GRAND SUBTOTAL: $
                          {this.state.productToPay.length > 0
                            ? (
                                this.state.productToPay.reduce(
                                  (a, b) => a + b
                                ) *
                                  0.01 +
                                this.state.productToPay.reduce(
                                  (a, b) => a + b
                                ) *
                                  0.01 *
                                  0.13
                              ).toFixed(2)
                            : 0}{" "}
                          <span aria-label="0" role="img">
                            &#128722;
                          </span>
                        </b>
                      </p>
                    )}

                    <form
                      className="checkout-form"
                      onSubmit={this.submitBillingDetails}
                    >
                      <h3 className="text-center">
                        Fill out your information to checkout
                      </h3>
                      <input
                        className="input-checkout"
                        name="firstName"
                        onChange={this.onChangeHandlerBillingDetails}
                        type="text"
                        placeholder="Full Name"
                      />
                      <input
                        className="input-checkout"
                        name="address"
                        onChange={this.onChangeHandlerBillingDetails}
                        type="text"
                        placeholder="Address"
                      />
                      <input
                        className="input-checkout"
                        name="city"
                        onChange={this.onChangeHandlerBillingDetails}
                        type="text"
                        placeholder="City"
                      />
                      <input
                        className="input-checkout"
                        name="province"
                        onChange={this.onChangeHandlerBillingDetails}
                        type="text"
                        placeholder="Province"
                      />
                      <input
                        className="input-checkout"
                        name="postalCode"
                        onChange={this.onChangeHandlerBillingDetails}
                        type="text"
                        placeholder="Postal Code"
                      />
                      <input
                        className="input-checkout"
                        name="email"
                        onChange={this.onChangeHandlerBillingDetails}
                        type="email"
                        placeholder="Email"
                      />
                      <Select
                        className="shippingOptionsSelect"
                        isSearchable={false}
                        menuPlacement="top"
                        placeholder="Choose one"
                        options={shippingOptions}
                        onChange={this.onSelectedShipping}
                      />

                      <button className="btn-checkout">Next &#8594;</button>
                      <p className="text-center error-msg">
                        {this.state.errorMsg}
                      </p>
                    </form>
                  </div>
                ) : null}

                {this.state.billingDetails ? (
                  <CheckoutStripe
                    resetModal={this.closeModalCheckout}
                    screenshot={this.state.screenshot}
                    imgForProduct={this.state.fileArray}
                    totalMugsInCart={this.state.totalMugsInCart}
                    totalShirtsInCart={this.state.totalShirtsInCart}
                    totalPillowsInCart={this.state.totalPillowsInCart}
                    totalPetTagBonesInCart={this.state.totalPetTagBonesInCart}
                    totalCosmeticBagsInCart={this.state.totalCosmeticBagsInCart}
                    firstName={this.state.firstName}
                    email={this.state.email}
                    address={this.state.address}
                    city={this.state.city}
                    province={this.state.province}
                    postalCode={this.state.postalCode}
                    shippingMethod={this.state.shippingMethod}
                    subTotal={
                      product[0].Mug.price * 0.01 * this.state.totalMugsInCart +
                      product[0].Shirt.price *
                        0.01 *
                        this.state.totalShirtsInCart +
                      product[0].Pillow.price *
                        0.01 *
                        this.state.totalPillowsInCart +
                      product[0].PetTagBone.price *
                        0.01 *
                        this.state.totalPetTagBonesInCart +
                      product[0].CosmeticBag.price *
                        0.01 *
                        this.state.totalCosmeticBagsInCart
                    }
                    tax={(
                      0.13 * this.state.mugPrice * this.state.totalMugsInCart +
                      product[0].Shirt.price *
                        this.state.totalShirtsInCart *
                        0.01 *
                        0.13 +
                      product[0].Pillow.price *
                        this.state.totalPillowsInCart *
                        0.01 *
                        0.13 +
                      product[0].PetTagBone.price *
                        this.state.totalPetTagBonesInCart *
                        0.01 *
                        0.13 +
                      product[0].CosmeticBag.price *
                        this.state.totalCosmeticBagsInCart *
                        0.01 *
                        0.13
                    ).toFixed(2)}
                    productWithCents={
                      this.state.productToPay.length > 0
                        ? (
                            this.state.productToPay.reduce((a, b) => a + b) *
                              0.01 +
                            this.state.productToPay.reduce((a, b) => a + b) *
                              0.01 *
                              0.13
                          ).toFixed(2)
                        : null
                    }
                    productWithCentsPlusShipping={
                      this.state.productToPay.length > 0
                        ? (
                            this.state.productToPay.reduce((a, b) => a + b) *
                              0.01 +
                            this.state.productToPay.reduce((a, b) => a + b) *
                              0.01 *
                              0.13 +
                            15
                          ).toFixed(2)
                        : null
                    }
                    product={
                      this.state.productToPay.length > 0
                        ? Math.round(
                            this.state.productToPay.reduce((a, b) => a + b) *
                              0.13 +
                              this.state.productToPay.reduce((a, b) => a + b)
                          )
                        : 0
                    }
                    productPluShipping={
                      this.state.productToPay.length > 0
                        ? Math.round(
                            this.state.productToPay.reduce((a, b) => a + b) *
                              0.13 +
                              this.state.productToPay.reduce((a, b) => a + b) +
                              1500
                          )
                        : 0
                    }
                  />
                ) : null}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

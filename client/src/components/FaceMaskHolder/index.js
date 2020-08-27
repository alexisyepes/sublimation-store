import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-scroll";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallHolder: "",
      familyInput: "",
      familyNameConfirmed: "",
      avatarNumber: [],
      avatarImages: [],
      avatar: "",
      isFamilyName: false,
      errorMsg: "",
      lastnameEditMode: false,
      model1: false,
      model2: false,
      model3: false,
      chosenModel: false,
      showPreviewScreen: false,
      showWarningMsg: false,
      nameForFaceMask: "",
      namesArray: [],
      showModelSelected: false,
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  faceMaskHandler = () => {
    this.setState({
      wallHolder: "faceMask",
    });
  };

  keyHolderHandler = () => {
    this.setState({
      wallHolder: "keyHolder",
    });
  };

  addAvatarHandler = async (e) => {
    e.preventDefault();
    if (this.state.avatarImages.length === 10) {
      return this.setState({
        errorMsg: "Sorry! You've entered the maximum number of avatars allowed",
      });
    }
    if (this.state.avatar === "") {
      return this.setState({
        errorMsg: "Enter a number!",
      });
    }
    if (isNaN(this.state.avatar)) {
      return this.setState({
        errorMsg: "Type numbers only in this field!",
      });
    }

    let chosenImg;
    if (this.state.avatar === "1") {
      chosenImg = "./images/avatars/avatar1.png";
    } else if (this.state.avatar === "2") {
      chosenImg = "./images/avatars/avatar2.png";
    } else if (this.state.avatar === "3") {
      chosenImg = "./images/avatars/avatar3.png";
    } else if (this.state.avatar === "4") {
      chosenImg = "./images/avatars/avatar4.png";
    } else if (this.state.avatar === "5") {
      chosenImg = "./images/avatars/avatar5.png";
    } else if (this.state.avatar === "6") {
      chosenImg = "./images/avatars/avatar6.png";
    } else if (this.state.avatar === "7") {
      chosenImg = "./images/avatars/avatar7.png";
    } else if (this.state.avatar === "8") {
      chosenImg = "./images/avatars/avatar8.png";
    } else if (this.state.avatar === "9") {
      chosenImg = "./images/avatars/avatar9.png";
    } else if (this.state.avatar === "10") {
      chosenImg = "./images/avatars/avatar10.png";
    } else if (this.state.avatar === "11") {
      chosenImg = "./images/avatars/avatar11.png";
    } else if (this.state.avatar === "12") {
      chosenImg = "./images/avatars/avatar12.png";
    } else if (this.state.avatar === "13") {
      chosenImg = "./images/avatars/avatar13.png";
    } else if (this.state.avatar === "14") {
      chosenImg = "./images/avatars/avatar14.png";
    } else if (this.state.avatar === "15") {
      chosenImg = "./images/avatars/avatar15.png";
    } else if (this.state.avatar === "16") {
      chosenImg = "./images/avatars/avatar16.png";
    } else if (this.state.avatar === "17") {
      chosenImg = "./images/avatars/avatar17.png";
    } else if (this.state.avatar === "18") {
      chosenImg = "./images/avatars/avatar18.png";
    } else if (this.state.avatar === "19") {
      chosenImg = "./images/avatars/avatar19.png";
    } else if (this.state.avatar === "20") {
      chosenImg = "./images/avatars/avatar20.png";
    } else if (this.state.avatar === "21") {
      chosenImg = "./images/avatars/avatar21.png";
    } else if (this.state.avatar === "22") {
      chosenImg = "./images/avatars/avatar22.png";
    } else if (this.state.avatar === "23") {
      chosenImg = "./images/avatars/avatar23.png";
    } else if (this.state.avatar === "24") {
      chosenImg = "./images/avatars/avatar24.png";
    } else if (this.state.avatar === "25") {
      chosenImg = "./images/avatars/avatar25.png";
    } else if (this.state.avatar === "26") {
      chosenImg = "./images/avatars/avatar26.png";
    } else if (this.state.avatar === "27") {
      chosenImg = "./images/avatars/avatar27.png";
    } else if (this.state.avatar === "28") {
      chosenImg = "./images/avatars/avatar28.png";
    } else if (this.state.avatar === "29") {
      chosenImg = "./images/avatars/avatar29.png";
    } else if (this.state.avatar === "30") {
      chosenImg = "./images/avatars/avatar30.png";
    } else if (this.state.avatar === "31") {
      chosenImg = "./images/avatars/avatar31.png";
    } else if (this.state.avatar === "32") {
      chosenImg = "./images/avatars/avatar32.png";
    } else if (this.state.avatar === "33") {
      chosenImg = "./images/avatars/avatar33.png";
    } else if (this.state.avatar === "34") {
      chosenImg = "./images/avatars/avatar34.png";
    } else if (this.state.avatar === "35") {
      chosenImg = "./images/avatars/avatar35.png";
    } else if (this.state.avatar === "36") {
      chosenImg = "./images/avatars/avatar36.png";
    } else if (this.state.avatar === "37") {
      chosenImg = "./images/avatars/avatar37.png";
    } else if (this.state.avatar === "38") {
      chosenImg = "./images/avatars/avatar38.png";
    } else if (this.state.avatar === "39") {
      chosenImg = "./images/avatars/avatar39.png";
    } else if (this.state.avatar === "40") {
      chosenImg = "./images/avatars/avatar40.png";
    } else if (this.state.avatar === "41") {
      chosenImg = "./images/avatars/avatar41.png";
    } else if (this.state.avatar === "42") {
      chosenImg = "./images/avatars/avatar42.png";
    } else if (this.state.avatar === "43") {
      chosenImg = "./images/avatars/avatar43.png";
    } else if (this.state.avatar === "44") {
      chosenImg = "./images/avatars/avatar44.png";
    } else if (this.state.avatar === "45") {
      chosenImg = "./images/avatars/avatar45.png";
    } else if (this.state.avatar === "46") {
      chosenImg = "./images/avatars/avatar46.png";
    } else if (this.state.avatar === "47") {
      chosenImg = "./images/avatars/avatar47.png";
    } else if (this.state.avatar === "48") {
      chosenImg = "./images/avatars/avatar48.png";
    } else if (this.state.avatar === "49") {
      chosenImg = "./images/avatars/avatar49.png";
    } else if (this.state.avatar === "50") {
      chosenImg = "./images/avatars/avatar50.png";
    } else if (this.state.avatar === "51") {
      chosenImg = "./images/avatars/avatar51.png";
    } else if (this.state.avatar === "52") {
      chosenImg = "./images/avatars/avatar52.png";
    } else if (this.state.avatar === "53") {
      chosenImg = "./images/avatars/avatar53.png";
    } else if (this.state.avatar === "54") {
      chosenImg = "./images/avatars/avatar54.png";
    } else if (this.state.avatar === "55") {
      chosenImg = "./images/avatars/avatar55.png";
    } else if (this.state.avatar === "56") {
      chosenImg = "./images/avatars/avatar56.png";
    } else if (this.state.avatar === "57") {
      chosenImg = "./images/avatars/avatar57.png";
    } else if (this.state.avatar === "58") {
      chosenImg = "./images/avatars/avatar58.png";
    } else if (this.state.avatar === "59") {
      chosenImg = "./images/avatars/avatar59.png";
    } else if (this.state.avatar === "60") {
      chosenImg = "./images/avatars/avatar60.png";
    } else if (this.state.avatar === "61") {
      chosenImg = "./images/avatars/avatar61.png";
    } else if (this.state.avatar === "62") {
      chosenImg = "./images/avatars/avatar62.png";
    } else if (this.state.avatar === "63") {
      chosenImg = "./images/avatars/avatar63.png";
    } else if (this.state.avatar === "64") {
      chosenImg = "./images/avatars/avatar64.png";
    } else if (this.state.avatar === "65") {
      chosenImg = "./images/avatars/avatar65.png";
    } else if (this.state.avatar === "66") {
      chosenImg = "./images/avatars/avatar66.png";
    } else if (this.state.avatar === "67") {
      chosenImg = "./images/avatars/avatar67.png";
    } else if (this.state.avatar === "68") {
      chosenImg = "./images/avatars/avatar68.png";
    } else if (this.state.avatar === "69") {
      chosenImg = "./images/avatars/avatar69.png";
    } else if (this.state.avatar === "70") {
      chosenImg = "./images/avatars/avatar70.png";
    } else if (this.state.avatar === "71") {
      chosenImg = "./images/avatars/avatar71.png";
    } else if (this.state.avatar === "72") {
      chosenImg = "./images/avatars/avatar72.png";
    } else if (this.state.avatar === "73") {
      chosenImg = "./images/avatars/avatar73.png";
    } else if (this.state.avatar === "74") {
      chosenImg = "./images/avatars/avatar74.png";
    } else if (this.state.avatar === "75") {
      chosenImg = "./images/avatars/avatar75.png";
    } else if (this.state.avatar === "76") {
      chosenImg = "./images/avatars/avatar76.png";
    } else if (this.state.avatar === "77") {
      chosenImg = "./images/avatars/avatar77.png";
    } else if (this.state.avatar === "78") {
      chosenImg = "./images/avatars/avatar78.png";
    } else if (this.state.avatar === "79") {
      chosenImg = "./images/avatars/avatar79.png";
    } else if (this.state.avatar === "80") {
      chosenImg = "./images/avatars/avatar80.png";
    } else if (this.state.avatar === "81") {
      chosenImg = "./images/avatars/avatar81.png";
    } else if (this.state.avatar === "82") {
      chosenImg = "./images/avatars/avatar82.png";
    } else if (this.state.avatar === "83") {
      chosenImg = "./images/avatars/avatar83.png";
    } else if (this.state.avatar === "84") {
      chosenImg = "./images/avatars/avatar84.png";
    } else if (this.state.avatar === "85") {
      chosenImg = "./images/avatars/avatar85.png";
    } else if (this.state.avatar === "86") {
      chosenImg = "./images/avatars/avatar86.png";
    } else if (this.state.avatar === "87") {
      chosenImg = "./images/avatars/avatar87.png";
    } else if (this.state.avatar === "88") {
      chosenImg = "./images/avatars/avatar88.png";
    } else if (this.state.avatar === "89") {
      chosenImg = "./images/avatars/avatar89.png";
    } else if (this.state.avatar === "90") {
      chosenImg = "./images/avatars/avatar90.png";
    } else if (this.state.avatar === "91") {
      chosenImg = "./images/avatars/avatar91.png";
    } else if (this.state.avatar === "92") {
      chosenImg = "./images/avatars/avatar92.png";
    } else if (this.state.avatar === "93") {
      chosenImg = "./images/avatars/avatar93.png";
    } else if (this.state.avatar === "94") {
      chosenImg = "./images/avatars/avatar94.png";
    } else if (this.state.avatar === "95") {
      chosenImg = "./images/avatars/avatar95.png";
    } else if (this.state.avatar === "96") {
      chosenImg = "./images/avatars/avatar96.png";
    } else if (this.state.avatar === "97") {
      chosenImg = "./images/avatars/avatar97.png";
    } else if (this.state.avatar === "98") {
      chosenImg = "./images/avatars/avatar98.png";
    } else if (this.state.avatar === "99") {
      chosenImg = "./images/avatars/avatar99.png";
    } else if (this.state.avatar === "100") {
      chosenImg = "./images/avatars/avatar100.png";
    } else if (this.state.avatar === "101") {
      chosenImg = "./images/avatars/avatar101.png";
    } else if (this.state.avatar === "102") {
      chosenImg = "./images/avatars/avatar102.png";
    } else if (this.state.avatar === "103") {
      chosenImg = "./images/avatars/avatar103.png";
    } else if (this.state.avatar === "104") {
      chosenImg = "./images/avatars/avatar104.png";
    } else {
      return await this.setState({
        errorMsg: "Enter numbers only between 1 and 104!",
      });
    }
    await this.setState((prevState) => ({
      avatarNumber: [...prevState.avatarNumber, this.state.avatar],
      avatarImages: [...prevState.avatarImages, chosenImg],
      avatar: "",
      errorMsg: "",
    }));
  };

  addAvatarHandlerFaceMask = async (e) => {
    e.preventDefault();
    if (this.state.avatarImages.length === 10) {
      return this.setState({
        errorMsg: "Sorry! You've entered the maximum number of avatars allowed",
      });
    }
    if (this.state.avatar === "") {
      return this.setState({
        errorMsg: "Enter a number!",
      });
    }
    if (isNaN(this.state.avatar)) {
      return this.setState({
        errorMsg: "Type numbers only in this field!",
      });
    }

    let chosenImg;
    if (this.state.avatar === "1") {
      chosenImg = "./images/avatars-facemask/avatar1.png";
    } else if (this.state.avatar === "2") {
      chosenImg = "./images/avatars-facemask/avatar2.png";
    } else if (this.state.avatar === "3") {
      chosenImg = "./images/avatars-facemask/avatar3.png";
    } else if (this.state.avatar === "4") {
      chosenImg = "./images/avatars-facemask/avatar4.png";
    } else if (this.state.avatar === "5") {
      chosenImg = "./images/avatars-facemask/avatar5.png";
    } else if (this.state.avatar === "6") {
      chosenImg = "./images/avatars-facemask/avatar6.png";
    } else if (this.state.avatar === "7") {
      chosenImg = "./images/avatars-facemask/avatar7.png";
    } else if (this.state.avatar === "8") {
      chosenImg = "./images/avatars-facemask/avatar8.png";
    } else if (this.state.avatar === "9") {
      chosenImg = "./images/avatars-facemask/avatar9.png";
    } else if (this.state.avatar === "10") {
      chosenImg = "./images/avatars-facemask/avatar10.png";
    } else if (this.state.avatar === "11") {
      chosenImg = "./images/avatars-facemask/avatar11.png";
    } else if (this.state.avatar === "12") {
      chosenImg = "./images/avatars-facemask/avatar12.png";
    } else if (this.state.avatar === "13") {
      chosenImg = "./images/avatars-facemask/avatar13.png";
    } else if (this.state.avatar === "14") {
      chosenImg = "./images/avatars-facemask/avatar14.png";
    } else if (this.state.avatar === "15") {
      chosenImg = "./images/avatars-facemask/avatar15.png";
    } else if (this.state.avatar === "16") {
      chosenImg = "./images/avatars-facemask/avatar16.png";
    } else if (this.state.avatar === "17") {
      chosenImg = "./images/avatars-facemask/avatar17.png";
    } else if (this.state.avatar === "18") {
      chosenImg = "./images/avatars-facemask/avatar18.png";
    } else if (this.state.avatar === "19") {
      chosenImg = "./images/avatars-facemask/avatar19.png";
    } else if (this.state.avatar === "20") {
      chosenImg = "./images/avatars-facemask/avatar20.png";
    } else if (this.state.avatar === "21") {
      chosenImg = "./images/avatars-facemask/avatar21.png";
    } else if (this.state.avatar === "22") {
      chosenImg = "./images/avatars-facemask/avatar22.png";
    } else if (this.state.avatar === "23") {
      chosenImg = "./images/avatars-facemask/avatar23.png";
    } else if (this.state.avatar === "24") {
      chosenImg = "./images/avatars-facemask/avatar24.png";
    } else if (this.state.avatar === "25") {
      chosenImg = "./images/avatars-facemask/avatar25.png";
    } else if (this.state.avatar === "26") {
      chosenImg = "./images/avatars-facemask/avatar26.png";
    } else if (this.state.avatar === "27") {
      chosenImg = "./images/avatars-facemask/avatar27.png";
    } else if (this.state.avatar === "28") {
      chosenImg = "./images/avatars-facemask/avatar28.png";
    } else if (this.state.avatar === "29") {
      chosenImg = "./images/avatars-facemask/avatar29.png";
    } else if (this.state.avatar === "30") {
      chosenImg = "./images/avatars-facemask/avatar30.png";
    } else if (this.state.avatar === "31") {
      chosenImg = "./images/avatars-facemask/avatar31.png";
    } else if (this.state.avatar === "32") {
      chosenImg = "./images/avatars-facemask/avatar32.png";
    } else if (this.state.avatar === "33") {
      chosenImg = "./images/avatars-facemask/avatar33.png";
    } else if (this.state.avatar === "34") {
      chosenImg = "./images/avatars-facemask/avatar34.png";
    } else if (this.state.avatar === "35") {
      chosenImg = "./images/avatars-facemask/avatar35.png";
    } else if (this.state.avatar === "36") {
      chosenImg = "./images/avatars-facemask/avatar36.png";
    } else if (this.state.avatar === "37") {
      chosenImg = "./images/avatars-facemask/avatar37.png";
    } else if (this.state.avatar === "38") {
      chosenImg = "./images/avatars-facemask/avatar38.png";
    } else if (this.state.avatar === "39") {
      chosenImg = "./images/avatars-facemask/avatar39.png";
    } else if (this.state.avatar === "40") {
      chosenImg = "./images/avatars-facemask/avatar40.png";
    } else if (this.state.avatar === "41") {
      chosenImg = "./images/avatars-facemask/avatar41.png";
    } else if (this.state.avatar === "42") {
      chosenImg = "./images/avatars-facemask/avatar42.png";
    } else if (this.state.avatar === "43") {
      chosenImg = "./images/avatars-facemask/avatar43.png";
    } else if (this.state.avatar === "44") {
      chosenImg = "./images/avatars-facemask/avatar44.png";
    } else if (this.state.avatar === "45") {
      chosenImg = "./images/avatars-facemask/avatar45.png";
    } else if (this.state.avatar === "46") {
      chosenImg = "./images/avatars-facemask/avatar46.png";
    } else if (this.state.avatar === "47") {
      chosenImg = "./images/avatars-facemask/avatar47.png";
    } else if (this.state.avatar === "48") {
      chosenImg = "./images/avatars-facemask/avatar48.png";
    } else if (this.state.avatar === "49") {
      chosenImg = "./images/avatars-facemask/avatar49.png";
    } else if (this.state.avatar === "50") {
      chosenImg = "./images/avatars-facemask/avatar50.png";
    } else if (this.state.avatar === "51") {
      chosenImg = "./images/avatars-facemask/avatar51.png";
    } else if (this.state.avatar === "52") {
      chosenImg = "./images/avatars-facemask/avatar52.png";
    } else if (this.state.avatar === "53") {
      chosenImg = "./images/avatars-facemask/avatar53.png";
    } else if (this.state.avatar === "54") {
      chosenImg = "./images/avatars-facemask/avatar54.png";
    } else if (this.state.avatar === "55") {
      chosenImg = "./images/avatars-facemask/avatar55.png";
    } else if (this.state.avatar === "56") {
      chosenImg = "./images/avatars-facemask/avatar56.png";
    } else if (this.state.avatar === "57") {
      chosenImg = "./images/avatars-facemask/avatar57.png";
    } else if (this.state.avatar === "58") {
      chosenImg = "./images/avatars-facemask/avatar58.png";
    } else if (this.state.avatar === "59") {
      chosenImg = "./images/avatars-facemask/avatar59.png";
    } else if (this.state.avatar === "60") {
      chosenImg = "./images/avatars-facemask/avatar60.png";
    } else if (this.state.avatar === "61") {
      chosenImg = "./images/avatars-facemask/avatar61.png";
    } else if (this.state.avatar === "62") {
      chosenImg = "./images/avatars-facemask/avatar62.png";
    } else if (this.state.avatar === "63") {
      chosenImg = "./images/avatars-facemask/avatar63.png";
    } else if (this.state.avatar === "64") {
      chosenImg = "./images/avatars-facemask/avatar64.png";
    } else if (this.state.avatar === "65") {
      chosenImg = "./images/avatars-facemask/avatar65.png";
    } else if (this.state.avatar === "66") {
      chosenImg = "./images/avatars-facemask/avatar66.png";
    } else if (this.state.avatar === "67") {
      chosenImg = "./images/avatars-facemask/avatar67.png";
    } else if (this.state.avatar === "68") {
      chosenImg = "./images/avatars-facemask/avatar68.png";
    } else if (this.state.avatar === "69") {
      chosenImg = "./images/avatars-facemask/avatar69.png";
    } else if (this.state.avatar === "70") {
      chosenImg = "./images/avatars-facemask/avatar70.png";
    } else if (this.state.avatar === "71") {
      chosenImg = "./images/avatars-facemask/avatar71.png";
    } else if (this.state.avatar === "72") {
      chosenImg = "./images/avatars-facemask/avatar72.png";
    } else if (this.state.avatar === "73") {
      chosenImg = "./images/avatars-facemask/avatar73.png";
    } else if (this.state.avatar === "74") {
      chosenImg = "./images/avatars-facemask/avatar74.png";
    } else if (this.state.avatar === "75") {
      chosenImg = "./images/avatars-facemask/avatar75.png";
    } else if (this.state.avatar === "76") {
      chosenImg = "./images/avatars-facemask/avatar76.png";
    } else if (this.state.avatar === "77") {
      chosenImg = "./images/avatars-facemask/avatar77.png";
    } else if (this.state.avatar === "78") {
      chosenImg = "./images/avatars-facemask/avatar78.png";
    } else if (this.state.avatar === "79") {
      chosenImg = "./images/avatars-facemask/avatar79.png";
    } else if (this.state.avatar === "80") {
      chosenImg = "./images/avatars-facemask/avatar80.png";
    } else if (this.state.avatar === "81") {
      chosenImg = "./images/avatars-facemask/avatar81.png";
    } else if (this.state.avatar === "82") {
      chosenImg = "./images/avatars-facemask/avatar82.png";
    } else if (this.state.avatar === "83") {
      chosenImg = "./images/avatars-facemask/avatar83.png";
    } else if (this.state.avatar === "84") {
      chosenImg = "./images/avatars-facemask/avatar84.png";
    } else if (this.state.avatar === "85") {
      chosenImg = "./images/avatars-facemask/avatar85.png";
    } else if (this.state.avatar === "86") {
      chosenImg = "./images/avatars-facemask/avatar86.png";
    } else if (this.state.avatar === "87") {
      chosenImg = "./images/avatars-facemask/avatar87.png";
    } else if (this.state.avatar === "88") {
      chosenImg = "./images/avatars-facemask/avatar88.png";
    } else if (this.state.avatar === "89") {
      chosenImg = "./images/avatars-facemask/avatar89.png";
    } else if (this.state.avatar === "90") {
      chosenImg = "./images/avatars-facemask/avatar90.png";
    } else if (this.state.avatar === "91") {
      chosenImg = "./images/avatars-facemask/avatar91.png";
    } else if (this.state.avatar === "92") {
      chosenImg = "./images/avatars-facemask/avatar92.png";
    } else if (this.state.avatar === "93") {
      chosenImg = "./images/avatars-facemask/avatar93.png";
    } else if (this.state.avatar === "94") {
      chosenImg = "./images/avatars-facemask/avatar94.png";
    } else if (this.state.avatar === "95") {
      chosenImg = "./images/avatars-facemask/avatar95.png";
    } else if (this.state.avatar === "96") {
      chosenImg = "./images/avatars-facemask/avatar96.png";
    } else if (this.state.avatar === "97") {
      chosenImg = "./images/avatars-facemask/avatar97.png";
    } else if (this.state.avatar === "98") {
      chosenImg = "./images/avatars-facemask/avatar98.png";
    } else if (this.state.avatar === "99") {
      chosenImg = "./images/avatars-facemask/avatar99.png";
    } else if (this.state.avatar === "100") {
      chosenImg = "./images/avatars-facemask/avatar100.png";
    } else if (this.state.avatar === "101") {
      chosenImg = "./images/avatars-facemask/avatar101.png";
    } else if (this.state.avatar === "102") {
      chosenImg = "./images/avatars-facemask/avatar102.png";
    } else if (this.state.avatar === "103") {
      chosenImg = "./images/avatars-facemask/avatar103.png";
    } else if (this.state.avatar === "104") {
      chosenImg = "./images/avatars-facemask/avatar104.png";
    } else {
      return await this.setState({
        errorMsg: "Enter numbers only between 1 and 104!",
      });
    }

    await this.setState((prevState) => ({
      avatarNumber: [...prevState.avatarNumber, this.state.avatar],
      avatarImages: [...prevState.avatarImages, chosenImg],
      avatar: "",
      errorMsg: "",
    }));
  };

  removeAvatar = ({ currentTarget }) => {
    this.setState((prevState) => ({
      avatarImages: prevState.avatarImages.filter(
        (avatar) => avatar !== currentTarget.value
      ),
    }));
  };

  removeName = ({ currentTarget }) => {
    this.setState((prevState) => ({
      namesArray: prevState.namesArray.filter(
        (name) => name !== currentTarget.value
      ),
    }));
  };

  submitFamilyName = async (e) => {
    e.preventDefault();

    if (!this.state.familyInput) {
      return this.setState({
        errorMsg: "Type your Family Name to continue!",
      });
    }
    await this.setState({
      isFamilyName: true,
      familyNameConfirmed:
        this.state.familyInput.charAt(0).toUpperCase() +
        this.state.familyInput.slice(1),
      lastnameEditMode: false,
      errorMsg: "",
    });
  };

  modifyLastName = () => {
    this.setState({
      lastnameEditMode: true,
    });
  };

  model1ActiveHandler = () => {
    this.setState({
      model1: true,
      model2: false,
      model3: false,
      showWarningMsg: true,
      showModelSelected: true,
    });
  };

  model2ActiveHandler = () => {
    this.setState({
      model2: true,
      model1: false,
      model3: false,
      showWarningMsg: true,
      showModelSelected: true,
    });
  };

  model3ActiveHandler = () => {
    this.setState({
      model3: true,
      model1: false,
      model2: false,
      showWarningMsg: true,
      showModelSelected: true,
    });
  };

  showPreviewScreenHandler = () => {
    if (this.state.avatarImages.length < 1) {
      return this.setState({
        errorMsg: "Oops! You must add your avatar numbers above",
      });
    }
    if (
      this.state.namesArray.length === 0 &&
      this.state.wallHolder === "faceMask"
    ) {
      return this.setState({
        errorMsg: "Oops! You forgot to add the names for the wall hooks",
      });
    }
    this.setState({
      showPreviewScreen: !this.state.showPreviewScreen,
      avatar: "",
      errorMsg: "",
      model1: false,
      model2: false,
      model3: false,
    });
  };

  submitFinalProduct = async () => {
    await this.setState({
      showWarningMsg: false,
    });

    this.props.screenShotFunction();
    await this.setState({
      model3: false,
      model1: false,
      model2: false,
      showPreviewScreen: false,
      avatarNumber: [],
      avatarImages: [],
      namesArray: [],
      avatar: "",
      isFamilyName: false,
      errorMsg: "",
      familyNameConfirmed: "",
      lastnameEditMode: false,
      wallHolder: "",
      familyInput: "",
      chosenModel: false,
      nameForFaceMask: "",
    });
  };

  addNameHandler = async (e) => {
    e.preventDefault();
    if (this.state.nameForFaceMask === "") {
      return this.setState({
        errorMsg: "Field cannot be blank",
      });
    }
    if (!isNaN(this.state.nameForFaceMask)) {
      return this.setState({
        errorMsg: "Only letters allowed!",
      });
    }
    if (this.state.namesArray.length === 6) {
      return this.setState({
        errorMsg: "Sorry!, you've entered the maximum number of names allowed",
      });
    }
    await this.setState((prevState) => ({
      namesArray: [
        ...prevState.namesArray,
        this.state.nameForFaceMask.charAt(0).toUpperCase() +
          this.state.nameForFaceMask.slice(1),
      ],
      nameForFaceMask: "",
      errorMsg: "",
    }));
  };

  render() {
    let familyNameConfirmed = this.state.familyNameConfirmed;

    const nameForFaceMask = this.state.namesArray;
    const namesList =
      nameForFaceMask.length > 0
        ? nameForFaceMask.map((name, index) => {
            return (
              <span className="name-hook" key={index}>
                {index + 1}. {name}{" "}
                {this.state.showPreviewScreen ? null : (
                  <button
                    className="removeName-btn"
                    onClick={this.removeName}
                    value={name}
                  >
                    X
                  </button>
                )}
              </span>
            );
          })
        : null;

    const namesListForBg =
      nameForFaceMask.length > 0
        ? nameForFaceMask.map((name, index) => {
            return (
              <div
                key={index}
                className={
                  nameForFaceMask.length <= 3
                    ? "name-hook-container__lessThan3"
                    : nameForFaceMask.length <= 5
                    ? "name-hook-container__range4-5"
                    : "name-hook-container__range6"
                }
              >
                <p
                  className={
                    nameForFaceMask.length < 6
                      ? "name-hook-on-bg"
                      : "name-hook-on-bg__smallerFontSize"
                  }
                >
                  {name}
                </p>
                <img
                  className="hook-single-img"
                  src="./images/hook-single.png"
                  alt="wall hook"
                />
              </div>
            );
          })
        : null;

    const avatarsImages = this.state.avatarImages;
    const avatarImgList =
      avatarsImages.length > 0
        ? avatarsImages.map((img, index) => {
            return (
              <div key={index} className="avatarImg-btn-container">
                <img className="avatar-image" src={img} alt="avatar" />
                {this.state.showPreviewScreen ? null : (
                  <button
                    onClick={this.removeAvatar}
                    value={img}
                    className="removeAvatar"
                  >
                    x
                  </button>
                )}
              </div>
            );
          })
        : null;

    const avatarImagesWoodenBg =
      avatarsImages.length > 0
        ? avatarsImages.map((img, index) => {
            return (
              <div
                key={index}
                className={
                  avatarsImages.length > 7
                    ? "avatarImg-btn-container-woodenBg__severalAvatars"
                    : "avatarImg-btn-container-woodenBg"
                }
              >
                <img
                  className={
                    avatarsImages.length > 7
                      ? "avatar-image-woodenBg-smaller"
                      : "avatar-image-woodenBg"
                  }
                  src={img}
                  alt="avatar"
                />
              </div>
            );
          })
        : null;

    if (!this.props.faceMaskWasChosen) {
      return (
        <div className="face-mask-container">
          <img
            className="wood-sign-face-mask"
            src={this.props.img}
            alt="face mask"
          />
          <img
            className="wood-sign-face-mask__keys"
            src="./images/smith-family-drawing.png"
            alt="face mask"
          />
        </div>
      );
    } else {
      return (
        <div id="product-screen-container-facemask">
          {this.state.familyNameConfirmed.length > 0 ? (
            <div className="virtual-wood-sign-container">
              <h3 className="virtual-wood-sign-container__heading">
                {this.state.familyNameConfirmed.charAt(0).toUpperCase() +
                  this.state.familyNameConfirmed.slice(1)}{" "}
                Family
                {""}{" "}
                <button
                  className="edit-familyName-btn"
                  onClick={this.modifyLastName}
                >
                  Edit Last Name
                </button>
              </h3>

              {this.state.lastnameEditMode ? (
                <form>
                  <label className="lastName-label" htmlFor="family-input">
                    Type your Family Name{" "}
                  </label>
                  <input
                    defaultValue={this.state.familyNameConfirmed}
                    className="lastName-input"
                    name="familyInput"
                    onChange={this.changeHandler}
                    id="family-input"
                    type="text"
                  />
                  <button
                    className="lastName-submit-btn"
                    onClick={this.submitFamilyName}
                  >
                    Click to submit changes
                  </button>
                  <p className="error-msg-wood-sign">{this.state.errorMsg}</p>
                </form>
              ) : null}
              <hr />

              <div className="avatarImgList-wrapper">{avatarImgList}</div>
              <div className="namesList-wrapper">
                {nameForFaceMask.length > 0 ? (
                  <div className="nameHooks-title">
                    <p className="text-center">
                      These names will be on top of each hook. Only add the
                      person's names and not the pet's names
                    </p>
                    <hr />
                  </div>
                ) : null}
                {namesList}
              </div>
            </div>
          ) : null}

          {this.state.wallHolder === "" ? (
            <div>
              <h1 className="wooden-sign-primary-heading">Choose one below</h1>
              <hr />
              <div className="wood-sign-images-container">
                <div
                  onClick={this.faceMaskHandler}
                  className="wood-sign-img-parent wood-sign-img-parent__face-mask"
                >
                  <h1 className="wooden-sign-secondary-heading">
                    Wooden Face Mask Wall Holder
                  </h1>
                  <img
                    className="wood-sign-images"
                    src="./images/wood-sign-face-mask.png"
                    alt="face mask holder"
                  />
                </div>

                <div
                  onClick={this.keyHolderHandler}
                  className="wood-sign-img-parent wood-sign-img-parent__keys"
                >
                  <h1 className="wooden-sign-secondary-heading">
                    Wooden Key Holder
                  </h1>
                  <img
                    className="wood-sign-images"
                    src="./images/smith-family-drawing.png"
                    alt="face mask holder"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {this.state.isFamilyName ? (
                <div>
                  {!this.state.showPreviewScreen ? (
                    <div>
                      <form
                        onSubmit={
                          this.state.wallHolder === "keyHolder"
                            ? this.addAvatarHandler
                            : this.addAvatarHandlerFaceMask
                        }
                      >
                        <label
                          className="avatarNumber-label"
                          htmlFor="family-input"
                        >
                          Type Avatar Number{" "}
                          <i className="fas fa-arrow-alt-circle-right"></i>
                        </label>
                        <input
                          className="inputNumber"
                          placeholder="type here"
                          value={this.state.avatar}
                          name="avatar"
                          onChange={this.changeHandler}
                          id="avatar-input"
                          type="text"
                        />
                        <button className="addAvatar-btn">
                          <i className="fas fa-user-plus"></i> Add Avatar
                        </button>
                      </form>
                      {this.state.wallHolder === "faceMask" ? (
                        <form>
                          <label className="avatarNumber-label">
                            Add Names{" "}
                            <i className="fas fa-arrow-alt-circle-right"></i>
                          </label>
                          <input
                            maxLength="10"
                            className="inputName"
                            placeholder="type here"
                            value={this.state.nameForFaceMask}
                            name="nameForFaceMask"
                            onChange={this.changeHandler}
                            type="text"
                          />
                          <button
                            className="addAvatar-btn"
                            onClick={this.addNameHandler}
                          >
                            Add Name for Hooks
                          </button>
                        </form>
                      ) : null}
                      <p className="error-msg-wood-sign">
                        {this.state.errorMsg}
                      </p>

                      <hr />

                      <button
                        onClick={this.showPreviewScreenHandler}
                        className="done-btn-wood-sign"
                      >
                        <i className="fas fa-user-check"></i> Click here when
                        you're done
                      </button>
                    </div>
                  ) : (
                    <button
                      className="reset-progress-btn"
                      onClick={this.showPreviewScreenHandler}
                    >
                      Back to edit avatars
                    </button>
                  )}

                  {this.state.wallHolder === "faceMask" ? (
                    <div>
                      {!this.state.showPreviewScreen ? (
                        <div>
                          <h1 className="choose-avatars-title">
                            <i className="fas fa-arrow-down"></i> Choose your
                            avatars <i className="fas fa-arrow-down"></i>
                          </h1>
                          <img
                            className="avatars-poster"
                            src="./images/wood-sign-face-masks-avatars.png"
                            alt="avatars"
                          />{" "}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      {!this.state.showPreviewScreen ? (
                        <div>
                          <h1 className="choose-avatars-title">
                            <i className="fas fa-arrow-down"></i> Choose your
                            avatars and type the avatar-number above{" "}
                            <i className="fas fa-arrow-down"></i>
                          </h1>{" "}
                          <img
                            className="avatars-poster"
                            src="./images/wood-sign-keys-avatars.png"
                            alt="avatars"
                          />{" "}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              ) : (
                <form>
                  <label className="lastName-label" htmlFor="family-input">
                    Type your Family Name{" "}
                  </label>{" "}
                  <input
                    className="lastName-input"
                    name="familyInput"
                    onChange={this.changeHandler}
                    id="family-input"
                    type="text"
                  />
                  <button
                    className="lastName-submit-btn"
                    onClick={this.submitFamilyName}
                  >
                    Click to start
                  </button>
                  <p className="error-msg-wood-sign">{this.state.errorMsg}</p>
                </form>
              )}
            </div>
          )}

          {/* Screen Confirming creation of product */}

          {this.state.showPreviewScreen ? (
            <div className="model-content-container">
              <div className="model-img-container">
                <h5
                  className={
                    this.state.model1 || this.state.model2 || this.state.model3
                      ? "models-title-no-flashing"
                      : "models-title text-center"
                  }
                >
                  &#8595; Select your model &#8595;
                </h5>

                <div
                  className={
                    this.state.model1
                      ? "model-img-parent--1"
                      : "model-img-parent"
                  }
                >
                  {this.state.wallHolder === "keyHolder" ? (
                    <img
                      className="model-img"
                      src="./images/wood-family-model1.png"
                      alt="model1"
                    />
                  ) : (
                    <img
                      className="model-img"
                      src="./images/wood-family-faceMask-model1.png"
                      alt="model1"
                    />
                  )}

                  <Link
                    activeClass="active"
                    to="product-preview"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <p
                      onClick={this.model1ActiveHandler}
                      className="text-center select-model"
                    >
                      {" "}
                      Select Model 1
                    </p>
                  </Link>
                </div>
                <div
                  className={
                    this.state.model2
                      ? "model-img-parent--2"
                      : "model-img-parent"
                  }
                >
                  {this.state.wallHolder === "keyHolder" ? (
                    <img
                      className="model-img"
                      src="./images/wood-family-model2.png"
                      alt="model1"
                    />
                  ) : (
                    <img
                      className="model-img"
                      src="./images/wood-family-faceMask-model2.png"
                      alt="model1"
                    />
                  )}

                  <Link
                    activeClass="active"
                    to="product-preview"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <p
                      onClick={this.model2ActiveHandler}
                      className="text-center select-model"
                    >
                      Select Model 2
                    </p>
                  </Link>
                </div>
                <div
                  className={
                    this.state.model3
                      ? "model-img-parent--3"
                      : "model-img-parent"
                  }
                >
                  {this.state.wallHolder === "keyHolder" ? (
                    <img
                      className="model-img"
                      src="./images/wood-family-model3.png"
                      alt="model1"
                    />
                  ) : (
                    <img
                      className="model-img"
                      src="./images/wood-family-faceMask-model3.png"
                      alt="model1"
                    />
                  )}

                  <Link
                    activeClass="active"
                    to="product-preview"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <p
                      onClick={this.model3ActiveHandler}
                      className="text-center select-model"
                    >
                      Select Model 3
                    </p>
                  </Link>
                </div>
              </div>
              {this.state.model1 || this.state.model2 || this.state.model3 ? (
                <div>
                  <button
                    className="finish-add-product-to-cart-btn"
                    onClick={this.submitFinalProduct}
                  >
                    <i className="fas fa-cart-plus"></i> Finish and Add product
                    to Cart
                  </button>
                  {this.state.showModelSelected ? (
                    <p className="text-center">
                      <strong>
                        {this.state.model1
                          ? "Model 1"
                          : this.state.model2
                          ? "Model 2"
                          : this.state.model3
                          ? "Model 3"
                          : "No Model has been selected"}
                      </strong>
                    </p>
                  ) : null}
                  <h2 className="text-center">
                    &#8595; Product Preview &#8595; <br />
                  </h2>
                  {this.state.showWarningMsg ? (
                    <p className="noteAvatarsTitle text-center">
                      <span className="important">IMPORTANT</span>: Avatars{" "}
                      {this.state.wallHolder === "faceMask" ? (
                        <span>and Names</span>
                      ) : null}{" "}
                      will be nicely distributed and positioned, accordingly to
                      the chosen model when we make the product.{" "}
                      <span className="important">
                        {" "}
                        <br />
                        We will arrange and fix the position of the items the
                        same way as the chosen model.
                      </span>{" "}
                      This Preview just represents the avatars and the names to
                      be used to create the design; therefore, it's not an
                      actual representation of the final product.
                    </p>
                  ) : null}

                  <div className="wood-bg-img-container">
                    <div
                      className={
                        this.state.wallHolder === "faceMask"
                          ? "wood-bg-img-container-faceMask"
                          : "wood-bg-img-container-keyHolder"
                      }
                    >
                      <h1
                        className={
                          familyNameConfirmed.length >= 17
                            ? "wooden-bg-family-name__longest"
                            : familyNameConfirmed.length >= 14
                            ? "wooden-bg-family-name__longer"
                            : familyNameConfirmed.length >= 10
                            ? "wooden-bg-family-name__long"
                            : "wooden-bg-family-name__short"
                        }
                      >
                        {familyNameConfirmed + " Family"}
                        {this.state.wallHolder === "faceMask" ? (
                          <span className="text-center year-on-bg">2020</span>
                        ) : null}
                      </h1>

                      <div className="avatar-img-list-container">
                        {avatarImagesWoodenBg}
                      </div>
                      {this.state.wallHolder === "faceMask" ? (
                        <div>
                          <h2 className="text-center heading-faceMasStation">
                            Face-Mask Station
                          </h2>
                          <div className="namesList-on-bg-wrapper">
                            {namesListForBg}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <button
                      className="finish-add-product-to-cart-btn"
                      onClick={this.submitFinalProduct}
                    >
                      <i className="fas fa-cart-plus"></i> Finish and Add
                      product to Cart
                    </button>
                  </div>
                </div>
              ) : (
                <h4 className="text-center choose-model-title">
                  &#8593; Select your model &#8593;
                </h4>
              )}
            </div>
          ) : null}
          <div id="product-preview"></div>
        </div>
      );
    }
  }
}

export default index;

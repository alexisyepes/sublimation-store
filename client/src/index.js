import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./fonts/NuevaStd-Regular.otf";
import "./fonts/NuevaStd-Bold.otf";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

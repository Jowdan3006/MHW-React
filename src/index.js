import React from "react";
import ReactDOM from "react-dom";
import Main from "./containers";

import "../node_modules/jquery/dist/jquery.min.js"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./css/index.css";

ReactDOM.render(
  <Main/>, 
  document.getElementById("root")
);

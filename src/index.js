import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

// import ThirdWeb
import {ThirdwebWeb3Provider} from '@3rdweb/hooks';

// include what chain you wanna support.
// 4 = Rinkeby
const supportedChainIds = [4];

// include what type of wallet you want to support.
// in this case we support metamask which is an "injected wallet".
const connectors = {
  injected: {},
};

// finally wrap app with ThirdWeb3Provider.
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors = {connectors}
      supportedChainIds={supportedChainIds}
    >
      
    <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

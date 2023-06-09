import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SafeUI from "./safeUI/SafeUI";
import reportWebVitals from "./reportWebVitals";

/**
 * Project is compiled into .js and ran as a script once `npm run build` is 
 * complete within 'index.html'
 *
 * All other elements are established in the other files. If in VSCode you can
 * ctrl+left click <SafeUI/> to see the connection and how that path is made.
 * - Alex (Capstone team Spring '23)
 */

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="container">
      <SafeUI></SafeUI>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
//HOWEVER THIS MUST BE IMPORTED HERE FIRST!
import React from "react";
import SafeUI from "./safeUI/SafeUI";
import "./App.css";
import ReceiverDashboard from "./safeReceiverDashboard/safeReceiverDashboard";

/*
 * This is where the "app" is selected to run. What we call here will be an
 * instance of the sender to be loaded for the user similar to something such as
 * this...
 *  function App() {
 *  return (
 *   <div className="container">
 *     <SafeUI></SafeUI>
 *   </div>
 * );
 * }
 *
 * Change how best to make this actually work but this is just a way to demo
 * to everyone how it works.
 * Not sure how it all links together? ctrl+left click 'SafeUI' in VSCode to go
 * to the connecting source
 *
 * - Alex
 */
//changed for testing only. will change back before merging
function App() {
  return (
    <div className="container">
      <ReceiverDashboard></ReceiverDashboard>
    </div>
  );
}

export default App;

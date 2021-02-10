import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Camera from "./Components/Camera";
import EditImage from "./Components/EditImage/EditImage";
import Rating from "./Components/Rating/Rating";

function App() {
  return (
    <div>
      {/* <Camera /> */}
      <Router>
        <Route exact path="/">
          <EditImage />
        </Route>
        <Route exact path="/rating">
          <Rating />
        </Route>
      </Router>
    </div>
  );
}

export default App;

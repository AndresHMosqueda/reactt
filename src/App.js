import React, { Component } from "react";
import Table from "./Table";
import MyNavBar from "./Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyNavBar />
        Magic Log Test
        <br />
        <Table />
      </div>
    );
  }
}

export default App;

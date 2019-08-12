import React, { Component } from "react";

import "./App.css";
import Nav from "./components/Nav";
import Feed from "./components/Feed";

export default class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Feed />
      </>
    );
  }
}

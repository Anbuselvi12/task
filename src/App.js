import React from "react";
import Nav from "./components/Nav/Nav";
import Home from "./Home/Home";
import "./index.scss";

export default function App() {
  return (
    <div>
      <Nav />
      <div className="app">
        <Home />
      </div>
    </div>
  );
}

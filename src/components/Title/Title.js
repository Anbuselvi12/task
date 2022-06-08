import React from "react";
import "./title.scss";

export default function Title({ title }) {
  return (
    <>
      <div className="title">
        <h2 className="title__heading">{title}</h2>
      </div>
    </>
  );
}

import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-head">
        <span className="year">{props.year}</span>
        <span className="category">{props.category}</span>
      </div>
      <div className="card-body">{props.cardBody}</div>
    </div>
  );
}

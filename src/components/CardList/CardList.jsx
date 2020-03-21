import React from "react";
import "./CardList.css";
import Card from "../Card/Card";

export default function CardList({ data }) {
  return (
    <div className="cardList">
      {data.map((item, index) => (
        <Card item={item} index={index} />
      ))}
    </div>
  );
}

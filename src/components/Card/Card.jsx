import React from "react";
import "./Card.css";
import CharacterModal from "../Modal/Modal";

export default function Card({ item, index }) {
  const [open, setOpen] = React.useState(false);
  const Modal = React.createRef();

  const image = require(`../../assets/${index + 1}.jpg`);

  return (
    <div id={index} className="card br4 bb0 grow">
      <img className="img" src={image} alt="" onClick={() => setOpen(true)} />
      <p className="name f5 mv0 pv2 ph3">{item.name + (index + 1)}</p>
      <CharacterModal
        ref={Modal}
        item={item}
        image={image}
        isOpen={open}
        closeModal={() => setOpen(false)}
      />
    </div>
  );
}

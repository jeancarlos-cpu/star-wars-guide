import React, { Component } from "react";
import "./Card.css";
import CharacterModal from "../Modal/Modal";

export default class Card extends Component {
  constructor() {
    super();
    this.Modal = React.createRef();
    this.state = {
      open: false,
      mounted: false
    };
  }

  handleModal = () => {
    this.Modal.current.openModal();
  };

  render() {
    const { item, index } = this.props;
    const image = require(`../../assets/${index + 1}.jpg`);
    // let image = [];
    // index < 16 && index < 35
    //   ? (image = require(`../../assets/${index + 1}.jpg`))
    //   : (image = require(`../../assets/${index + 2}.jpg`));

    return (
      <div id={index} className="card br4 bb0 grow" onClick={this.handleModal}>
        <img className="img" src={image} alt="" />
        <p className="name f5 mv0 pv2 ph3">{item.name + (index + 1)}</p>
        <CharacterModal ref={this.Modal} item={item} image={image} />
      </div>
    );
  }
}

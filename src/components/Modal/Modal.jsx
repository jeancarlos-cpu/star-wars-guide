import React from "react";
import Modal from "react-modal";
import Table from "../Table/Table";
import { CloseButton, Container } from "./styles.js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "75vh",
    maxWidth: "90vw"
  }
};

Modal.setAppElement("#root");

export default function CharacterModal(props) {
  const image = props.image;
  return (
    <div>
      <Modal isOpen={props.isOpen} style={customStyles} contentLabel="Modal">
        <CloseButton onClick={props.closeModal} />

        <Container>
          <div>
            <img className="br4 shadow-5" src={image} alt="" />
          </div>
          <Table data={props.profile} title={props.name} transpose={true} />
          <Table data={props.species} title={"Species"} transpose={true} />
          <Table data={props.homeworld} title={"Homeworld"} transpose={true} />
          <Table data={props.vehicles} title={"vehicles"} />
          <Table data={props.starships} title={"starships"} />
          <Table data={props.films} title={"Films"} />
        </Container>
      </Modal>
    </div>
  );
}

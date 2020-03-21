import React from "react";
import Modal from "react-modal";
import Table from "../Table/Table";
import "./Modal.css";

/* faltam filmes e naves.
organizar as naves e os veiculos em tabelas.
colocar borda na imagem.
colocar uma animacao no loading.
mudar a fonte dos itens.
remover o titulo de veiculo e nave se nao houver.
 */

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
      <Modal
        isOpen={props.isOpen}
        style={customStyles}
        contentLabel="Modal"
        overlayClassName="Overlay"
      >
        <div>
          <span className="close" onClick={props.closeModal}></span>
        </div>

        <div className="modal">
          <div>
            <img className="imgmodal br4 shadow-5" src={image} alt="" />
          </div>
          <div className="transpose-table">
            <Table data={props.profile} title={props.name} />
          </div>
          <div className="transpose-table">
            <Table data={props.species} title={"Species"} />
          </div>
          <div className="transpose-table">
            <Table data={props.homeworld} title={"Homeworld"} />
          </div>
          <Table data={props.vehicles} title={"vehicles"} />
          <Table data={props.starships} title={"starships"} />
          <Table data={props.films} title={"Films"} />
        </div>
      </Modal>
    </div>
  );
}

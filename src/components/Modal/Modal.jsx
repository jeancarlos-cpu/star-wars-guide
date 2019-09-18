import React from 'react';
import Modal from 'react-modal';
import './Modal.css';
import { promises } from 'dns';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


Modal.setAppElement('#root')

export default class CharacterModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            general: [],
            species: {},
            homeworld: [],
            vehicles: [],
            starships: [],
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
        const data = this.props.item;
        Promise.resolve(this.fetchData(data.species)).then(e => {
            const { name, classification, designation, average_lifespan, language } = e;
            this.setState(
                {
                    species: {
                        name,
                        classification,
                        designation,
                        average_lifespan,
                        language,
                    }
                }
            )
        });

        const films = data.films.map(e => this.fetchData(e));



        Promise.all(films).then(console.log);
        const vehicles = data.vehicles.map(e => this.fetchData(e));
        Promise.all(vehicles).then(console.log);
        const starships = data.vehicles.map(e => this.fetchData(e));
        Promise.all(starships).then(console.log);
        Promise.resolve(this.fetchData(data.homeworld)).then(console.log);
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal(e) {
        e.stopPropagation();
        this.setState({ modalIsOpen: false });
    }

    async fetchData(data) {
        const response = await fetch(data);
        return await response.json();

    }

    componentDidMount() {
        const data = (this.props.item);
        this.setState({ general: [data.height, data.mass, data.hair_color, data.skin_color, data.eye_color, data.birth_year, data.gender] });
    }

    render() {
        const generalKey = ['Height (m)', 'Mass (kg)', 'Hair color', 'Skin color', 'Eye color', 'Birth year', 'Gender'];
        const image = this.props.image;

        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    overlayClassName="Overlay"
                >
                    <div>
                        <h2 ref={subtitle => this.subtitle = subtitle}></h2>
                    </div>

                    <div className="modal">
                        <div>
                            <img className="imgmodal" src={image} alt="" />
                        </div>
                        <div>
                            <ul>
                                <h2>{this.props.item.name}</h2>
                                {
                                    this.state.general.length ?
                                        generalKey.map((e, i) => {
                                            return (
                                                <li>{generalKey[i]}: {this.state.general[i]}</li>
                                            )
                                        })
                                        :
                                        <li>Loading</li>
                                }
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <h2>{"Species"}</h2>
                                {
                                    this.state.species ?
                                        Object.entries(this.state.species).map((info, i) => {
                                            return (
                                            <li>{info[0].charAt(0).toUpperCase() + info[0].slice(1).replace(/_/g, ' ')}: {info[1]}</li>
                                                )
                                        })
                                        :
                                        <li>Loading</li>
                                }
                            </ul>
                        </div>
                    </div>


                </Modal>
            </div>
        );
    }
}

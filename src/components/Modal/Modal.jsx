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
            species: [],
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
        Promise.resolve(this.fetchData(data.species))
            .then(e => {
                const { name, classification, designation, average_lifespan, language } = e;
                this.setState(
                    {
                        species: [{
                            name,
                            classification,
                            designation,
                            average_lifespan,
                            language,
                        }]
                    }
                )
            });

        Promise.all(data.vehicles.map(e => this.fetchData(e)))
            .then(response => response.map(vehicle => {
                const { name, model, manufacturer, crew, passengers } = vehicle;
                return {
                    name,
                    model,
                    manufacturer,
                    crew,
                    passengers
                }
            })).then(vehicles => this.setState({ vehicles }));


        // const films = data.films.map(e => this.fetchData(e));
        // Promise.all(films).then(console.log);



        // const starships = data.vehicles.map(e => this.fetchData(e));
        // Promise.all(starships).then(console.log);
        // Promise.resolve(this.fetchData(data.homeworld)).then(console.log);
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
        const { height, mass, hair_color, skin_color, eye_color, birth_year, gender } = (this.props.item);
        this.setState({
            general: [{
                height,
                mass,
                hair_color,
                skin_color,
                eye_color,
                birth_year,
                gender,
            }]
        });
    }

    renderList = (data) => {
        const list = data.map(data => {
            return (
                Object.entries(data).map((info, i) => {
                    return (
                        <li>{info[0].charAt(0).toUpperCase() + info[0].slice(1).replace(/_/g, ' ')}: {info[1]}</li>
                    )
                }))
        })
        return list;
    }

    isObjEmpty = (obj) => {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    render() {
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
                                    this.isObjEmpty(this.state.general) ?
                                        <li>Loading</li>
                                        :
                                        this.renderList(this.state.general)
                                }
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <h2>{"Species"}</h2>
                                {
                                    this.isObjEmpty(this.state.species) ?
                                        <li>Loading</li>
                                        :
                                        this.renderList(this.state.species)
                                }
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <h2>{"vehicles"}</h2>
                                {
                                    !this.state.vehicles.length ?
                                        <li>Loading</li>
                                        :
                                        this.state.vehicles.map(data => {
                                            return (
                                                Object.entries(data).map((info, i) => {
                                                    return (
                                                        <li>{info[0].charAt(0).toUpperCase() + info[0].slice(1).replace(/_/g, ' ')}: {info[1]}</li>
                                                    )
                                                }))
                                        })
                                     
                                }


                            </ul>
                        </div>
                    </div>


                </Modal>
            </div>
        );
    }
}

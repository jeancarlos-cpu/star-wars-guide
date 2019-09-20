import React from 'react';
import Modal from 'react-modal';
import './Modal.css';

/* faltam filmes e naves.
organizar as naves e os veiculos em tabelas.
colocar borda na imagem.
colocar uma animacao no loading.
mudar a fonte dos itens.
remover o titulo de veiculo e nave se nao houver.
 */

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
            })).then(vehicles => this.setState({ vehicles }))
            .finally(this.state.vehicles.length === 0 && this.setState({ vehicles: null }));


        Promise.all(data.starships.map(e => this.fetchData(e)))
            .then(response => response.map(starships => {
                const { name, model, manufacturer, crew, passengers } = starships;
                return {
                    name,
                    model,
                    manufacturer,
                    crew,
                    passengers
                }
            })).then(starships => this.setState({ starships }))
            .finally(this.state.starships.length === 0 && this.setState({ starships: null }));


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

    renderTable = (data, title) => {
        if (data === null) {
            return (
                <div>
                    <h2 className="tc">{title} </h2>
                    <h1>Loading</h1>
                </div>
            )
        }
        else if (data.length === 0) {
            return <h1></h1>;
        }
        else {

            const tableHeader = <tr>{Object.keys(data[0]).map((e, i) => {
                return (
                    <th key={i}>{e}</th>
                )
            })}</tr>;

            const tableRows = data.map((row) => {
                return (<tr>{Object.values(row).map(e => {
                    return <td>{e}</td>
                })}</tr>)
            })

            return (
                <div className="table-div">
                    <h2 className="tc">{title} </h2>
                    <table className="table">
                        {tableHeader}
                        {tableRows}
                    </table>
                </div>
            )
        }
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
                        <div className="group-info pa5">
                            <div className="transpose-table">
                                {
                                    this.renderTable(this.state.general, this.props.item.name)
                                }
                            </div>
                            <div className="transpose-table">
                                {
                                    this.renderTable(this.state.species, "Species")
                                }
                            </div>
                            <div >
                                {
                                    this.renderTable(this.state.vehicles, "vehicles")
                                }
                            </div>
                            <div >
                                {
                                    this.renderTable(this.state.starships, "starships")
                                }
                            </div>
                        </div>

                    </div>


                </Modal>
            </div>
        );
    }
}

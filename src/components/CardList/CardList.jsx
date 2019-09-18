import React, { Component } from 'react';
import './CardList.css'
import Card from '../Card/Card';



export default class CardList extends Component {
    constructor() {
        super();
    }

    render() {
        const { data } = this.props;
        return (
            <div className="cardList">{
                data.map((item, index) => <Card item={item} index={index} />)
            }
            </div>
            // <h1>hello</h1>
        )
    }

}
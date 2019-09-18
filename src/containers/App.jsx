import React, { Component } from 'react';
import './App.css';
import Background from '../components/Background/Background';
import Logo from '../components/Logo/Logo';
import CardList from '../components/CardList/CardList';
import SearchBar from '../components/SearchBar/SearchBar';
import CharacterModal from '../components/Modal/Modal';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: '',
      search: '',
    }
  }

  async componentDidMount() {
    const response = await fetch('https://swapi.co/api/people/');
    const { results, next } = await response.json();
    this.setState({ data: results });
    this.fetchNext(next);
  }

  async fetchNext(adress) {
    const response = await fetch(adress);
    const { results, next } = await response.json();
    const newData = (this.state.data).concat(results);
    this.setState({ data: newData });
    next ? this.fetchNext(next) : this.fixOrder(this.state.data);
  }


  async fixOrder(data) {
    data.splice(33, 0, data.pop());
    const ratts = data[72];
    data.splice(72, 1);
    data.splice(45, 0, ratts);
    this.setState({ data });
  }


  render() {
    return (
      <div>
        <Background />
        <Logo />
        <SearchBar />
        <div>
          {
            !this.state.data.length ?
              <h1 className='f1 tc white' style={{ fontFamily: "star2" }}>Loading...</h1>
              :
              <CardList data={this.state.data} />
          }
        </div>
      </div>

    );
  }
}

export default App;

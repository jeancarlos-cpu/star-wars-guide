import React from 'react';
import './App.css';
import Background from './components/Background/Background';
import Logo from './components/Logo/Logo';
import CardList from './components/CardList/CardList';
import SearchBar from './components/SearchBar/SearchBar';

const App = function() {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState('');

  const handleChange = function({ target: { value } }) {
    setInput(value.toLowerCase());
  };

  React.useEffect(() => {
    const fetchPeople = async function(next = 'https://swapi.co/api/people/') {
      const response = await fetch(next);
      const { results, next: nextUrl } = await response.json();
      setData((data) => {
        results.forEach(
          (result, index) => (result.index = data.length + index)
        );
        return [...data, ...results];
      });
      next && fetchPeople(nextUrl);
    };

    fetchPeople();
  }, []);

  return (
    <div>
      <Background />
      <div className='app-container'>
        <Logo />
        <SearchBar handleChange={handleChange} />
        <div>
          {!data.length ? (
            <h1 className='f1 tc white' style={{ fontFamily: 'star2' }}>
              Loading...
            </h1>
          ) : (
            <CardList
              data={data.filter((data) =>
                data.name.toLowerCase().includes(input)
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

import React from "react";
import "./App.css";
import Background from "./components/Background/Background";
import Logo from "./components/Logo/Logo";
import CardList from "./components/CardList/CardList";
import SearchBar from "./components/SearchBar/SearchBar";

const App = function() {
  const [data, setData] = React.useState([]);
  // const [search, serSearch] = React.useState("");

  React.useEffect(() => {
    const fetchPeople = async function(next = "https://swapi.co/api/people/") {
      const response = await fetch(next);
      const { results, next: nextUrl } = await response.json();
      setData(data => [...data, ...results]);
      next && fetchPeople(nextUrl);
    };

    fetchPeople();
  }, []);

  return (
    <div>
      <Background />
      <Logo />
      <SearchBar />
      <div>
        {!data.length ? (
          <h1 className="f1 tc white" style={{ fontFamily: "star2" }}>
            Loading...
          </h1>
        ) : (
          <CardList data={data} />
        )}
      </div>
    </div>
  );
};

export default App;

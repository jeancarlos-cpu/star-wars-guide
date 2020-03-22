import React, { useEffect } from "react";
import "./Card.css";
import CharacterModal from "../Modal/Modal";
import filterArrayOfObjects from "../../utils/filterArrayOfObjects";

export default function Card({ item, index }) {
  const [open, setOpen] = React.useState(false);
  const [species, setSpecies] = React.useState([]);
  const [homeworld, setHomeworld] = React.useState([]);
  const [vehicles, setVehicles] = React.useState([]);
  const [starships, setStarships] = React.useState([]);
  const [films, setFilms] = React.useState([]);

  const image = require(`../../assets/${item.index + 1}.jpg`);

  async function fetchRelatedInfo(urls, setState, keys) {
    urls = Array.isArray(urls) ? urls : [urls];
    let dataArray = await Promise.all(
      urls.map(async url => {
        const response = await fetch(url);
        let data = await response.json();
        data = Array.isArray(data) ? data : [data];
        return filterArrayOfObjects(data, keys)[0];
      })
    );
    setState(dataArray);
  }

  useEffect(() => {
    open &&
      fetchRelatedInfo(item.species, setSpecies, [
        "name",
        "classification",
        "designation",
        "average_lifespan",
        "language"
      ]);
  }, [item.species, open]);

  useEffect(() => {
    open &&
      fetchRelatedInfo(item.homeworld, setHomeworld, [
        "name",
        "climate",
        "terrain",
        "gravity",
        "population"
      ]);
  }, [item.homeworld, open]);

  useEffect(() => {
    open &&
      fetchRelatedInfo(item.vehicles, setVehicles, [
        "name",
        "model",
        "manufacturer",
        "crew",
        "passengers"
      ]);
  }, [item.vehicles, open]);

  useEffect(() => {
    open &&
      fetchRelatedInfo(item.starships, setStarships, [
        "name",
        "model",
        "manufacturer",
        "crew",
        "passengers"
      ]);
  }, [item.starships, open]);

  useEffect(() => {
    open &&
      fetchRelatedInfo(item.films, setFilms, [
        "title",
        "episode_id",
        "release_date",
        "producer",
        "director"
      ]);
  }, [item.films, open]);

  return (
    <div id={index} className="card grow">
      <img className="img" src={image} alt="" onClick={() => setOpen(true)} />
      <p className="name f5 mv0 pv2 ph3">{item.name}</p>
      <CharacterModal
        name={item.name}
        image={image}
        isOpen={open}
        closeModal={() => setOpen(false)}
        species={species}
        homeworld={homeworld}
        vehicles={vehicles}
        starships={starships}
        films={films}
        profile={filterArrayOfObjects(
          [item],
          [
            "height",
            "mass",
            "hair_color",
            "skin_color",
            "eye_color",
            "birth_year",
            "gender"
          ]
        )}
      />
    </div>
  );
}

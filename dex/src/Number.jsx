import React, { useState, useEffect } from "react";

export const PokemonList = ({ onLoadPokemonClick }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNumeric = () => {
    setLoading(true);
    const promises = [];

    for (let i = 1; i <= 15; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((response) => response.json()));
    }

    Promise.all(promises)
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getNumeric();
  }, []);

  return (
    <div>
      <button onClick={onLoadPokemonClick}>Carregar Pokémon</button>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="cardPoke">
          {pokemons.map((pokemon) => (
            <span key={pokemon.id}>
              <h3>{pokemon.name}</h3>
              <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

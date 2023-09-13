import React, { useState, useEffect } from "react";
import './App';

const typeTranslations = {
  normal: 'Normal',
  fighting: 'Lutador',
  flying: 'Voador',
  fire: 'Fogo',
  bug: 'Inseto',
  psychic: 'Psíquico',
  electric: 'Elétrico',
  ice: 'Gelo',
  dark: 'Sombrio',
  rock: 'Pedra',
  ground: 'Terrestre',
  water: 'Água',
  poison: 'Veneno',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  steel: 'Aço',
  grass: 'Planta',
  fairy: 'Fada',

};


export const PokemonList = ({ onLoadPokemonClick }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setnameData] = useState(null);

  const getNumeric = () => {
    setLoading(true);
    const promises = [];

    for (let i=1; i <= 15; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((response) => response.json()));
    }

    Promise.all(promises)
      .then((data) => {
        setPokemons(data);
        setLoading(false);
        setnameData(data.name);
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
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="cardPoke">
          {pokemons.map((pokemon) => (
            <span key={pokemon.id}>
              <img className="sPokeImg" src={(pokemon.sprites.other['official-artwork'].front_default)}  alt="Imagem do Pokémon"></img>
              <p className="sPokeNumber">N° {pokemon.id}  </p>
              <p className="sPokeName">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
              <div className="sPokeTypes">
              {
                pokemon.types.map((typeData)=> (
                  <span
                    key = {typeData.type.name}
                    className={`type type-${typeData.type.name}`}
                    >
                      {typeTranslations[typeData.type.name]}
                      </span>
                ))
              }
              </div>
            </span>
            
          ))}
        </div>
      )}
        <button onClick={onLoadPokemonClick}>Carregar Pokémon</button>
    </div>
    
  );
};

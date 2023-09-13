import React, { useState } from "react";
import './App.css';
import './index.css';
import { PokemonList } from "./Number";

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

const App = () => {
  const [card, setCard] = useState(null);
  const [pName, setpName] = useState('');
  const [namedata, setnameData] = useState(null);
  const [iddata, setiddata] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showPokemonList, setShowPokemonList] = useState(true);



  const change = (event) => {
    setpName(event.target.value);
  }

  const baseurl = (event) => {
    event.preventDefault();

    const lowercaseName = pName.toLowerCase();
    const Url = `https://pokeapi.co/api/v2/pokemon/${lowercaseName}`;

    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCard(data);
        setnameData(data.name);
        setiddata(data.id);
        setImageUrl(data.sprites.other['official-artwork'].front_default);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) + 1;
  };

  

  const getRandomPokemon = () => {
    setCard(null);  // Limpar o estado do card
    setShowPokemonList(false); // Ocultar o PokemonList
    const randomId = getRandomPokemonId();
    const randomUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    fetch(randomUrl)
      .then((response) => response.json())
      .then((data) => {
        setCard(data);
        setnameData(data.name);
        setiddata(data.id);
        setImageUrl(data.sprites.other['official-artwork'].front_default);
        setShowPokemonList(false); // Quando o formulário é enviado, ocultamos o PokemonList
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <main className='main'>
        <div className='container'>
          <div className='title'><h2> Pokédex </h2></div>
          <div className='searchBar'>
            <form onSubmit={(event) => {
              event.preventDefault();
              baseurl(event);
              if (!pName) {
                setShowPokemonList(true); // Se o campo estiver vazio, mostramos o PokemonList
              }
            }}>
              <h2>Nome ou número</h2>
              <input type='text' value={pName} onChange={change}></input>
              <button onClick={baseurl}> <img className='lupa' alt='pesquisa' src={require('./lupa.svg').default} /></button>
            </form>
          </div>
          <div className='grayBar'></div>
          <div className='pokedexBG'>
            <button className="random" onClick={getRandomPokemon}> <img src={require('./refresh.png')} alt="" />Surpreenda-me!</button>
            {showPokemonList && pName === '' && (
              <PokemonList />
            )}
            
            {card ? (
              <div className="CardPoke">
                <img className="sPokeImg" src={imageUrl} alt="Imagem do Pokémon" />
                <div className="sPokeNumber" > <p> N° {iddata}</p></div>
                <div className="sPokeName" >
                  <p>{namedata && namedata.charAt(0).toUpperCase() + namedata.slice(1)}</p>
                </div>
                <div className="sPokeTypes">
                  {card.types ? (
                    card.types.map((typeData) => (
                      <span
                        key={typeData.type.name}
                        className={`type type-${typeData.type.name}`}
                      >
                        {typeTranslations[typeData.type.name]}
                      </span>
                    ))
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

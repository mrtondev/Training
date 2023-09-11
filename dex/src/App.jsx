import React, { useState } from "react"
import './App.css';
import './index.css';
import './Number';
import { PokemonList } from "./Number";
// Mapeamento de tipos em inglês para português
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

  const change = (event) => {
    setpName(event.target.value);
  }

  const baseurl = (event) => {
    event.preventDefault()

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
  }

  // Função para gerar um número aleatório entre 1 e 898 (ou o número total de Pokémon disponíveis)
  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) + 1;
  };

  // Função para buscar um Pokémon aleatório
  const getRandomPokemon = () => {
    const randomId = getRandomPokemonId();
    const randomUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    fetch(randomUrl)
      .then((response) => response.json())
      .then((data) => {
        setCard(data);
        setnameData(data.name);
        setiddata(data.id);
        setImageUrl(data.sprites.other['official-artwork'].front_default);
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
            <form onSubmit={baseurl}>
              <h2>Nome ou número</h2>
              <input type='text' value={pName} onChange={change}></input>
              <button onClick={baseurl}> <img className='lupa' alt='pesquisa' src={require('./lupa.svg').default} /></button>
            </form>
          </div>
          <div className='grayBar'></div>
          <div className='pokedexBG'>
          <PokemonList
              card={card}
              namedata={namedata}
              iddata={iddata}
              imageUrl={imageUrl}
            />

          <button className="random" onClick={getRandomPokemon}> <img src={require('./refresh.png')} alt="" />Surpreenda-me!</button>
            {card && (
              <div className="CardPoke"
              >
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
                  ) : (
                    <p>Nenhum tipo disponível</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
    </div>
  );
}

export default App;
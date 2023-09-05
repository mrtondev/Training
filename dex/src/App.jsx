import React, { useState } from "react"
import './App.css';
import './index.css';

// Mapeamento de tipos em inglês para português
const typeTranslations = {
  normal: 'Normal',
  fighting: 'Lutador',
  flying: 'Voador',
  fire: 'Fogo',
  bug: 'Inseto',
  eletric: 'Elétrico',
  ice: 'Gelo',
  dark: 'Sombrio',
  rock: 'Pedra',
  ground: 'Terrestre',
  water: 'Aquático',
  poison: 'Venenoso',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  stell: 'Aço',
  grass: 'Planta',
  fairy: 'Fada',

  // Adicione os outros tipos conforme necessário
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
        // Manipular dados da API  
        console.log(data);
        setCard(data);
        setnameData(data.name);
        setiddata(data.id);
        // Definir a URL da imagem
        setImageUrl(data['sprites']['other']['official-artwork']['front_default']);

      })
      .catch((error) => {
        // Manipular erros
        console.log(error);
      });
  }

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
            {card && <div className="CardPoke">
              <img className="sPokeImg" src={imageUrl} alt="Imagem do Pokémon" />
              <div className="sPokeNumber" > <p> N° {iddata}</p></div>
              <div className="sPokeName" >
                <p>{namedata && namedata.charAt(0).toUpperCase() + namedata.slice(1)}</p>
              </div>
              <div className="sPokeTypes">
                {card.types.map((typeData) => (
                  <span key={typeData.type.name} className="type">{typeTranslations[typeData.type.name]}</span>
                ))}
              </div>
            </div>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

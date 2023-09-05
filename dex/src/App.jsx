import React, { useState } from "react"
import './App.css'; 

const App = () => {
  const [pName, setpName] = useState('');
  const [namedata, setnameData] = useState('');
  const [iddata, setiddata] = useState('');
  const [imageUrl, setImageUrl] = useState(null); // Estado para armazenar a URL da imagem

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

        setnameData(data.name);
        setiddata(data.id);
        setImageUrl(data['sprites']['other']['official-artwork']['front_default']); // Definir a URL da imagem
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
            <div className="CardPoke">
            {imageUrl && <img className="sPokeImg" src={imageUrl} alt="Imagem do Pokémon" />}
              <div className="sPokeName"> <p> Nome: {namedata} </p></div>
              <div className="sPokeNumber" > <p> ID: {iddata}</p></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

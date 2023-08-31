
import React, {useState} from "react"
import './App.css';
import './getInfoData';
import { pokemonData } from "./getInfoData";

 export const App =() => {

    const [pName, setpName] = useState()

  return (
    <div className="App">
      <main className='main'>
          <div className='container'>
          
             <div className='title'> <h2> Pokédex </h2></div>

                <div className='searchBar'> <h2>Nome ou número</h2> <input type='text' value={pName} onChange={(e) => setpName(e.target.value)}></input> 
                <button onClick={pokemonData}> <img className='lupa' alt='pesquisa' src={require('./lupa.svg').default} /></button>
                </div>
              
              <div className='grayBar'></div>
            
             <div className='pokedexBG'></div>
              <div className="sPokeName"> <p> {pName}</p></div>
          </div>
      </main>

     </div>
  );
}

export default App;
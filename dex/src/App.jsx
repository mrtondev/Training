
import React, {useState} from "react"
import './App.css';
import './getInfoData';

 const App =() => {
  
    const [pName, setpName] = useState()
    

  const change = (event) => {
    setpName(event.target.value)
  }

  const baseurl = (event) => {
    event.preventDefault()
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pName}`

    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      //manipular dados da api
      console.log(data)
    })

    .catch((error) => {
      //manipular erros
      console.log(error)
    })
  }
  return (
    <div className="App">
      <main className='main'>
          <div className='container'>
          
             <div className='title'> <h2> Pokédex </h2></div>

                <div className='searchBar'> <h2>Nome ou número</h2>
                <input type='text' value={pName} onChange={change.toString()}></input> 
                <button onClick={baseurl}> <img className='lupa' alt='pesquisa' src={require('./lupa.svg').default} /></button>
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
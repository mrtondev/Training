
import React, {useState} from "react"
import './App.css'; 


 const App =() => {
  
    const [pName, setpName] = useState('')
    const [namedata,setnameData] = useState ('')
    const [iddata, setiddata] = useState ('')    

  const change = (event) => {
    setpName(event.target.value)
  }

const baseurl = () => {
    const Url = `https://pokeapi.co/api/v2/pokemon/${pName}`

    fetch(Url)
    .then((response) => response.json())
    .then((data) => {
      //manipular dados da api  
      console.log(data)

      setnameData =(data.name)
      setiddata =(data.id)
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
                <input type='text' value={pName} onChange={change}></input> 
                <button onClick={baseurl}> <img className='lupa' alt='pesquisa' src={require('./lupa.svg').default} /></button>
                </div>
              
              <div className='grayBar'></div>
            
             <div className='pokedexBG'>
                <div className="CardPoke">
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
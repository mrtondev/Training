
import './App.css';
import './getInfoData';

function App() {
  return (
    <div className="App">
      <main className='main'>
          <div className='container'>
          
             <div className='title'> <h2> Pokédex </h2></div>
             <div className='searchBar'> <h2>Nome ou número</h2> <input type='text'></input>
              <button> <img className='lupa' alt='pesquisa' src={require('./lupa.svg').default} /></button>
              <div className='grayBar'></div>
             </div>
             <div className='pokedexBG'></div>
          </div>
      </main>

     </div>
  );
}

export default App;

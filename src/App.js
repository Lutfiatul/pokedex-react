import logo from './logo.svg';
import './App.css';
import React, { useEffect, useLayoutEffect, useState } from "react";



const backgrounds = {
  fire: '#FFA07A',    // Soft red (Light Salmon)
  bug: '#FFFFE0',     // Soft yellow (Light Yellow)
  poison: '#DDA0DD',  // Soft purple (Plum)
  grass: '#98FB98' ,   // Soft green (Pale Green)
  water: '#AFEEEE'    // Soft green (Pale Green)

};

function App() {
  const [pokedexs, setPokedex] = useState([]);

  function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
      fetch(url)
      .then(response => response.json())
      .then(function(pokeData){
      // console.log()
      setPokedex((prevItems)=>[...prevItems, pokeData])
      })
    }

  function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=15')
     .then(response => response.json())
     .then(function(allpokemon){
     allpokemon.results.forEach(function(pokemon){
       fetchPokemonData(pokemon); 
     })
    })
   }

  useEffect(() => {
    fetchKantoPokemon()
    console.log("useEffect: DOM is rendered and painted");
  }, []);
  return (
    <div className="App">
      {/* Main container for centering */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '5%' }}>
        {/* Inner container for wrapping */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {pokedexs.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                backgroundColor: backgrounds[item.types[0].type.name],
                padding: '10px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '150px', // You can adjust the width for responsiveness
              }}
            >
              <h3>{item.name}</h3>
              <img src={item.sprites.front_default} alt={item.name} style={{ width: '100%' }} />
              
              {/* Type buttons */}
              {item.types.map((type, typeIndex) => (
                <button
                  key={typeIndex}
                  className="rounded-button"
                  style={{
                    marginBottom: '5%',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#eee',
                    cursor: 'pointer',
                  }}
                >
                  {type.type.name.toString().replaceAll('-', ' ')}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default App;

import React from 'react';
import './App.css';
import PokemonList from './pokemonList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon List</h1>
        <PokemonList />
      </header>
    </div>
  );
}

export default App;

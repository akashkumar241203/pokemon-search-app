import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pokemonList.css';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        setPokemons(response.data.results);
        setFilteredPokemons(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const results = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemons(results);
  }, [search, pokemons]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
              alt={pokemon.name}
            />
            <div className="text-container">
              <h2>{pokemon.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;

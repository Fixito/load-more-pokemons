import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemons = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(URL);
      setPokemons(response.data.results);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map((pokemon) => {
          const { name } = pokemon;
          return <li key={name}>{name}</li>;
        })}
      </ul>
    </div>
  );
}

export default PokemonList;

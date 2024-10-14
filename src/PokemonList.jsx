import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=';

function PokemonList() {
  const [count, setCount] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  const fetchPokemons = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(`${URL}${offset}`);
      setPokemons([...pokemons, ...data.results]);
      setCount(data.count);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  if (isLoading) {
    return (
      <>
        <h1>Pokemon List</h1>
        <div>Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>Pokemon List</h1>
        <div>Error: {error?.response?.data?.message}</div>
      </>
    );
  }

  return (
    <>
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map((pokemon) => {
          const { name } = pokemon;
          return <li key={name}>{name}</li>;
        })}
      </ul>
      <p>
        Displaying {pokemons.length} of {count} results
      </p>
      {pokemons.length !== count && (
        <button onClick={() => setOffset(offset + 5)}>Load more</button>
      )}
    </>
  );
}

export default PokemonList;

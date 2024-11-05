/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "./logo.png";
import "./App.css";
import pokemonData from "./pokemonapi.json";
import React, { useState, useEffect } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import axios from "axios";


const fetchPokemon = async (url) => {
  const { data } = await axios.get(url);;
  return data;
};


function App() {
  const [pokemonList] = useState(pokemonData.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  //----------------------------------Main Focus ------------------------------------//
  // const showPokemon = async (url) => {
  // //   //we are not handling the error or loading state in this example
  // //   //also the searchTerm isnt in sync with the response 
  // //   //ex. We are searching for a pokemon data 1 then we call for pokemon data 2. But sometimes
  // //   // what happens is we get the data for 2 first then 1. 
  // //   //SOOO... our state is out of sync with our fetch call !!!

  // //*************************************** original *******************************************/
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setSelectedPokemon(data);
  // //*********************************************************************************************/
  // };

 // This is what react docs recommend to fetch data
  // useEffect(() => {
  //   let ignore = false;
  //   setBio(null);
  //   fetchBio(person).then(result => {
  //     if (!ignore) {
  //       setBio(result);
  //     }
  //   });
  //  // if you return inside a useEffect its called as a clean up
  //   return () => {
  //     ignore = true;
  //   };
  // }, [person]);


  // other common way is doing it in a try catch using the combination of both above but
  // there is soooo much code especially when you have to make it into its own reusable 
  // component and have to use context 
  // useEffect(() => {
  //   let ignore = false
  //   const handleFetchPokemon = async () => {
  //      setPokemon(nulL)
  //      setIsLoading (true)
  //      setError (nulL)
  //      try {
  //        const res = await fetch(*https://pokeapi.co/api/v2/pokemon/${id}*)
  //        if (ignore){
  //          return
  //        }
  //        if (res.ok === false){
  //          throw new Error(`Error fetching pokemon #${id}`)
  //         }
  //   
  //         const json = await res. json()
  //
  //         setPokemon (json)
  //         setIsLoading (false)
  //        }catch (e) {
  //          setError(message)
  //          setIsLoading (false)
  //        }
  //    }
  //    handleFetchPokemon ()
  //    return () => {
  //      ignore = true
  //    }
  // }, [id])
  //----------------------------------------------------------------------------------//
  // *********************************Best Solution = React Query *******************************************//  
  // React query is not a data fetching library. Its an async state manager that is acutely
  // aware of the needs of the server state
  // https://tanstack.com/query/latest/docs/framework/react/quick-start
  // const queryClient = useQueryClient()

  // // Queries
  // const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })

// seQuery take two parameters: Query key: A unique identifier for the query (in this case, 'pokemon').
// Fetcher function: The function that performs the data fetching (in this case, fetchPosts).

// States provided by useQuery:
// data: Contains the API data if successfully fetched.
// isLoading: A boolean that indicates whether the data is being fetched.
// error: An object that contains any error that occurred during the fetch.

  const fetchPokemon = async (url) => {
    // Update the flag to trigger the query
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  
  };

  // Use the useQuery hook to fetch the data
  const { data, isLoading, error } = useQuery(
    ['pokemonData', selectedPokemon], 
    () => fetchPokemon(selectedPokemon),
    {
      enabled: !!selectedPokemon,
    }
  );

  const handlePokemonSelect = (url) => {
    setSelectedPokemon(url);
  };


// ********************************************************************************************************//

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="App">
      <header>
        <img alt="react logo" className="logo" src={logo} />
      </header>

      <main>
        <div className="search-container">
          <input className="search-box" type="text" placeholder="Search..." 
          value={searchTerm} 
          onChange={event => setSearchTerm(event.target.value)}
          />
        </div>

        {selectedPokemon && (
          <div className="pokemon-details">
            <h2>{selectedPokemon.name}</h2>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>

            {selectedPokemon.stats.map((stat, index) => (
              <div key={index}>
                <p>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              </div>
            ))}
          </div>
        )}

        <ul>
          {filteredPokemonList.map((pokemon) => (
            <li key={pokemon.id} className="pokemon-item">
              <a href="#" onClick={() => handlePokemonSelect(pokemon.url)}>
                {pokemon.name}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

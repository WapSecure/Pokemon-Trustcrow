"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Pagination from "@app/components/Pagination";
import SearchBar from "@app/components/SearchBar";
import PokemonDetails from "@app/components/PokemonDetails";

// Define a fetcher function for useSWR to fetch data
const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

// Define the Pokemon component
const Pokemon: React.FC = () => {
  // Use useSWR to fetch data from the PokeAPI for Pokemon types
  const { data: typesData, error: typesError } = useSWR(
    "https://pokeapi.co/api/v2/type",
    fetcher
  );

  // State variables to manage selected type, Pokemon lists, pagination, search, and selected Pokemon details
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [originalPokemonList, setOriginalPokemonList] = useState<string[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  // Event handler for clicking on a Pokemon to view details
  const handlePokemonClick = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
  };

  // Event handler for going back to the Pokemon list
  const handleBackToPokemonList = () => {
    setSelectedPokemon(null);
  };

  // Event handler for selecting a Pokemon type
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    setCurrentPage(1); // Reset page when type changes
  };

  // Fetch Pokemon list for the selected type on type change
  useEffect(() => {
    const fetchPokemonList = async () => {
      if (selectedType) {
        const typeData = await fetcher(
          `https://pokeapi.co/api/v2/type/${selectedType}`
        );
        const pokemonNames = typeData?.pokemon.map(
          (entry: { pokemon: { name: string } }) => entry.pokemon.name
        );
        setOriginalPokemonList(pokemonNames || []);
        setFilteredPokemonList(pokemonNames || []);
      }
    };

    fetchPokemonList();
  }, [selectedType]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredPokemonList.length / 25);

  // Event handler for page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Event handler for search
  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query.toLowerCase());
    filterPokemonList(query.toLowerCase());
  };

  // Filter Pokemon list based on search query
  const filterPokemonList = (query: string) => {
    const filteredList = originalPokemonList.filter((pokemon) =>
      pokemon.toLowerCase().includes(query)
    );
    setFilteredPokemonList(filteredList);
    setSearchError(filteredList.length === 0);
  };

  // Render loading message if there's an error fetching Pokemon categories
  if (typesError) {
    return <div>Error loading Pokemon category</div>;
  }

  // Render loading message while fetching Pokemon categories
  if (!typesData) {
    return <div>Loading...</div>;
  }

  // Extract Pokemon categories from fetched data
  const types = typesData.results;

  // Return the main component structure
  return (
    <div className="container mx-auto mt-8 p-5 md:p-0">
      <h1 className="flex justify-center text-3xl font-bold mb-4">
        Pokemon Exercise for TrustCrow
      </h1>
      <div className="flex justify-center flex-col">
        {/* Dropdown for selecting a Pokemon type */}
        <label htmlFor="typeSelect" className="text-lg font-semibold mb-2">
          Select a Pokemon Category:
        </label>
        <select
          id="typeSelect"
          className="border p-2 rounded-md"
          onChange={handleChange}
          value={selectedType || ""}
        >
          <option value="" disabled>
            Choose a category
          </option>
          {types.map((type: { name: string; url: string }, index: number) => (
            <option key={index} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Render Pokemon list or details based on selection */}
      {selectedType && !selectedPokemon && (
        <div className="mt-4">
          {/* Search bar for filtering Pokemon list */}
          <SearchBar onSearch={handleSearch} />
          <h2 className="text-xl font-semibold mb-2 text-center">
            Pokemon of Category: {selectedType}
          </h2>
          {searchError ? (
            <p className="text-red-500 text-center">
              No matching Pokémon found.
            </p>
          ) : (
            <div>
              {filteredPokemonList.length === 0 ? (
                <p className="text-center">
                  No Pokémon for this category is available.
                </p>
              ) : (
                <div>
                  {/* Display Pokemon list with pagination */}
                  <ul className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {filteredPokemonList
                      .slice((currentPage - 1) * 25, currentPage * 25)
                      .map((pokemonName: string, index: number) => (
                        <li
                          key={index}
                          className="border p-4 text-lg text-center cursor-pointer"
                          onClick={() => handlePokemonClick(pokemonName)}
                        >
                          {pokemonName}
                        </li>
                      ))}
                  </ul>
                  {/* Render pagination if there are multiple pages */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Render Pokemon details or back button based on selection */}
      {selectedPokemon && (
        <div className="mt-4">
          {/* Button to go back to Pokemon list */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
            onClick={handleBackToPokemonList}
          >
            Back to Pokemon
          </button>
          {/* Render Pokemon details component */}
          <PokemonDetails pokemonName={selectedPokemon} />
        </div>
      )}
    </div>
  );
};

export default Pokemon;

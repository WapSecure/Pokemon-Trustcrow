// Import React and define the PokemonDetailsProps interface
import React, { useEffect, useState } from "react";

interface PokemonDetailsProps {
  pokemonName: string;
}

// Define the PokemonDetails component with TypeScript props
const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemonName }) => {
  // State variable to manage Pokemon details
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  // Fetch Pokemon details when the component mounts or when the PokemonName prop changes
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        // Fetch Pokemon details from the PokeAPI
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        // Handle errors during fetch
        console.error("Error fetching Pokemon details:", error);
        setPokemonDetails(null);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  // Render loading message while fetching Pokemon details
  if (!pokemonDetails) {
    return <div>Loading Pokemon details...</div>;
  }

  // Render the Pokemon details UI
  return (
    <div>
      {/* Display Pokemon name as heading */}
      <h3 className="text-2xl font-semibold mb-4">
        Details for {pokemonDetails.name}
      </h3>
      <div className="mb-4">
        {/* Display Pokemon image */}
        <img
          src={pokemonDetails.sprites.front_default}
          alt={`Sprite of ${pokemonDetails.name}`}
        />
      </div>
      <div className="mb-4">
        {/* Display Pokemon height and weight in a table */}
        <table className="border-collapse border">
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">Height:</td>
              <td className="border p-2">{pokemonDetails.height} decimetres</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Weight:</td>
              <td className="border p-2">{pokemonDetails.weight} hectograms</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Display Pokemon base stats in a table */}
      <h4 className="text-lg font-semibold mb-2">Base Stats:</h4>
      <table className="border-collapse border">
        <tbody>
          {pokemonDetails.stats.map((stat: any) => (
            <tr key={stat.stat.name}>
              <td className="border p-2 font-semibold">{stat.stat.name}:</td>
              <td className="border p-2">{stat.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDetails;

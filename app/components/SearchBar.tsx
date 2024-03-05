// Import React and define the SearchBarProps interface
import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

// Define the SearchBar component with TypeScript props
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // State variable to manage the search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Event handler for handling changes in the search input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the new search query from the input
    const newQuery = event.target.value;
    // Update the state with the new query
    setSearchQuery(newQuery);
    // Invoke the onSearch callback with the lowercase query
    onSearch(newQuery.toLowerCase());
  };

  // Effect hook that runs when the search query changes
  useEffect(() => {
    // You can add additional logic here if needed
  }, [searchQuery]);

  // Render the search input UI
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search Pokémon by name"
        className="border p-2 rounded-md mr-2"
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;

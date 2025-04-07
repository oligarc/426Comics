import React, { useState } from "react";
import { useNavigate } from "react-router";

function InputSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/title/${searchQuery}`);
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex justify-center items-center gap-2 my-8"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="¿Tienes algo en mente?"
        className="text-center border px-4 py-2 rounded-2xl shadow w-1/2 h-12"
      />
      <button
        type="submit"
        className="bg-cyan-500 text-white px-4 rounded-2xl h-12 hover:bg-cyan-700 transition"
      >
        Buscar
      </button>
    </form>
  );
}

export default InputSearch;

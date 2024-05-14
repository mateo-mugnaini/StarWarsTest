"use client";
import React, { useState, useEffect } from "react";
import { getAllCharacters } from "../api/characters/getAllCharacters";
import Loading from "@/components/loading/loading";
import Image from "next/image";
import DefaultImg from "@/../public/characters/characterDefault.png";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filters, setFilters] = useState({
    eyeColor: "",
    gender: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 10;

  useEffect(() => {
    async function fetchCharacters() {
      const { AllCharacters } = await getAllCharacters();
      setCharacters(AllCharacters);
      setFilteredCharacters(AllCharacters);
    }
    fetchCharacters();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  useEffect(() => {
    let filtered = characters.filter((character) => {
      if (filters.eyeColor && character.eye_color !== filters.eyeColor) {
        return false;
      }
      if (filters.gender && character.gender !== filters.gender) {
        return false;
      }
      return true;
    });
    setFilteredCharacters(filtered);
    setCurrentPage(1); // Reset page to 1 when filters change
  }, [filters, characters]);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (
      currentPage < Math.ceil(filteredCharacters.length / charactersPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='container mx-auto py-8'>
      {/* Filtros */}
      <div className='w-full flex flex-col md:flex-row gap-4 items-center justify-center mb-4'>
        {/* Filtrar por color de ojos */}
        <label className='p-2'>
          Filter by eye color:
          <select
            className='block w-full border-2 border-yellow-300 bg-black rounded-md py-2 px-3 focus:outline-none focus:border-yellow-600'
            value={filters.eyeColor}
            onChange={(e) => handleFilterChange("eyeColor", e.target.value)}>
            {/* Opciones del filtro */}
          </select>
        </label>
        {/* Filtrar por género */}
        <label className='p-2'>
          Filter by gender:
          <select
            className='block w-full border-2 border-yellow-300 bg-black rounded-md py-2 px-3 focus:outline-none focus:border-yellow-600'
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}>
            {/* Opciones del filtro */}
          </select>
        </label>
      </div>
      {/* Personajes */}
      <div className='gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  items-center justify-center'>
        {/* Mostrar mensaje si no hay coincidencias */}
        {currentCharacters.length === 0 ? (
          <p>There are no matches with the applied filters.</p>
        ) : (
          currentCharacters.map((character, index) => ({
            /* Contenido del personaje */
          }))
        )}
      </div>
      {/* Paginación */}
      <div className='flex justify-center mt-4'>
        {/* Botón para ir a la página anterior */}
        <button
          className='bg-gray-900 rounded border-2 border-gray-900 hover:border-yellow-600 text-white font-semibold py-2 px-4 rounded-r focus:outline-none'
          onClick={prevPage}
          disabled={currentPage === 1}>
          Prev
        </button>
        {/* Botones de paginación */}
        {Array.from(
          { length: Math.ceil(filteredCharacters.length / charactersPerPage) },
          (_, i) => (
            <button
              key={i}
              className={`${
                currentPage === i + 1
                  ? "bg-gray-900 border-yellow-300 shadow-sm text-white"
                  : "bg-gray-900 border-gray-900 text-white"
              } font-semibold py-2 px-4 focus:outline-none mx-2 border-2 rounded-md transition-colors duration-300 hover:border-yellow-600`}
              onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}
        {/* Botón para ir a la página siguiente */}
        <button
          className='bg-gray-900 rounded border-2 border-gray-900 hover:border-yellow-600 text-white font-semibold py-2 px-4 rounded-r focus:outline-none'
          onClick={nextPage}
          disabled={
            currentPage ===
            Math.ceil(filteredCharacters.length / charactersPerPage)
          }>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;

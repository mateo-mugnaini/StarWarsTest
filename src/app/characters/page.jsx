"use client";
import React, { useState, useEffect } from "react";
import { getAllCharacters } from "../api/characters/getAllCharacters";
import Loading from "@/components/loading/loading";
import Link from "next/link";
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

  console.log(characters);
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
      <div className='flex justify-between mb-4'>
        <div className='w-full flex gap-4 align-center justify-center'>
          <label className='block mb-2'>
            Filtrar por color de ojos:
            <select
              className='block w-full text-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
              value={filters.eyeColor}
              onChange={(e) => handleFilterChange("eyeColor", e.target.value)}>
              <option value=''>Todos</option>
              <option value='blue'>Azul</option>
              <option value='brown'>Marrón</option>
              <option value='green'>Verde</option>
              {/* Agregar más opciones según los colores de ojos */}
            </select>
          </label>
          <label className='block'>
            Filtrar por género:
            <select
              className='block w-full border border-gray-300 text-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
              value={filters.gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}>
              <option value=''>Todos</option>
              <option value='male'>Masculino</option>
              <option value='female'>Femenino</option>
              <option value='n/a'>No Aplica</option>
              {/* Agregar más opciones según los géneros */}
            </select>
          </label>
        </div>
      </div>
      {/* Personajes */}
      <div className='gap-4 flex flex-wrap align-center justify-center'>
        {currentCharacters.length === 0 ? (
          <Loading />
        ) : (
          currentCharacters.map((character, index) => (
            <div
              key={index}
              className={`flex align-center justify-center bg-gray-800 rounded-lg p-4 shadow-md border-4`}>
              <div className='flex flex-col align-center justify-between w-[200px] h-[250px]'>
                <div className='flex items-center justify-center '>
                  <Image
                    className='rounded-full'
                    src={DefaultImg}
                    alt={character.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className='mt-4 text-center'>
                  <h2 className='text-yellow-400 text-2xl font-bold'>
                    {character.name}
                  </h2>
                  {character.eye_color === "n/a" ||
                  character.eye_color === "unknown" ? (
                    <div>
                      <br />
                    </div>
                  ) : (
                    <p className='text-white'>
                      Color de ojos: {character.eye_color}
                    </p>
                  )}
                  {character.gender === "n/a" ||
                  character.gender === "unknown" ? (
                    <div>
                      <br />
                    </div>
                  ) : (
                    <p className='text-white'>Género: {character.gender}</p>
                  )}
                  <Link href={`characters/${character.url.split("/")[5]}`}>
                    <p className='text-blue-500 hover:underline'>
                      Ver más información
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Paginación */}
      <div className='flex justify-center mt-4'>
        <button
          className='bg-gray-900 rounded border-2 border-gray-900 hover:border-violet-500 text-white font-semibold py-2 px-4 rounded-r focus:outline-none'
          onClick={prevPage}
          disabled={currentPage === 1}>
          Anterior
        </button>

        {Array.from(
          { length: Math.ceil(filteredCharacters.length / charactersPerPage) },
          (_, i) => (
            <button
              key={i}
              className={`${
                currentPage === i + 1
                  ? "bg-gray-900 border-green-700 shadow-sm text-white"
                  : "bg-gray-900 border-red-700 text-white"
              } font-semibold py-2 px-4 focus:outline-none mx-2 border-2 rounded-md transition-colors duration-300 hover:border-purple-500`}
              onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}
        <button
          className='bg-gray-900 rounded border-2 border-gray-900 hover:border-violet-500 text-white font-semibold py-2 px-4 rounded-r focus:outline-none'
          onClick={nextPage}
          disabled={
            currentPage ===
            Math.ceil(filteredCharacters.length / charactersPerPage)
          }>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;

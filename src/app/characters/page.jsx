"use client";
import React, { useState, useEffect, Suspense } from "react";
import { getAllCharacters } from "../api/characters/getAllCharacters";
import Loading from "@/components/loading/loading";
import Link from "next/link";
import DefaultImg from "@/../public/characters/characterDefault.png";
import Image from "next/image";
import { Limelight } from "next/font/google";

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

  // const findCharacterIndexByName = (name) => {
  //   const aux =
  //     characters.findIndex((character) => character.name === name) + 1;
  //   console.log(aux);
  //   return aux;
  // };

  const handleMouseEnter = (event, character) => {
    if (character.eye_color === "blue") {
      event.target.style.borderColor = "blue";
    } else if (character.eye_color === "red") {
      event.target.style.borderColor = "red";
    } else if (character.eye_color === "yellow") {
      event.target.style.borderColor = "yellow";
    } else if (character.eye_color === "blue-gray") {
      event.target.style.borderColor = "gray";
    } else if (character.eye_color === "brown") {
      event.target.style.borderColor = "brown";
    } else if (character.eye_color === "hazel") {
      event.target.style.borderColor = "#756A61";
    } else if (character.eye_color === "orange") {
      event.target.style.borderColor = "orange";
    } else if (character.eye_color === "pink") {
      event.target.style.borderColor = "pink";
    }
  };

  const handleMouseLeave = (event) => {
    event.target.style.borderColor = "black"; // Cambia el color de borde a su valor original al salir del hover
  };

  return (
    <div className='container mx-auto py-8'>
      <div className='flex justify-between mb-4'>
        <div className='w-full flex gap-4 align-center justify-center'>
          {/* Filtros */}
          <label className='block mb-2'>
            Filtrar por color de ojos:
            <select
              className='block w-full border border-gray-300 text-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
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
      <div className='flex flex-wrap align-center justify-center sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {currentCharacters.length === 0 ? (
          <Loading />
        ) : (
          currentCharacters.map((character, index) => (
            <div
              key={index}
              className='bg-gray-800 rounded-lg p-4 shadow-md flex flex-col justify-between w-1/4 border-2 border-gray-800'
              onMouseEnter={(event) => handleMouseEnter(event, character)}
              onMouseLeave={(event) => handleMouseLeave(event)}>
              <div className='flex flex-row gap-6'>
                <Image
                  className='rounded-full'
                  src={DefaultImg}
                  alt={character.name}
                  width={100}
                  height={100}
                />
                <div className='flex flex-col items-start justify-around'>
                  <h2 className='text-yellow-400 text-2xl font-bold ml-2'>
                    {character.name}
                  </h2>
                  <div className='flex items-center ml-2'>
                    {character.eye_color === "n/a" ? (
                      <div>
                        <br />
                      </div>
                    ) : character.eye_color === "unknown" ? (
                      <div>
                        <br />
                      </div>
                    ) : (
                      <p>Color Eyes: {character.eye_color}</p>
                    )}
                  </div>
                  <div className='flex items-center ml-2'>
                    {character.gender === "n/a" ? (
                      <div>
                        <br />
                      </div>
                    ) : character.gender === "unknown" ? (
                      <div>
                        <br />
                      </div>
                    ) : (
                      <p>Género: {character.gender}</p>
                    )}
                  </div>
                  <Link className="ml-2'" href={`characters/${index + 1}`}>
                    <p className='text-white-500 hover:underline ml-2 '>
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
          {
            length: Math.ceil(filteredCharacters.length / charactersPerPage),
          },
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

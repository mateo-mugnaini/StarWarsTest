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
      {/* ============ Filtros ============ */}
      <div className='w-full flex flex-col md:flex-row gap-4 items-center justify-center mb-4'>
        <label className='p-2'>
          Filtrar por color de ojos:
          <select
            className='block w-full border-2 border-yellow-300 bg-black rounded-md py-2 px-3 focus:outline-none focus:border-yellow-600'
            value={filters.eyeColor}
            onChange={(e) => handleFilterChange("eyeColor", e.target.value)}>
            <option value=''>All</option>
            <option value='red'>Red</option>
            <option value='blue'>Blue</option>
            <option value='gold'>Gold</option>
            <option value='pink'>Pink</option>
            <option value='hazel'>Hazel</option>
            <option value='black'>Black</option>
            <option value='yellow'>Yellow</option>
            <option value='brown'>Brown</option>
            <option value='orange'>Orange</option>
            <option value='red, blue'>Red - Blue</option>
            <option value='blue-gray'>Blue - Gray</option>
            <option value='green, yellow'>Green - Yellow</option>
          </select>
        </label>
        <label className='p-2'>
          Filtrar por género:
          <select
            className='block w-full border-2 border-yellow-300 bg-black rounded-md py-2 px-3 focus:outline-none focus:border-yellow-600'
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}>
            <option value=''>All</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </label>
      </div>
      {/* ============ Personajes ============ */}
      <div className='gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center justify-center'>
        {currentCharacters.length === 0 ? (
          <Loading />
        ) : (
          currentCharacters.map((character, index) => (
            <div
              key={index}
              className='flex items-center justify-center bg-gray-800 rounded-lg p-4 shadow-md border-2 border-transparent hover:border-yellow-500  bg-opacity-75'>
              <div className='flex flex-col items-center justify-between w-full md:w-[200px] h-[260px]'>
                <div className='flex items-center justify-center'>
                  <Image
                    className='rounded-full'
                    src={DefaultImg}
                    alt={character.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className='mt-4 text-center'>
                  <h2 className='text-yellow-400 text-2xl font-play font-bold'>
                    {character.name}
                  </h2>
                  {character.eye_color === "n/a" ||
                  character.eye_color === "unknown" ? (
                    <div>
                      <br />
                    </div>
                  ) : (
                    <p className='text-white capitalize'>
                      Eye Color: {character.eye_color}
                    </p>
                  )}
                  {character.gender === "n/a" || character.gender === "none" ? (
                    <div>
                      <br />
                    </div>
                  ) : (
                    <p className='text-white capitalize'>
                      Gender: {character.gender}
                    </p>
                  )}
                  <a
                    className='flex items-center justify-center'
                    href={`characters/${character.url.split("/")[5]}`}>
                    <p className='w-[100%] px-5 py-1 border-2 border-yellow-300 rounded-lg hover:border-yellow-500'>
                      ...see more
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* ============ Paginación ============ */}
      <div className='flex justify-center mt-4'>
        <button
          className='bg-gray-900 rounded border-2 border-gray-900 hover:border-yellow-600 text-white font-semibold py-2 px-4 rounded-r focus:outline-none'
          onClick={prevPage}
          disabled={currentPage === 1}>
          Prev
        </button>

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

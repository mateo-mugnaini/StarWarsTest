"use client";
import React, { useState } from "react";
import DefaultImg from "@/../public/characters/characterDefault.png";
import Image from "next/image";

const CharactersList = ({ characters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCharacter = currentPage * pageSize;
  const indexOfFirstCharacter = indexOfLastCharacter - pageSize;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  return (
    <div className='text-center flex flex-col items-center justify-evenly'>
      <div>
        <p className='text-yellow-500 text-2xl font-bold '>Characters</p>
      </div>
      <div className='flex flex-col justify-start w-full'>
        {currentCharacters.map((character, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row gap-4 p-3 justify-start items-center'>
            <Image
              style={{ filter: "invert(50%)" }}
              src={DefaultImg}
              alt={character.name}
              width={50}
              height={200}
            />
            <div className='flex flex-col text-start justify-start'>
              <p>Name: {character.name}</p>
              <a
                className='hover:text-yellow-500'
                href={`/characters/${
                  character.url.split("/").slice(-2, -1)[0]
                }`}>
                ...see more
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-around w-full'>
        <button
          className='hover:text-yellow-500'
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage === 1}>
          Prev
        </button>
        <button
          className='hover:text-yellow-500'
          onClick={() =>
            handlePageChange(
              currentPage < Math.ceil(characters.length / pageSize)
                ? currentPage + 1
                : currentPage
            )
          }
          disabled={currentPage === Math.ceil(characters.length / pageSize)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersList;

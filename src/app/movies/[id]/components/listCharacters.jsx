"use client";
import React, { useState } from "react";
import DefaultImg from "@/../public/characters/characterDefault.png";
import Image from "next/image";
import Link from "next/link";

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
    <div className='text-white text-center h-[400px] flex flex-col align-center justify-evenly p-py'>
      <div>
        <p>Characters</p>
      </div>
      <div>
        {currentCharacters.map((character, index) => (
          <div key={index} className='flex row gap-4 p-3'>
            <Image
              className='rounded-full'
              src={DefaultImg}
              alt={character.name}
              width={50}
              height={200}
            />
            <div className='flex flex-col'>
              <p>Name: {character.name}</p>
              <Link
                href={`/characters/${
                  character.url.split("/").slice(-2, -1)[0]
                }`}>
                Ver más del personaje
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage === 1}>
          Anterior
        </button>
        <button
          onClick={() =>
            handlePageChange(
              currentPage < Math.ceil(characters.length / pageSize)
                ? currentPage + 1
                : currentPage
            )
          }
          disabled={currentPage === Math.ceil(characters.length / pageSize)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CharactersList;

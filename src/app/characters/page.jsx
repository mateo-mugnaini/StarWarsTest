"use server";
import React, { Suspense } from "react";
import { getAllCharacters } from "../api/characters/getAllCharacters";
import Loading from "@/components/loading/loading";
import Link from "next/link";

const CharactersPage = async () => {
  const { AllCharacters } = await getAllCharacters().then();
  const charactersPerPage = 10;
  const currentPage = 1; // Definir la página actual inicialmente como la primera página

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    console.log("Cambiando a página", pageNumber);
    // Calcula el índice del último personaje en la página seleccionada
    const indexOfLastCharacter = pageNumber * charactersPerPage;
    // Calcula el índice del primer personaje en la página seleccionada
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    // Obtiene los personajes para la página seleccionada
    const currentCharacters = AllCharacters.slice(
      indexOfFirstCharacter,
      indexOfLastCharacter
    );
  };

  const findCharacterIndexByName = (name) => {
    return AllCharacters.findIndex((character) => character.name === name) + 1;
  };

  return (
    <div>
      <h1>Esta es la página de los personajes</h1>
      <Suspense fallback={<Loading />}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {/* Contenido de personajes */}
          {AllCharacters.slice(
            (currentPage - 1) * charactersPerPage,
            currentPage * charactersPerPage
          ).map((character, index) => (
            <div key={index}>
              <h1>{character.name}</h1>
              {/* IMAGEN GENERICA */}
              <p>Color Eyes: {character.eye_color}</p>
              <p>Gender: {character.gender}</p>
              <Link
                href={`characters/${findCharacterIndexByName(character.name)}`}>
                <p>Ver más información</p>
              </Link>
            </div>
          ))}
        </div>
      </Suspense>
      {/* Paginación */}
      <div className='pagination'>
        {Array.from({
          length: Math.ceil(AllCharacters.length / charactersPerPage),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;

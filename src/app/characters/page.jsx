/* IMPORTS GENERALES */
import React, { Suspense } from "react";
import { getAllCharacters } from "../api/characters/getAllCharacters";
import Loading from "@/components/loading/loading";
import Link from "next/link";

/* RENDER */
const CharactersPage = async () => {
  const { AllCharacters } = await getAllCharacters().then();

  const findCharacterIndexByName = (name) => {
    return AllCharacters.findIndex((character) => character.name === name) + 1;
  };
  return (
    <div>
      <h1>Esta es la página de los personajes</h1>
      <Suspense fallback={<Loading />}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {AllCharacters ? (
            AllCharacters?.map((c) => (
              <div key={c.name}>
                <h1>{c.name}</h1>
                {/* IMAGEN GENERICA */}
                <p>Color Eyes: {c.eye_color}</p>
                <p>Gender: {c.gender}</p>
                <Link href={`characters/${findCharacterIndexByName(c.name)}`}>
                  <p>Ver más información</p>
                </Link>
              </div>
            ))
          ) : (
            <div>
              <p>No existen esas películas</p>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default CharactersPage;

import React, { Suspense } from "react";
import { getCharacterDetail } from "@/app/api/characters/getCharacterDetail";
import Loading from "@/components/loading/loading";
import Image from "next/image";
import DefaultImg from "@/../public/characters/characterDefault.png";

const CharacterDetailPage = async (name) => {
  const idCharacter = name.params.id;
  const data = await getCharacterDetail(idCharacter);
  const { CharacterInfo } = await data.json();

  return (
    <div className='flex justify-center items-center h-screen bg-cover bg-center'>
      <div className='content bg-gray-800 text-white p-8 rounded-lg text-center'>
        <h1 className='name text-yellow-400 text-4xl font-bold mb-10'>
          {CharacterInfo.name}
        </h1>
        <div className='flex row gap-10'>
          <Image
            class='rounded-full'
            src={DefaultImg}
            alt={CharacterInfo.name}
            width={200}
            height={200}
          />
          <div className='flex flex-col gap-2 justify-center items-center'>
            {CharacterInfo.eye_color !== "n/a" &&
              CharacterInfo.eye_color !== "unknown" && (
                <div>
                  <p>Color de ojos: {CharacterInfo.eye_color}</p>
                </div>
              )}
            {CharacterInfo.birth_year !== "n/a" &&
              CharacterInfo.birth_year !== "unknown" && (
                <p>Año de cumpleaños: {CharacterInfo.birth_year}</p>
              )}
            {CharacterInfo.hair_color !== "n/a" &&
              CharacterInfo.hair_color !== "unknown" && (
                <p>Color de pelo: {CharacterInfo.hair_color}</p>
              )}
            {CharacterInfo.height !== "n/a" &&
              CharacterInfo.height !== "unknown" && (
                <p>Altura: {CharacterInfo.height} cm</p>
              )}
            {CharacterInfo.skin_color !== "n/a" &&
              CharacterInfo.skin_color !== "unknown" && (
                <p>Color de piel: {CharacterInfo.skin_color}</p>
              )}
            {CharacterInfo.mass !== "n/a" &&
              CharacterInfo.mass !== "unknown" && (
                <p>Masa: {CharacterInfo.mass} kg</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;

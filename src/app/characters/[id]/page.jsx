import React, { Suspense } from "react";
import { getCharacterDetail } from "@/app/api/characters/getCharacterDetail";
import Image from "next/image";
import DefaultImg from "@/../public/characters/characterDefault.png";
import Loading from "@/components/loading/loading";

const CharacterDetailPage = async (name) => {
  const idCharacter = name.params.id;
  const data = await getCharacterDetail(idCharacter);
  const { CharacterInfo } = await data.json();

  return (
    <div className='flex justify-center items-center w-[100%] h-[94vh]'>
      <Suspense fallback={<Loading />}>
        <div className='content flex flex-row text-white gap-40 bg-gray-800 bg-opacity-75 px-40 py-20 rounded-2xl text-center'>
          <div className='content flex flex-col gap-10 text-white rounded-2xl text-center'>
            <div className='bg-gray-500 w-[500px] rounded-2xl flex align-center justify-center p-4'>
              <Image
                class='rounded-full object-cover w-[250px] h-[250px]'
                src={DefaultImg}
                alt={CharacterInfo.name}
                width={200}
                height={200}
              />
            </div>
            <p className='name text-yellow-400 text-4xl font-bold mb-5 '>
              {CharacterInfo.name}
            </p>
          </div>
          <div className='flex flex-col text-start justify-between bg-gray-900 bg-opacity-75 rounded-2xl p-5 capitalize'>
            {CharacterInfo.eye_color !== "n/a" &&
              CharacterInfo.eye_color !== "unknown" && (
                <div>
                  <p>Eye Color: {CharacterInfo.eye_color}</p>
                </div>
              )}
            {CharacterInfo.birth_year !== "n/a" &&
              CharacterInfo.birth_year !== "unknown" && (
                <p>Birthday: {CharacterInfo.birth_year}</p>
              )}
            {CharacterInfo.hair_color !== "n/a" &&
              CharacterInfo.hair_color !== "unknown" && (
                <p>Hair color: {CharacterInfo.hair_color}</p>
              )}
            {CharacterInfo.height !== "n/a" &&
              CharacterInfo.height !== "unknown" && (
                <p>Height: {CharacterInfo.height} cm</p>
              )}
            {CharacterInfo.skin_color !== "n/a" &&
              CharacterInfo.skin_color !== "unknown" && (
                <p>Skin color: {CharacterInfo.skin_color}</p>
              )}
            {CharacterInfo.mass !== "n/a" &&
              CharacterInfo.mass !== "unknown" && (
                <p>Weight: {CharacterInfo.mass} kg</p>
              )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default CharacterDetailPage;

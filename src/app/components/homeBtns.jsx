import React from "react";
import Image from "next/image";
import CharacterIcon from "@/../public/characters/characterIcon.jpg";
import MoviesIcon from "@/../public/movies/moviesIcon.webp";

const HomeBtn = () => {
  return (
    <div className='bg-red-500 flex flex-row gap-10 items-center justify-center'>
      <a
        href='/characters'
        className='relative w-[410px] h-[210px] flex flex-col items-center justify-center text-center shadow-md cursor-pointer hover:border-2 '>
        <div className='relative'>
          <Image
            src={CharacterIcon}
            alt=''
            className='w-[400px] h-[200px] object-cover'
            width={200}
            height={100}
          />
          <p className='absolute inset-0 flex items-center justify-center text-white font-bold text-xl'>
            Characters
          </p>
        </div>
      </a>
      <a
        href='/movies'
        className='relative w-[410px] h-[210px] flex flex-col items-center justify-center text-center shadow-md cursor-pointer hover:border-2 '>
        <div className='relative'>
          <Image
            src={MoviesIcon}
            alt=''
            className='w-[400px] h-[200px] object-cover'
            width={200}
            height={100}
          />
          <p className='absolute inset-0 flex items-center justify-center text-white font-bold text-xl'>
            Movies
          </p>
        </div>
      </a>
    </div>
  );
};

export default HomeBtn;

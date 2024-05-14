import React, { Suspense } from "react";
import { getMovieDetail } from "@/app/api/movies/getMovieDetail";
import Loading from "@/components/loading/loading";
import MoviesIcon from "@/../public/movies/moviesIcon.webp";

import Image from "next/image";
import CharactersList from "./components/listCharacters";

const MoviesDetailPage = async (episode_id) => {
  const id = episode_id.params.id;
  const data = await getMovieDetail(id);

  const { MovieDetail, Characters } = data;

  return (
    <div className='flex flex-col md:flex-row justify-center items-center rounded-2xl my-10 md:my-20 mx-4 md:mx-10 lg:mx-20 bg-cover bg-gray-800 bg-center bg-opacity-75 py-10 px-20 gap-5'>
      <Suspense fallback={<Loading />}>
        <div className='flex flex-col text-white rounded-2xl text-center md:text-left md:w-full md:max-w-[60%]'>
          <Image
            className='h-[300px] md:h-[400px] object-cover rounded-2xl'
            src={MoviesIcon}
            alt={MovieDetail.title}
            width={900}
            height={0}
          />
          <div className='p-4 md:p-0 md:pr-12 flex flex-col md:flex-row justify-between items-center gap-5'>
            <h1 className='text-center md:text-left text-yellow-500 text-2xl md:text-4xl font-bold'>
              {MovieDetail.title}
            </h1>
            <p>Episode Number: {MovieDetail.episode_id}</p>
            <p>Director: {MovieDetail.director}</p>
          </div>
        </div>
        <div className='content bg-gray-900 bg-opacity-75 rounded-2xl p-5 md:w-[20%]'>
          <CharactersList characters={Characters} />
        </div>
      </Suspense>
    </div>
  );
};

export default MoviesDetailPage;

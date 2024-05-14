import React, { Suspense } from "react";
import { getAllMovies } from "../api/movies/getAllMovies";
import Loading from "@/components/loading/loading";
import Image from "next/image";
import BgImage from "@/../public/movies/moviesIcon.webp";

const MoviesPage = async () => {
  const data = await getAllMovies();
  const { AllMovies } = await data.json();

  AllMovies.sort((a, b) => a.episode_id - b.episode_id);
  return (
    <div className='container mx-auto px-4 py-8 '>
      <Suspense fallback={<Loading />}>
        <div className='my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {AllMovies ? (
            AllMovies?.map((film) => (
              <div
                key={film?.episode_id}
                className='bg-gray-800 bg-opacity-75 rounded-lg  shadow-md border-2 border-transparent hover:border-yellow-500  text-white'>
                <div className='flex flex-col items-center justify-center'>
                  <Image
                    className='h-[100px] rounded-t-lg object-cover'
                    src={BgImage}
                    alt={film.title}
                    width={900}
                    height={50}
                  />
                  <div className='p-10 flex flex-col items-center justify-center'>
                    <h1 className='text-center text-yellow-500 text-3xl mb-2 font-bold'>
                      {film?.title}
                    </h1>
                    <h2 className='text-center mb-3'>
                      Episode: {film.episode_id}
                    </h2>
                    <a
                      className='flex  items-center justify-center'
                      href={`/movies/${film.episode_id}`}>
                      <p className='px-5 py-1 border-2 border-yellow-300 rounded-lg hover:border-yellow-500'>
                        see more
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>There are no movies</p>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default MoviesPage;

/* IMPORTS GENERALES */
import React, { Suspense } from "react";
import { getAllMovies } from "../api/movies/getAllMovies";
import Loading from "@/components/loading/loading";
import Link from "next/link";
// import Image from "next/image";
/* RENDER */
const MoviesPage = async () => {
  const data = await getAllMovies();
  const { AllMovies } = await data.json();

  console.log(AllMovies);
  return (
    <div>
      <h1>All movies page</h1>
      <Suspense fallback={<Loading />}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {AllMovies ? (
            AllMovies?.map((film) => (
              <div
                key={film?.episode_id}
                class='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                {/* <Image
                  src={BgImage}
                  alt={film.title}
                  width={200}
                  height={700}
                  className='max-w-sm'
                /> */}
                <div className='p-5'>
                  <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {film?.title}
                  </h1>
                  <h1 className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    Episodio: {film.episode_id}
                  </h1>
                  <Link href={`/movies/${film.episode_id}`}>
                    <h2 className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer'>
                      Ver mas informacion
                    </h2>
                  </Link>
                </div>
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

export default MoviesPage;

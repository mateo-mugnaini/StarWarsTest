import React, { Suspense } from "react";
import { getAllMovies } from "../api/movies/getAllMovies";
import Loading from "@/components/loading/loading";
import Link from "next/link";
import Image from "next/image";
import BgImage from "@/../public/backgrounds/background2.jpg";

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
                className='bg-gray-800 rounded-lg  shadow-md border-4 text-white'>
                <div className='flex flex-col align-center justify-center'>
                  <Image
                    style={{
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={BgImage}
                    alt={film.title}
                    width={900}
                    height={50}
                  />
                  <div className='p-10 flex flex-col align-center justify-center'>
                    <h1 className='text-center text-yellow-500 text-3xl mb-2 font-bold'>
                      {film?.title}
                    </h1>
                    <h2 className='text-center mb-3'>
                      Episodio: {film.episode_id}
                    </h2>
                    <Link
                      className='flex align-center justify-center'
                      href={`/movies/${film.episode_id}`}>
                      <p className='text-blue-500 hover:underline cursor-pointer'>
                        Ver más información
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>No existen películas</p>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default MoviesPage;

/* IMPORTS GENERALES */
import React, { Suspense } from "react";
import { getMovieDetail } from "@/app/api/movies/getMovieDetail";
import Loading from "@/components/loading/loading";
import Link from "next/link";
// import Image from "next/image";
/* RENDER */
const MoviesDetailPage = async (episode_id) => {
  const id = episode_id.params.id;
  const data = await getMovieDetail(id);
  const { MovieDetail } = await data.json();

  const charactersMovie = MovieDetail.characters;

  // console.log(charactersMovie);
  return (
    <div>
      <h1>All movies page</h1>
      <Suspense fallback={<Loading />}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <h1>{MovieDetail.title}</h1>
          {/* IMAGEN GENERICA */}
          <p>Numero de Episodio: {MovieDetail.episode_id}</p>
          <p>Director: {MovieDetail.director}</p>
          {/* RENDER DE PERSONAJES DEL CAPITULO
          <div></div> 
          */}
        </div>
      </Suspense>
    </div>
  );
};

export default MoviesDetailPage;

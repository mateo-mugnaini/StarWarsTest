import React, { Suspense } from "react";
import { getMovieDetail } from "@/app/api/movies/getMovieDetail";
import Loading from "@/components/loading/loading";
import BgImage from "@/../public/backgrounds/background2.jpg";
import Image from "next/image";
import CharactersList from "./components/listCharacters";

const MoviesDetailPage = async (episode_id) => {
  const id = episode_id.params.id;
  const data = await getMovieDetail(id);

  const { MovieDetail, Characters } = data;

  return (
    <div className='flex justify-center items-center h-screen bg-cover bg-center gap-5'>
      <Suspense fallback={<Loading />}>
        <div className='content bg-gray-800 text-white rounded-2xl text-center'>
          <Image
            style={{
              borderTopRightRadius: "1rem",
              borderTopLeftRadius: "1rem",
              height: "300px",
              objectFit: "cover",
            }}
            src={BgImage}
            alt={MovieDetail.title}
            width={900}
            height={0}
          />
          <h1 className='m-5 text-yellow-500 text-4xl font-bold'>
            {MovieDetail.title}
          </h1>
          <div className='p-4 flex align-center justify-center gap-5'>
            <p>Numero de Episodio: {MovieDetail.episode_id}</p>
            <p>Director: {MovieDetail.director}</p>
          </div>
        </div>
        <div className='content bg-gray-800 rounded-2xl p-5'>
          <CharactersList characters={Characters} />
        </div>
      </Suspense>
    </div>
  );
};

export default MoviesDetailPage;

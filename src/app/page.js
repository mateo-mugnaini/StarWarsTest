/* IMPORTS GENERALES */
import React from "react";
import Link from "next/link";

/* RENDER */
const Home = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-center'>
        <Link href='/characters'>
          <p className='bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded mr-4'>
            Personajes
          </p>
        </Link>
        <Link
          href='/movies'
          className='bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded'>
          <p>Películas</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;

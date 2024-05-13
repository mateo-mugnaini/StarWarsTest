import React from "react";
import Link from "next/link";
import Image from "next/image";
import ImagenTitle from "@/../public/Titles/SW_Title.png";

const Home = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='container px-4 py-8 flex  justify-between m-7 items-center'>
        <div className='mb-8'>
          <Image src={ImagenTitle} alt='Star Wars' width={400} height={200} />
        </div>
        <div className='flex justify-center'>
          <div className='flex  gap-8'>
            <Link href='/characters'>
              <p
                className='bg-yellow-500 hover:bg-yellow-600 w-[200px] text-gray-900 font-bold py-2 px-4 rounded'
                role='button'>
                Personajes
              </p>
            </Link>
            <Link href='/movies'>
              <p
                className='bg-yellow-500 hover:bg-yellow-600 w-[200px] text-gray-900 font-bold py-2 px-4 rounded'
                role='button'>
                Películas
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

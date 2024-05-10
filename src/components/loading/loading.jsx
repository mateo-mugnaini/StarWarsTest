import React from "react";

const Loading = () => {
  return (
    <div className='flex flex-row w-full gap-4 items-center justify-center font-nunito text-2xl'>
      <hr className='border-4 border-gray-300 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin'></hr>
      Cargando...
    </div>
  );
};

export default Loading;

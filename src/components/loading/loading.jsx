import React from "react";

const Loading = () => {
  return (
    <div className='flex flex-row w-full gap-5 items-center justify-center font-nunito text-2xl'>
      <hr className='border-5 border-gray-300 border-t-5 border-blue-500 rounded-full w-12 h-12 animate-spin'></hr>
      Loading
    </div>
  );
};

export default Loading;

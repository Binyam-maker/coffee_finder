import React from "react";

const banner = ({ text, getNearByCoffeeStores }) => {
  return (
    <div className="absolute flex flex-col gap-4 mx-auto mt-12 text-white px-12  top-0 sm:mt-16 md:mt-24">
      <h1 className="text-yellow-800 text-3xl sm:text-5xl md:text-6xl font-bold ">
        Coffee <span className="text-primary">Connoisseur</span>
      </h1>
      <h3 className="text-lg  md:text-xl font-bold font-monchiy text-gray-700">
        Discover your local coffee shops!
      </h3>
      <button
        className="w-fit bg-blue-700 px-6 py-4 text-sm font-bold hover:bg-blue-500 active:bg-blue-300 "
        onClick={() => getNearByCoffeeStores()}
        disabled={text === "Loading..."}
      >
        {text}
      </button>
    </div>
  );
};

export default banner;

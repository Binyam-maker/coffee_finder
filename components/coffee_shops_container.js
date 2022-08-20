import React from "react";
import Card from "./card";

const coffee_shops_container = ({ title, coffeeStores }) => {
  return (
    <div>
      {coffeeStores.length > 0 && (
        <>
          <h3 className="px-12 text-white text-2xl mt-6 lg:mt-0">{title}</h3>

          {/* Card Container */}
          <div className="container my-4 mx-auto max-w-5xl  ">
            {/* Card List */}
            <div className=" grid gap-4 justify-center sm:grid-cols-2 md:grid-cols-3">
              {coffeeStores.map(({ id, name, imgUrl }) => {
                {
                  /* Card Item */
                }
                return <Card key={id} name={name} imgUrl={imgUrl} id={id} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default coffee_shops_container;

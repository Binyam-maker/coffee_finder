import React from "react";
import Image from "next/image";

import Link from "next/link";

const Card = ({ imgUrl, name, id }) => {
  return (
    <>
      {/* Card Item */}
      <div className="bg-white bg-opacity-40 border p-3 rounded-xl hover:cursor-pointer hover:bg-opacity-60">
        <Link href={`/coffee-store/${id}`}>
          <a className="grid gap-2 justify-items-center">
            <h5 className="text-primary">{name}</h5>
            <Image
              className="rounded-md object-cover"
              src={imgUrl}
              width="260"
              height="160"
              alt="Coffee Store"
            />
          </a>
        </Link>
      </div>
    </>
  );
};

export default Card;

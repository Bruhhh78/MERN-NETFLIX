import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Movie = (props) => {
  const [like, setLike] = useState(false);

  return (
    <>
      <div
        key={props.id}
        className={`w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 overflow-hidden`}
      >
        {/* Responsive image with object-cover to maintain aspect ratio */}
        <img
          src={`https://image.tmdb.org/t/p/w500${props.item?.backdrop_path}`}
          alt={props.item?.title}
          className="w-full h-auto object-cover block"
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:test-sm font-bold flex justify-center items-center h-full text-center">
            {props.item?.title}
          </p>
          <p>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;

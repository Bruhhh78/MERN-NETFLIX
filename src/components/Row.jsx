import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(props.fetchURL).then((res) => {
      setMovies(res.data.results);
    });
  }, [props.fetchURL]);

  // console.log(movies);

  const slideLeft = () => {
    var slider = document.getElementById('slider' + props.rowId)
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  const sliderRight = () => {
    var slider = document.getElementById('slider'+ props.rowId)
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{props.title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft onClick={slideLeft} className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={40}/>
        <div
          id={"slider" + props.rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight onClick={sliderRight} className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" size={40}/>
      </div>
    </>
  );
};

export default Row;

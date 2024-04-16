import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = (props) => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", `${user?.email}`),
      (doc) => {
        setMovies(doc.data()?.savedShows || []);
      }
    );
    return () => unsubscribe();
  }, [user?.email]);

  const scrollSlider = (amount) => {
    const slider = document.getElementById(`slider${props.rowId}`);
    slider.scrollLeft += amount;
  };

  const deleteShow = async (passedID) => {
    try {
      const updatedMovies = movies.filter((item) => item.id !== passedID);
      await updateDoc(doc(db, "users", `${user?.email}`), {
        savedShows: updatedMovies,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Liked Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => scrollSlider(-500)}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={`slider${props.rowId}`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item) => (
            <div
              key={item.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.img}`}
                alt={item.title}
                className="w-full h-auto object-cover block"
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:test-sm font-bold flex justify-center items-center h-full text-center">
                  {item.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4 cursor-pointer"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={() => scrollSlider(500)}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};

export default SavedShows;

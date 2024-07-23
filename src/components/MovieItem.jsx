import { createImageUrl } from "../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { UserAuth } from "../context/AuthContext";
import {Link} from 'react-router-dom'
import Swal from "sweetalert2"
const MovieItem = ({ movie }) => {
  const [like, setLike] = useState(false);
  const { user } = UserAuth();

  const { title, backdrop_path, poster_path } = movie;

  const markFavShow = async () => {
    const usearEmail = user?.email;

    if (usearEmail) {
      const userDoc = doc(db, "users", usearEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
    } else {
      alert("Login to save a movie ");
    }
  };

  const alertMovieInfo = () => {
    Swal.fire({
  title: `${movie.title}`,
  html: `
      <p><strong>Language:</strong> ${movie.original_language}</p>
      <p><strong>Popularity:</strong> ${movie.popularity}</p>
      <p><strong>Release Date:</strong> ${movie.release_date}</p>
      <p><strong>Rating:</strong> ${movie.vote_average}</p>
      <p><strong>Overview:</strong> ${movie.overview}</p>
    `,
  imageUrl: `${createImageUrl(backdrop_path ?? poster_path, "w500")}`,
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: "Custom image",
  background: 'black',
  color: 'white'
});
  }

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
      <img
        className="w-full h-40 block object-cover object-top"
        src={createImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
        <p onClick={alertMovieInfo} className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-bold">
          {movie.title}
        </p>


        <p onClick={markFavShow} className="cursor-pointer">
          {like ? (
            <FaHeart size={20} className="absolute top-2 left-2" />
          ) : (
            <FaRegHeart size={20} className="absolute top-2 left-2" />
          )}
        </p>
      </div>
    </div>
  );
};
export default MovieItem;

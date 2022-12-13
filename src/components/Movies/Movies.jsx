import React, { useContext } from "react";
// import axios from "axios";
import styles from "./Movies.module.css";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "./../MediaContext/MediaContext";
import { ScaleLoader } from "react-spinners";
export default function Movies() {
  let baseImgUrl = "https://image.tmdb.org/t/p/original/";
  let { trendingMovies } = useContext(MediaContext);
  let { loadingHome } = useContext(MediaContext);

  let navigate = useNavigate();
  function goToMovieDetails(id, mediaType) {
    navigate({
      pathname: "/movieDetails",
      search: `?id=${id}`,
    });
  }
 
  return (
    <>
      {loadingHome ? (
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="w-100 d-flex justify-content-center align-items-center text-center mt-5 pt-5">
              <ScaleLoader color={"#9c51ff"} height={50} width={13} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="row my-5">
            <div className="col-md-4 d-flex algin-items-center">
              <div className="w-100 my-3">
                <div className={`w-25 ${styles.brLine} my-4`}></div>
                <h2>Trending</h2>
                <h2>Movies</h2>
                <h2>to Watch Now</h2>
                <p>most watched movies by days</p>
                <div className={`w-100 ${styles.brLine} my-4`}></div>
              </div>
            </div>
            {trendingMovies.map((movie, index) => (
              <div
                onClick={() => goToMovieDetails(movie.id)}
                className="col-md-2 my-2"
                key={index}
              >
                <div className="text-center">
                  <img
                    className="w-100 my-2"
                    src={baseImgUrl + movie.poster_path}
                    alt=""
                  />
                  <h5>{movie.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

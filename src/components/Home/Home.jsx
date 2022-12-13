import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MediaContext } from "../MediaContext/MediaContext";
import { ScaleLoader } from "react-spinners";

export default function Home() {
  let baseImgUrl = "https://image.tmdb.org/t/p/original/";
  let { trendingMovies } = useContext(MediaContext);
  let { trendingTvshows } = useContext(MediaContext);
  let { trendingPeople } = useContext(MediaContext);
  let { loadingHome } = useContext(MediaContext);

  let navigate = useNavigate();
  function goToMovieDetails(id, mediaType) {
    navigate({
      pathname: "/movieDetails",
      search: `?id=${id}`,
    });
  }
  function goToTvShowsDetails(id, mediaType) {
    navigate({
      pathname: "/tvshowsDetails",
      search: `?id=${id}`,
    });
  }
  function goToPeopleDetails(id) {
    navigate({
      pathname: "/peopleDetails",
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
          {" "}
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
          <div className="row my-5">
            <div className="col-md-4 d-flex algin-items-center">
              <div className="w-100 my-3">
                <div className={`w-25 ${styles.brLine} my-4`}></div>
                <h2>Trending</h2>
                <h2>Tv shows</h2>
                <h2>to Watch Now</h2>
                <p>most watched tv shows by days</p>
                <div className={`w-100 ${styles.brLine} my-4`}></div>
              </div>
            </div>
            {trendingTvshows.map((tv, index) => (
              <div
                onClick={() => goToTvShowsDetails(tv.id)}
                className="col-md-2 my-2"
                key={index}
              >
                <div className="text-center">
                  <img
                    className="w-100 my-2 "
                    src={baseImgUrl + tv.poster_path}
                    alt=""
                  />
                  <h5>{tv.name}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="row my-5">
            <div className="col-md-4 d-flex algin-items-center">
              <div className="w-100 my-3">
                <div className={`w-25 ${styles.brLine} my-4`}></div>
                <h2>Trending</h2>
                <h2>People</h2>
                <h2>to Watch Now</h2>
                <p>most watched People by days</p>
                <div className={`w-100 ${styles.brLine} my-4`}></div>
              </div>
            </div>
            {trendingPeople.map((person, index) => (
              <div
                onClick={() => goToPeopleDetails(person.id)}
                className="col-md-2 my-2"
                key={index}
              >
                <div className="text-center">
                  <img
                    className="w-100 my-2 "
                    src={baseImgUrl + person.profile_path}
                    alt=""
                  />
                  <h5>{person.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

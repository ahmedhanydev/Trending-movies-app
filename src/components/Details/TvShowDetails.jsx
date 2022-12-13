import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export default function TvShowsDetails() {
  // eslint-disable-next-line no-unused-vars
  let [searchParm, setSearchPram] = useSearchParams();
  let [loading, setLoading] = useState(true);
  let currentId = searchParm.get("id");
  let [details, setDetails] = useState({});
  let baseImgUrl = "https://image.tmdb.org/t/p/original/";

  async function getDetails(mediaType) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${currentId}?api_key=84d438123cff52a8a65221e22f0bc7cd&language=en-US`
    );
    setDetails(data);
    if (data) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDetails("tv");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-100 d-flex justify-content-center align-items-center text-center mt-5 pt-5">
          <i className="fa-solid fa-spinner fa-spin fa-2xl mt-5 loading-icon "></i>
        </div>
      ) : (
        <div className="row my-5">
          <div className="col-md-4">
            <img
              src={baseImgUrl + details.poster_path}
              className="w-100 rounded"
              alt=""
            />
          </div>
          <div className="col-md-8">
            <div className="content text-center ">
              {details.title ? (
                <h2 className="my-5 text-danger">{details.title}</h2>
              ) : (
                ""
              )}

              {details.overview ? <h5>{details.overview}</h5> : ""}
              {details.vote_average ? (
                <h3 className="my-5">
                  vote:{" "}
                  <span className="text-info">
                    {Math.floor(details.vote_average)}
                  </span>
                </h3>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const { createContext } = require("react");
export let MediaContext = createContext([]);

export function MediaContextProvider(props) {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTvshows, setTrendingTvshows] = useState([]);
  let [trendingPeople, setTrendingPeople] = useState([]);
  let [loadingHome, setLoadingHome] = useState(true);

  async function getTrendingItems(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=84d438123cff52a8a65221e22f0bc7cd`
    );
    callback(data.results);
    if (data) {
      setLoadingHome(false);
    }
  }

  useEffect(() => {
    getTrendingItems("movie", setTrendingMovies);
    getTrendingItems("tv", setTrendingTvshows);
    getTrendingItems("person", setTrendingPeople);
  }, []);
  return (
    <MediaContext.Provider
      value={{ trendingMovies, trendingTvshows, trendingPeople, loadingHome }}
    >
      {props.children}
    </MediaContext.Provider>
  );
}

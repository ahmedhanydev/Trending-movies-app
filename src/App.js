import "./App.css";
import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import TvShows from "./components/TvShows/TvShows";
import People from "./components/People/People";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { MediaContextProvider } from "./components/MediaContext/MediaContext";
import MovieDetails from "./components/Details/MovieDetails";
import TvShowsDetails from "./components/Details/TvShowDetails";
import PeopleDetails from "./components/Details/PeopleDetails";
function App() {
  let [loginData, setLoginData] = useState(null);

  function setUserData() {
    let token = localStorage.getItem("token");
    let decoded = jwtDecode(token);
    setLoginData(decoded);
  }
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    setLoginData(null);
    navigate("/login");
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar loginData={loginData} logOut={logOut} />
      <div className="container">
        <MediaContextProvider log="log">
          <Routes>
            {/* <Route element={<ProtectedRoute loginData={loginData} />}>
              
            </Route> */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/tvshows" element={<TvShows />}></Route>
            <Route path="/people" element={<People />}></Route>
            {/* <Route path="/details" element={<Details />}></Route> */}
            <Route path="/movieDetails" element={<MovieDetails />}></Route>
            <Route path="/tvshowsDetails" element={<TvShowsDetails />}></Route>
            <Route path="/peopleDetails" element={<PeopleDetails />}></Route>

            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login setUserData={setUserData} />}>
              {" "}
            </Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </MediaContextProvider>
      </div>
    </>
  );
}

export default App;

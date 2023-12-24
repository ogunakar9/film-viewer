import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
import {
  selectFilters,
  selectFilmsLength,
  selectFilmsList,
  updatePage,
  getFilmsWithParams,
  getFilmDetail,
  selectSelectedFilm,
} from "../../features/film/filmSlice";
import Rating from "@mui/material/Rating";

import "./styles.scss";

const Details = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const selectedFilm = useAppSelector(selectSelectedFilm);
  const {
    Poster,
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Ratings,
    imdbRating,
    Type,
  } = selectedFilm;

  //TODO: fix 2 api calls on page load
  //TODO: error handling
  useEffect(() => {
    if (!Object.keys(selectedFilm).length && id) {
      dispatch(
        getFilmDetail({
          apikey: process.env.REACT_APP_API_KEY,
          i: id,
        })
      );
    }
  }, [selectedFilm, id, dispatch]);
  console.log("selectedFilm", selectedFilm);

  return (
    <div className="details">
      <div className="details__img">
        <img className="details__img__src" src={Poster} alt="film-poster" />
      </div>
      <div className="details__txt">
        <div className="details__txt__rating">
          <span className="details__txt__single__title">IMDB Rating</span>
          <Rating
            name="read-only"
            value={(parseInt(imdbRating) / 10) * 5}
            readOnly
            precision={0.1}
          />
        </div>
        <div className="details__txt__single">
          <span className="details__txt__single__title">Title:</span>
          <span className="details__txt__single__title">Genre:</span>
          <span className="details__txt__single__title">Runtime:</span>
          <span className="details__txt__single__title">Rated:</span>
          <span className="details__txt__single__title">Released:</span>
          <span className="details__txt__single__title">Actors:</span>
          <span className="details__txt__single__title">Country:</span>
          <span className="details__txt__single__title">Language:</span>
          <span className="details__txt__single__title">Plot:</span>
        </div>
        <div className="details__txt__single">
          <span className="details__txt__single__desc">{Title}</span>
          <span className="details__txt__single__desc">{Genre}</span>
          <span className="details__txt__single__desc">{Runtime}</span>
          <span className="details__txt__single__desc">{Rated}</span>
          <span className="details__txt__single__desc">{Released}</span>
          <span className="details__txt__single__desc">{Actors}</span>
          <span className="details__txt__single__desc">{Country}</span>
          <span className="details__txt__single__desc">{Language}</span>
          <span className="details__txt__single__desc">{Plot}</span>
        </div>
      </div>
    </div>
  );
};

export default Details;

export interface IFilmDetailData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    }
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
}

export interface IFilmDataState {
  Search: IFilmData[];
  Response: string;
  totalResults: string;
  Error?: string;
}
export interface IFilmData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IQueryParams {
  apikey: string | undefined;
  page: number;
  s?: string;
  y?: string;
  type?: string;
}
export interface IDetailQueryParams {
  apikey: string | undefined;
  i: string;
}

export interface IFilmState {
  query: IQueryParams;
  status: "idle" | "loading" | "failed";
  error: string | null;
  filmData: IFilmDataState;
  selectedFilm: IFilmDetailData;
}

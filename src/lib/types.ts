export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  vote_average: number;
  genre_ids: number[];
  media_type: string;
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

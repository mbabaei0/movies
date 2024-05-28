export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}


export interface MovieSearchParams {
  term: string,
  type: 'movie' | 'series' | 'episode',
  page: number
}

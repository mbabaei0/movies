export interface Movie {
  id: string
}


export interface MovieSearchParams {
  term: string,
  type: 'movie' | 'series' | 'episode',
  page: number
}

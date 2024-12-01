export const moviePoster = (path: string | undefined) =>
    (path ? `https://image.tmdb.org/t/p/w500${path}` : '') as string;
  
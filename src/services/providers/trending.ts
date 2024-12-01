// import Movie from '../../types';
import restClient from '../client/rest';

interface MovieResponse {
  results: any[];
}

export async function getTrendingMovies(page: number): Promise<MovieResponse> {
  try {
    const response = await restClient.get('3/trending/movie/day', {
      params: {
        page: page,
      },
    });
    return response.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

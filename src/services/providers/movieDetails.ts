import restClient from '../client/rest';

export async function getMovieDetails(id: string) {
  try {
    const response = await restClient.get(`3/movie/${id}?`);
    return response;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

/* eslint-disable quotes */
import restClient from '../client/rest';

export async function getUpcomingMovies() {
  try {
    const response = await restClient.get(`3/movie/upcoming?`);
    return response.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

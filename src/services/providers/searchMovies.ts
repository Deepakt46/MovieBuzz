import restClient from '../client/rest';

export async function searchMovie(page: number, search: string) {
  try {
    const response = await restClient.get('3/search/movie?', {
      params: {
        page: page,
        query: search,
      },
    });
    return response.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

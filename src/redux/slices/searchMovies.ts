import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {searchMovie} from '../../services/providers/searchMovies';
import Movie from '../../types';

interface SearchParams {
  page: number;
  search: string;
}
interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  search: string;
  page: number;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  search: '',
  error: null,
  page: 1,
};

// createAsyncThunk use to fetch data, which automatically handles pending, fulfilled, and rejected states
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (param: SearchParams) => {
    const response = await searchMovie(param.page, param.search);
    return {data: response.results as Movie[], search: param.search};
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    emptySearch: state => {
      state.movies = [];
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  extraReducers: builder => {
    builder
      .addCase(searchMovies.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies =
          action.payload.search === state.search
            ? [...state.movies, ...action.payload.data]
            : action.payload.data;
        state.page =
          action.payload.search === state.search ? state.page + 1 : 1;
        state.search = action.payload.search;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});
export const {emptySearch} = moviesSlice.actions;

export default moviesSlice.reducer;

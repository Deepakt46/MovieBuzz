import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getUpcomingMovies} from '../../services/providers/upcoming';
import Movie from '../../types';

interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk<
  Movie[],
  void,
  {rejectValue: string}
>('movies/fetchMovies', async (_, {rejectWithValue}) => {
  try {
    const response = await getUpcomingMovies();
    return response.results as Movie[];
  } catch (error) {
    // If an error occurs, reject the Promise with an error message
    return rejectWithValue('Error fetching upcoming movies');
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default moviesSlice.reducer;

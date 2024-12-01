import {configureStore} from '@reduxjs/toolkit';
import movieReducer from './slices/upcomingMovieSlice';
import trendingMovieReducer from './slices/trendingMovieSlice';
import movieSearch from './slices/searchMovies';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    trendingMovie: trendingMovieReducer,
    searchMovie: movieSearch,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

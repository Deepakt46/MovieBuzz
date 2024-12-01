/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions, Text, FlatList, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import useStyles from './style';
import MovieCarouselCard from './components/MovieCarouselCard';
import MovieCard from '../../components/movieCard';
import {fetchMovies} from '../../redux/slices/upcomingMovieSlice';
import {fetchTrendingMovies} from '../../redux/slices/trendingMovieSlice';
import MovieCardSkeleton from '../../components/skeleton/skeletonHomeScrenn';
import LoadingFooter from '../../components/loader/footerLoader';
import TrendingMovieCardSkeleton from '../../components/skeleton/skeletonTrending';
import {RootState} from '../../redux/store';
import {UnknownAction} from '@reduxjs/toolkit';
import Movie from '../../types';

const UpcomingMovieComponent = ({
  movies,
  loading,
}: {
  movies: Movie[];
  loading: boolean;
}) => {
  const styles = useStyles();
  const {width} = useWindowDimensions();

  return (
    <View style={styles.upcomingMovies}>
      {loading ? (
        <MovieCardSkeleton />
      ) : movies.length > 0 ? (
        <>

          <Text style={styles.upcomingMovieTxt}>Upcoming Movies</Text>
          <Carousel
            data={movies}
            renderItem={({item}: {item: Movie}) => (
              <MovieCarouselCard item={item} />
            )}
            sliderWidth={width - 40}
            itemWidth={width * 0.61}
            inactiveSlideOpacity={0.5}
            enableMomentum={true}
            decelerationRate={0.9}
            autoplay
            autoplayInterval={7000}
            loop
          />
        </>
      ) : (
        <Image
          source={require('../../../assets/images/imgBg.png')}
          style={{height: 400, width: 400}}
        />
      )}
      <Text style={styles.movieCardHeaderText}>Trending Movies</Text>
    </View>
  );
};

const NoDataComponent = () => {
  const styles = useStyles();

  return (
    <View style={styles.emptyComponent}>
      <Image
        source={require('../../../assets/images/imgBg.png')}
        style={styles.noDataImg}
      />
    </View>
  );
};

const Home = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [loadingUpcomingMovie, setLoadingUpcomingMovie] =
    useState<boolean>(true);
  const [loadingTrendingMovie, setLoadingTrendingMovie] =
    useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const {movies, status} = useSelector((state: RootState) => state.movies);
  const {
    movies: trendingMovies,
    status: trendingStatus,
    // error: trendingError,
    page,
  } = useSelector((state: RootState) => state.trendingMovie);

  useEffect(() => {
    if (status === 'idle') {
      setLoadingUpcomingMovie(true);
      dispatch(fetchMovies() as unknown as UnknownAction);
    } else if (status === 'succeeded') {
      setLoadingUpcomingMovie(false);
    }

    // Assuming you want to fetch trending movies as well
    if (trendingStatus === 'idle') {
      setLoadingTrendingMovie(true);
      dispatch(fetchTrendingMovies(page) as unknown as UnknownAction);
    } else if (trendingStatus === 'succeeded') {
      setLoadingTrendingMovie(false);
    }
  }, [status, trendingStatus, dispatch]);

  const onEndReached = () => {
    //limiting scroll to 4 pages
    if (page <= 4 && trendingStatus !== 'loading') {
      setLoading(true);
      dispatch(fetchTrendingMovies(page) as unknown as UnknownAction);
    } else {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={trendingMovies}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <UpcomingMovieComponent
              movies={movies}
              loading={loadingUpcomingMovie}
            />
          }
          onEndReachedThreshold={1}
          onEndReached={onEndReached} // function to handle the pagination
          renderItem={({item}) => (
            <MovieCard item={item as Movie} loading={loadingTrendingMovie} />
          )}
          ListFooterComponent={
            // Show a loading indicator at the end of the list
            <>
              {!loading && trendingMovies.length === 0 && (
                <TrendingMovieCardSkeleton />
              )}
              <LoadingFooter loading={loading} />
            </>
          }
          ListEmptyComponent={!loadingTrendingMovie ? NoDataComponent : <></>}
        />
      </View>
    </View>
  );
};

export default Home;

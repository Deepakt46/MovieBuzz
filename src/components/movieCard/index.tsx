import {TouchableOpacity, Image, Text} from 'react-native';
import React, {memo} from 'react';
import useStyle from './style';
import {moviePoster} from '../../services/providers/poster';
import Movie from '../../types';
import TrendingMovieCardSkeleton from '../skeleton/skeletonTrending';
import {useNavigation} from '@react-navigation/native';


const MovieCard = memo(({item, loading}: {item: Movie; loading: boolean}) => {
  const styles = useStyle();
  const navigation = useNavigation<any>();

  return (
    <>
      {loading ? (
        <TrendingMovieCardSkeleton />
      ) : (
        <TouchableOpacity
          style={styles.mainWrapper}
          onPress={() => navigation.navigate('movieDetails', {id: item.id})}>
          <Image
            style={styles.card}
            source={
              moviePoster(item.poster_path)
                ? {uri: moviePoster(item.poster_path) as string}
                : require('../../../assets/images/imgBg.png')
            }
          />
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
});

export default MovieCard;

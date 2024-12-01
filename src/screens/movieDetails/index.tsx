import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import useStyles from './style';
import {getMovieDetails} from '../../services/providers/movieDetails';
import {moviePoster} from '../../services/providers/poster';
import MovieDetailsSkeleton from '../../components/skeleton/skeletonDetailScreen';
import MovieDetails from '../../types';
import Icon from '../../common/Icon';
import { useNavigation } from '@react-navigation/native';

type MovieDetailsProps = {
  route: RouteProp<{params: {id: string}}, 'params'>;
};

const MovieDetail: React.FC<MovieDetailsProps> = ({route}) => {
  const styles = useStyles();
  const {id} = route.params;
  const navigation = useNavigation<any>();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setDetails(data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);
  const posterSource = useMemo(
    () =>
      details?.poster_path
        ? {uri: moviePoster(details.poster_path) as string}
        : require('../../../assets/images/imgBg.png'),
    [details],
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <MovieDetailsSkeleton />
      ) : !details ? (
        <View style={styles.noDataWrapper}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/imgBg.png')}
            style={[styles.noData]}
          />
          <Text style={styles.overView}>Something went wrong!!</Text>
        </View>
      ) : (
        <ImageBackground style={styles.posterWrap} source={posterSource}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={25} color="#fff" />
          </TouchableOpacity>
          <View style={styles.description}>
            <ScrollView
              contentContainerStyle={styles.scrollViewWrap}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.titleText}>{details?.title}</Text>
              <Text style={styles.rating}>
                Rating: {(details?.vote_average).toFixed(1)}
              </Text>
              <Text style={styles.dateText}>
                Release Date: {details?.release_date}
              </Text>
              <Text style={styles.duration}>
                Duration: {details?.runtime} mins
              </Text>
              <Text style={styles.overView}>Overview</Text>
              <Text style={styles.review}>{details?.overview}</Text>
            </ScrollView>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default MovieDetail;

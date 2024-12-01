/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import useStyles from './style';
import MovieCard from '../../components/movieCard';
import {RootState} from '../../redux/store';
import LoadingFooter from '../../components/loader/footerLoader';
import {fetchTrendingMovies} from '../../redux/slices/trendingMovieSlice';
import { Text } from '@react-navigation/elements';
import Icon from '../../common/Icon';

const Filter = React.memo(({selectedLanguages, toggleLanguage}: {selectedLanguages: string[]; toggleLanguage: (language: string) => void}) => {
  const languages = ['en', 'hi', 'ml'];
  const displayName = {
    'en': 'English',
    'hi': 'Hindi',
    'ml': 'Malayalam',
  };
  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      }}>
      {languages.map(language => (
        <TouchableOpacity
          key={language}
          style={{
            backgroundColor: selectedLanguages.includes(language) ? '#fff' : '#000',
            borderWidth: 1,
            borderColor: selectedLanguages.includes(language) ? '#ccc' : '#fff',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => toggleLanguage(language)}>
          <Text
            style={{
              color: selectedLanguages.includes(language) ? '#000' : '#fff',
              fontFamily: 'Lato-Regular',
            }}>
            {displayName[language as keyof typeof displayName]}
          </Text>
          {selectedLanguages.includes(language) && <Icon name="x" size={20} color="#000" />}
        </TouchableOpacity>
      ))}
    </View>
  );
});

const Trending = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const {movies, status, page} = useSelector(
    (state: RootState) => state.trendingMovie,
  );
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const onEndReached = useCallback(() => {
    if (!loading && status !== 'loading' && page <= 5) {
      setLoading(true);
      dispatch(fetchTrendingMovies(page) as any).finally(
        () => setLoading(false)
      );
    }
  }, [loading, status, page, dispatch]);

  const toggleLanguage = useCallback((language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  }, []);

  useEffect(() => {
    if (selectedLanguages.length === 0) {
      setFilteredMovies(movies); // Show all movies if no filter is selected
    } else {
      const filtered = movies.filter(movie =>
        selectedLanguages.includes(movie.original_language)
      );
      setFilteredMovies(filtered);
    }
  }, [selectedLanguages, movies]);
  return (
    <View style={styles.container}>
        <FlatList
          data={filteredMovies}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Unique key for each item
          showsVerticalScrollIndicator={false}
          numColumns={2}
          stickyHeaderIndices={[0]} // Make the filter sticky
          ListHeaderComponent={
            <Filter
              selectedLanguages={selectedLanguages}
              toggleLanguage={toggleLanguage}
            />
          }
          renderItem={({item}) => (
            <MovieCard item={item} loading={status === 'loading'} />
          )}
          onEndReached={onEndReached}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No movies found</Text>
          )}
          ListFooterComponent={
            <LoadingFooter loading={loading} />
          }
        />
    </View>
  );
};

export default Trending;

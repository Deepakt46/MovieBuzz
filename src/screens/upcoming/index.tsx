/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import useStyles from './style';
import MovieCard from '../../components/movieCard';
import { RootState } from '../../redux/store';
import Icon from '../../common/Icon';

const Filter = ({
  selectedLanguages,
  toggleLanguage,
}: {
  selectedLanguages: string[];
  toggleLanguage: (language: string) => void;
}) => {
  const languages = ['en', 'hindi', 'malayalam'];
  const displayName = {
    'en': 'English',
    'hindi': 'Hindi',
    'malayalam': 'Malayalam',
  }
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
};

const Home = () => {
  const styles = useStyles();

  const { movies, status } = useSelector((state: RootState) => state.movies);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Function to toggle language selection
  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };

  // Filter movies whenever the selected languages or movies change
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
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]} // Make the filter sticky
        ListHeaderComponent={
          <Filter
            selectedLanguages={selectedLanguages}
            toggleLanguage={toggleLanguage}
          />
        }
        numColumns={2}
        renderItem={({ item }) => (
          <MovieCard item={item} loading={status === 'loading'} />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No movies found</Text>
        )}
      />
    </View>
  );
};

export default Home;

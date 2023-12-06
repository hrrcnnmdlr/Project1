import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async () => {
    try {
      const apiUrl = `https://www.omdbapi.com/?apikey=a9c649a&s=${searchText}&page=${page}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.Response === 'True') {
        // Додайте нові результати до існуючого масиву
        setSearchResults((prevResults) => [...prevResults, ...data.Search]);
        // Оновіть загальну кількість результатів
        setTotalResults(data.totalResults);
      } else {
        setSearchResults([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
      setTotalResults(0);
    }
  };

  const navigateToMovieDetail = (imdbID) => {
    navigation.navigate('MovieDetail', { imdbID });
  };

  const handleLoadMore = () => {
    // Збільште номер сторінки перед новим запитом
    setPage(page + 1);
    // Викличте функцію пошуку для отримання наступної порції результатів
    handleSearch();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter movie title"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <Button style={styles.button} title="Search" onPress={handleSearch} />

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToMovieDetail(item.imdbID)}>
              <View style={styles.movieItem}>
                <Image source={{ uri: item.Poster }} style={styles.poster} />
                <Text style={styles.title}>{item.Title} ({item.Year})</Text>
              </View>
            </TouchableOpacity>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found</Text>
      )}

      {totalResults > searchResults.length && (
        <Text style={styles.loadMoreText}>
          Showing {searchResults.length} of {totalResults} results. Load more...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#AFEEEE',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    borderRadius: 5,
    margin: 20,
    background: '#AFEEEE', 
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#DCDCDC',
    borderRadius: 8,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  loadMoreText: {
    alignSelf: 'center',
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SearchScreen;

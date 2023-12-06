import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

const MovieDetailScreen = ({ navigation }) => {
  const imdbID = navigation.getParam('imdbID');
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiUrl = `https://www.omdbapi.com/?apikey=a9c649a&i=${imdbID}&plot=full`;
        const response = await fetch(apiUrl);
        const data = await response.json();
    
        if (data.Response === 'True') {
          setMovieDetails(data);
        } else {
          setMovieDetails(null);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  return (
    <View style={{ flex: 1, padding: 16, alignItems: 'center' }}>
      {movieDetails ? (
        <>
          <Image
            source={{ uri: movieDetails.Poster }}
            style={{ width: 150, height: 225, marginBottom: 16 }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
            {movieDetails.Title} ({movieDetails.Year})
          </Text>
          <Text>{`Rated: ${movieDetails.Rated}`}</Text>
          <Text>{`Runtime: ${movieDetails.Runtime}`}</Text>
          <Text>{`Genre: ${movieDetails.Genre}`}</Text>
          <Text>{`Director: ${movieDetails.Director}`}</Text>
          <Text style={{ marginTop: 16 }}>{`Plot: ${movieDetails.Plot}`}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default MovieDetailScreen;
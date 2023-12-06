import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './screens/SearchScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    MovieDetail: MovieDetailScreen,
  },
  {
    initialRouteName: 'Search',
  }
);

export default createAppContainer(AppNavigator);
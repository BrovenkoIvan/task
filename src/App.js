import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthorsScreen from './screens/AuthorsScreen'
import PostsScreen from './screens/PostsScreen'
import {
  Text,
} from 'react-native';

const Stack = createStackNavigator()

const App = () =>  {
  return (
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name='Authors' component={AuthorsScreen}/>
    <Stack.Screen name='Posts' component={PostsScreen}/>
  </Stack.Navigator>
</NavigationContainer>
  );
};

export default App;

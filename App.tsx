/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import auth from '@react-native-firebase/auth';

import Welcome from './Screen/auth/Welcome';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Signup from './Screen/auth/Signup';
import Login from './Screen/auth/Login';
import CreateBlog from './Screen/Main/CreateBlog';
import Blog from './Screen/Main/Blog';
import Home from './Screen/Main/Home';
import BlogHome from './Screen/Main/BlogHome';
import SongsHome from './Screen/SongMain/SongsHome';
// import TabNavigation from './Screen/Main/TabNavigation';
import SongsMain from './Screen/SongMain/SongsMain';
import ChantHome from './Screen/SongMain/ChantHome';
import SleepyHome from './Screen/SongMain/SleepyHome';
import SongsList from './Screen/SongMain/SongsList';
import ChantSongsList from './Screen/SongMain/ChantSongsList';


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator()



function App() {

  // const [loggedIn, setLoggedIn] = useState(false)
  // const [loading, setLoading] = useState(false)


  // async function onAuthStateChanged(user) {
  //   if(user) {
  //     setLoggedIn(true)
  //   }
  //   else {
  //     setLoggedIn(false)
  //   }
  //   if(loading) setLoading(false)
  // }

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged)
    return subscribe
  }, []);

  if (initializing) return null;

  // if(loading) {
  //   return (
  //     <ActivityIndicator
  //       size={32}
  //       color='gray'
  //     />
  //   )
  // }

  // if (!loggedIn) 
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='BlogHome' component={BlogHome} />
      <Stack.Screen name='CreateBlog' component={CreateBlog} />
      <Stack.Screen name='Blog' component={Blog} />
      <Stack.Screen name='SongsHome' component={SongsHome}/>
      <Stack.Screen name='SongsList' component={SongsList}/>
      <Stack.Screen name='SongsMain' component={SongsMain}/>
      <Stack.Screen name='ChantSongsList' component={ChantSongsList}/>
      <Stack.Screen name='ChantHome' component={ChantHome}/>
      <Stack.Screen name='SleepyHome' component={SleepyHome}/>
    </Stack.Navigator>
  )
}


export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
};

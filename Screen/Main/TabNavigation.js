// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import auth from '@react-native-firebase/auth'
// import firestore from '@react-native-firebase/firestore'
// import storage from '@react-native-firebase/storage'

// import BlogHome from "./BlogHome";
// import Home from "./Home";
// import SongsHome from "../SongMain/SongsHome";
// import { NavigationContainer } from "@react-navigation/native";

// const homeName = "Home";
// const blogName = "Blogs";
// const musicName = "Music";


// const Tab = createBottomTabNavigator();




// const TabNavigation = () => {
//     return (
//         <Tab.Navigator
//         initialRouteName={homeName}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === homeName) {
//               iconName = focused ? 'home' : 'home-outline';

//             } else if (rn === musicName) {
//               iconName = focused ? 'Musics' : 'musical-notes-outline';

//             } else if (rn === blogName) {
//               iconName = focused ? 'Blogs' : 'settings-outline';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'grey',
//           labelStyle: { paddingBottom: 10, fontSize: 10 },
//           style: { padding: 10, height: 70}
//         }}>
//             <Tab.Screen name="Home" component={Home} />
//             <Tab.Screen name="BlogHome" component={BlogHome} />
//             <Tab.Screen name="SongsHome" component={SongsHome} />
//         </Tab.Navigator>
//     );
// }

// export default TabNavigation;
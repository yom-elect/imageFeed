import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as ROUTES from '../constant/routes';
import ImageFeedScreen from '../screens/ImageFeedScreen';
import AddImageFeedScreen from '../screens/AddImageFeedScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
    return (
      <Tab.Navigator 
          initialRouteName={ROUTES.IMAGE_FEED}
          activeColor="#e91e63"
          barStyle={{backgroundColor: 'tomato' }}
      >
        {/* Home Tab  */}
        <Tab.Screen
          component={ImageFeedScreen}
          name={ROUTES.IMAGE_FEED}
          options={{ 
            title: 'Image Feed',
            headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-flood" color={color} size={26} />
          ),
          }}
        />
        {/* Add New Image */}
        <Tab.Screen
          component={AddImageFeedScreen}
          name={ROUTES.ADD_IMAGE}
          options={{ headerShown: true, headerTitle: "Add Feed" ,headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarLabel: 'Add Image',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
        />
      </Tab.Navigator>
    );
  };
  
  export default App;
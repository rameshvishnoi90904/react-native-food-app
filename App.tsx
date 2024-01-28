/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import MenuScreen from './src/screens/MenuScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CartState, NavigationScreenPropsType, SectionItem, dispatchActionType} from './src/utils/types';
import DetailScreen from './src/screens/DetailScreen';
import { AppContext } from './src/state';
import { fetchMenu } from './src/api';
const Stack = createNativeStackNavigator<NavigationScreenPropsType>();

function App(): React.JSX.Element {
  const [cart, updateCart] = useState<CartState>({})
  const [foodSection, setFoodSection] = useState<SectionItem[]>([])

  useEffect(() => {
    fetchMenu().then((value: SectionItem[]) => {
      setFoodSection(value)
  })
  },[])

  const dispatch = (action: dispatchActionType) => {
    const toReturn = {...cart}

    switch (action.type) {
      case 'add': 
        if (toReturn[action.foodId]) {
          toReturn[action.foodId].quantity++
        } else {
          toReturn[action.foodId] = {
            quantity: 1,
            foodId: action.foodId
          }
        }
      break;
      case 'remove': 
        toReturn[action.foodId].quantity--
      break;
    }
    updateCart(toReturn)
  }
  const state = {cart: cart, foodSection: foodSection}
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppContext.Provider value={{state, dispatch}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={MenuScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </SafeAreaView>
  );
}

export default App;

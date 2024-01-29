import 'react-native';
import React from 'react';
import { screen, render, act, fireEvent, waitFor } from '@testing-library/react-native';
import {it, jest, expect} from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '../../../App';
import { AppContext } from '../../state';
import DetailScreen from '../DetailScreen';
import mockData from '../../api/fakeData.json'
import { SectionItem, NavigationScreenPropsType, CartState } from '../../utils/types';
import { formatSection } from '../../utils';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<NavigationScreenPropsType>();

const mockSections  = mockData.sections.map((item: any) : SectionItem => formatSection(item));
mockSections.sort((a: SectionItem, b: SectionItem) => (a.displayOrder - b.displayOrder))

it('render DetailScreen with mock data', () => {
    const dispatch = jest.fn();
    const state = {
        cart: {},
        foodSection: [...mockSections]
    }

    const firstFoodItem = mockSections[0].data[0].list[0];
    render(
        <AppContext.Provider value={{state, dispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Detail" component={DetailScreen} initialParams={{item: firstFoodItem, disabledSection: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    ).toJSON();
    expect(screen).toMatchSnapshot();
})



it('render DetailScreen with cart interaction', async () => {
    const dispatch = jest.fn();

    const firstFoodItem = mockSections[0].data[0].list[0];
    const cart: CartState = {};
    cart[firstFoodItem.id] = {
        foodId: firstFoodItem.id,
        quantity: 1
    }

    const state = {
        cart: cart,
        foodSection: [...mockSections]
    }

    render(
        <AppContext.Provider value={{state, dispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Detail" component={DetailScreen} initialParams={{item: firstFoodItem, disabledSection: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )

    const incrementButton = await screen.findByTestId("add-cart");

    act(() => {
        fireEvent.press(incrementButton);
    })

    const decrementButton = await screen.findByTestId("remove-cart");

    act(() => {
        fireEvent.press(decrementButton);
    })

    expect(dispatch).toBeCalledTimes(2)
})

it("render DetailScreen with disabled section", () => {
    const dispatch = jest.fn();
    const state = {
        cart: {},
        foodSection: [...mockSections]
    }

    const firstFoodItem = mockSections[0].data[0].list[0];
    render(
        <AppContext.Provider value={{state, dispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Detail" component={DetailScreen} initialParams={{item: firstFoodItem, disabledSection: true}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
    expect(screen).toMatchSnapshot();
})


it("render DetailScreen with soldout state section", () => {
    const dispatch = jest.fn();
    const state = {
        cart: {},
        foodSection: [...mockSections]
    }

    const firstFoodItem = mockSections[0].data[0].list[0];
    const soldOutItem = {
        ...firstFoodItem,
        description: '',
        itemStock: {
            quantityLeft: 0
        }
    }
    render(
        <AppContext.Provider value={{state, dispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Detail" component={DetailScreen} initialParams={{item: soldOutItem, disabledSection: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
    expect(screen).toMatchSnapshot();
})
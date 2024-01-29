import 'react-native';
import React from 'react';
import { screen, render, act, fireEvent, waitFor } from '@testing-library/react-native';
import {it, jest, expect} from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '../../../App';
import { AppContext } from '../../state';
import mockData from '../../api/fakeData.json'
import { CartState, SectionItem } from '../../utils/types';
import { formatSection } from '../../utils';

const mockSections  = mockData.sections.map((item: any) : SectionItem => formatSection(item));

mockSections.sort((a: SectionItem, b: SectionItem) => (a.displayOrder - b.displayOrder))

it('render MenuScreen with mock data', () => {
    const dispatch = jest.fn();
    const state = {
        cart: {},
        foodSection: [...mockSections]
    }
    render(
        <AppContext.Provider value={{state, dispatch}}>
            <NavigationContainer>
                <RootNavigator/>
            </NavigationContainer>
        </AppContext.Provider>
    ).toJSON();
    expect(screen).toMatchSnapshot();
})

it('render MenuScreen navigate to detail screen', async () => {
    const dispatch = jest.fn();
    const state = {
        cart: {},
        foodSection: [...mockSections]
    }
    render(
        <AppContext.Provider value={{state, dispatch}}>
            <NavigationContainer>
                <RootNavigator/>
            </NavigationContainer>
        </AppContext.Provider>
    )
    const firstFoodItem = mockSections[0].data[0].list[0];

    const firstFoodItemEle = await screen.findByTestId(`food-card-${firstFoodItem.id}`);

    act(() => {
        fireEvent.press(firstFoodItemEle);
    })

    expect(screen.getByTestId('item-label')).toBeDefined();
})

it('render MenuScreen and add food item to cart', async () => {
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
                <RootNavigator/>
            </NavigationContainer>
        </AppContext.Provider>
    )

    const incrementButton = await screen.findByTestId(`add-cart-${firstFoodItem.id}`);
    act(() => {
        fireEvent.press(incrementButton)
        fireEvent.press(incrementButton)
    })

    expect(dispatch).toBeCalledTimes(2);
})
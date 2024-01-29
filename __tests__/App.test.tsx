import 'react-native';
import React from 'react';
import App from '../App';
import { render, act, waitFor, fireEvent } from '@testing-library/react-native';

// Note: import explicitly to use the types shipped with jest.
import {it, expect, jest} from '@jest/globals';

import mockData from '../src/api/fakeData.json'
import { SectionItem } from '../src/utils/types';
import { formatSection } from '../src/utils';

const mockSections  = mockData.sections.map((item: any) : SectionItem => formatSection(item));

mockSections.sort((a: SectionItem, b: SectionItem) => (a.displayOrder - b.displayOrder))

jest.mock('../src/api/', () => ({
  fetchMenu: () => new Promise((resolve, reject) => {
    resolve([...mockSections])
  })
}))


it('renders correctly', async () => {
  const tree = render(<App />).toJSON();
  await waitFor(() => {
    expect(tree).toBeDefined();
  })
  expect(tree).toMatchSnapshot(); 
});

it('test dispatch actions', async () => {
  const firstFoodItem = mockSections[0].data[0].list[0];

  const screen = render(<App />);
  await waitFor(() => {
    expect(screen).toBeDefined();
  })
  

  const firstFoodItemEle = await screen.findByTestId(`add-cart-button-${firstFoodItem.id}`);

  act(() => {
    fireEvent.press(firstFoodItemEle)
  })

  const incrementCart = await screen.findByTestId(`add-cart-${firstFoodItem.id}`);

  act(() => {
    fireEvent.press(incrementCart)
  })


  expect(screen.getByTestId(`quantity-cart-${firstFoodItem.id}`).children).toEqual(["2"])


  const decrementCart = await screen.findByTestId(`remove-cart-${firstFoodItem.id}`);

  act(() => {
    fireEvent.press(decrementCart)
  })

  expect(screen.getByTestId(`quantity-cart-${firstFoodItem.id}`).children).toEqual(["1"])

});


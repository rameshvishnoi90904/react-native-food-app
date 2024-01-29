import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import {it, jest, expect} from '@jest/globals';
import SectionItemPreview from '../SectionItemPreview';
import { SectionItem } from '../../utils/types';

it('renders FoodItemPreview correctly without outer section', () => {
    const mockSectionItem : SectionItem = {
        id: 16,
        label: "Burgers",
        description: "Watching your carbs? Go bun-free and replace our wholemeal buns with a lettuce wrap!",
        displayOrder: 0,
        disabled: true,
        disabledReason: "Only available from 1st of May",
        data: [],
        outerSectionTitle: ""
    }
    const tree = render(<SectionItemPreview section={mockSectionItem}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('renders FoodItemPreview correctly with outer section', () => {
    const mockSectionItem : SectionItem = {
        id: 16,
        label: "Burgers",
        description: "Watching your carbs? Go bun-free and replace our wholemeal buns with a lettuce wrap!",
        displayOrder: 0,
        disabled: true,
        disabledReason: "Only available from 1st of May",
        data: [],
        outerSectionTitle: "This is Outer Section Title"
    }
    const tree = render(<SectionItemPreview section={mockSectionItem}/>).toJSON();
    expect(tree).toMatchSnapshot();
})




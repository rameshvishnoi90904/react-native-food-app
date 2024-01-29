import { render, act, fireEvent} from '@testing-library/react-native';
import {it, jest, expect, beforeAll} from '@jest/globals';
import mockData from '../fakeData.json'
import { fetchMenu } from '..';
import { SectionItem } from '../../utils/types';
jest.spyOn(global, 'fetch').mockImplementation(jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve({...mockData})
    } as Response)
}))

it('returns correct value', async () => {
    const value: SectionItem[] = await fetchMenu()
    expect(value.length).toEqual(mockData.sections.length);
});
  
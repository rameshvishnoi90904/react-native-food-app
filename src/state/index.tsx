
import { createContext } from 'react';
import { dispatchActionType, CartState, SectionItem } from '../utils/types';

export type AppContextType = {
    state: {cart: CartState, foodSection: SectionItem[]};
    dispatch: (action: dispatchActionType) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
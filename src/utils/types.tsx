export type FoodItem = {
    id: number,
    label: string,
    description: string,
    displayOrder: number,
    unitPriceFractional: number,
    currency: string,
    imageUrl: string,
    itemStock: {
        quantityLeft: number
    }
}

export type InnerSectionList = {
    sectionId: string,
    sectionDescription: string,
    disabledReason: string,
    list: FoodItem[],
    subSection: SectionItem[]
}

export type SectionItem = {
    id: number,
    label: string,
    description: string,
    displayOrder: number,
    disabled: Boolean,
    disabledReason: string|null,
    data: InnerSectionList[],
    outerSectionTitle: string
}


export type NavigationScreenPropsType = {
    Home: undefined;
    Detail: {item: FoodItem, disabledSection: boolean};
};

export interface CartState {
    [key: number]: CartItem;
}

export type CartItem = {
    foodId: number,
    quantity: number
}

export type dispatchActionType = {
    type: string;
    foodId: number;
}

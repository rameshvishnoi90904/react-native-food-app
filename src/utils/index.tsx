import { FoodItem, SectionItem } from "./types";
/**
 * 
 * @param item section item
 * @param sectionTitle outer nested section title
 * @returns section item with outer nested section title
 */
const formatInnerSection = (item: any, sectionTitle: string) => {
    const foodItems = [...item.items];
    foodItems.sort((a: FoodItem, b: FoodItem) => (a.displayOrder - b.displayOrder));

    const toReturn: SectionItem = {
        id: item.id, 
        label: item.label,
        outerSectionTitle: sectionTitle,
        description: item.description,
        disabled: item.disabled,
        disabledReason: item.disabledReason,
        displayOrder: item.displayOrder,
        data: [{list: item.items, sectionId: item.id, sectionDescription: item.description, disabledReason: item.disabled ? item.disabledReason : "", subSection: []}],
    };
    return toReturn;
}
/**
 * 
 * @param item section data from api
 * @returns section item compatible with react native SectionList component
 */
export const formatSection = (item: any) : SectionItem => {
    const foodItems = [...item.items];
    const subSections = [...item.subSections];

    foodItems.sort((a: FoodItem, b: FoodItem) => (a.displayOrder - b.displayOrder));
    subSections.sort((a: SectionItem, b: SectionItem) => (a.displayOrder - b.displayOrder));
    
    const formattedSubSection: SectionItem[] = subSections.map((sItem) => formatInnerSection(sItem, item.label))

    const toReturn = {
        id: item.id, 
        label: item.label,
        description: item.description,
        disabled: item.disabled,
        outerSectionTitle: "",
        disabledReason: item.disabledReason,
        displayOrder: item.displayOrder,
        data: [{list: item.items, sectionId: item.id, sectionDescription: item.description, disabledReason: item.disabled ? item.disabledReason : "", subSection: formattedSubSection}],
    };
    return toReturn;
}
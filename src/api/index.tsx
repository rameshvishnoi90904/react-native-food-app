import { FoodItem, SectionItem } from "../utils/types";
export const fetchMenu = () : Promise<SectionItem[]> => {
    const url = 'https://atlas-fe-menu.atlas-kitchen.workers.dev/menu'
    return fetch(url)
        .then(response => response.json())
        .then(value => {
            const sections  = value.sections.map((item: any) : SectionItem => formatSection(item));

            sections.sort((a: SectionItem, b: SectionItem) => (a.displayOrder - b.displayOrder))

            return sections;
    })
    .catch(error => {
        throw error;
    });
}

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

const formatSection = (item: any) : SectionItem => {
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
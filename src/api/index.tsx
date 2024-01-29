import { formatSection } from "../utils";
import { SectionItem } from "../utils/types";
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
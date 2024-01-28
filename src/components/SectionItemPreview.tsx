import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { SectionItem } from "../utils/types";
const SectionItemPreview = ({section}:{section:SectionItem}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.header}>{section.label}</Text>
            {
                section.outerSectionTitle ?
                <Text style={styles.subHeader}>({section.outerSectionTitle})</Text>
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        // flexDirection: 'row'
    },
    header: {
        fontSize: 32,
        // backgroundColor: '#fff',
    },
    subHeader: {

    }
})
export default SectionItemPreview;
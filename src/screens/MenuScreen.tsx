import { FlatList, SectionList, StyleSheet, Text, View, CellRendererProps, Dimensions} from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { fetchMenu } from "../api"
import { FoodItem, SectionItem, InnerSectionList, NavigationScreenPropsType, CartItem } from "../utils/types"
import FoodItemPreview from "../components/FoodItemPreview";
import SectionItemPreview from "../components/SectionItemPreview";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppContext, AppContextType } from "../state";

type Props = NativeStackScreenProps<NavigationScreenPropsType, 'Home'>;

const EmptySection = () => {
    return (
        <Text>No Food Items Available in this section</Text>
    )
}

const MenuScreen = ({navigation}: Props) => {
    const {state, dispatch} = useContext(AppContext) as AppContextType
    const cart = state.cart;
    const foodSection = state.foodSection;

    const navigateToProductDetail = (disabledSection: boolean, pItem: FoodItem) => {
        navigation.navigate("Detail", {item: pItem, disabledSection})
    }

    const renderInnerSubSection = (list: SectionItem[]) => {
        return (
            <SectionList
                sections={list}
                renderSectionHeader={SectionItemPreview}
                renderItem={renderItems}
        />
        )
    }

    const addToCart = (pItem: FoodItem) => {
        dispatch({type: 'add', foodId: pItem.id});
    }
    const removeFromCart = (pItem: FoodItem) => {
        dispatch({type: 'remove', foodId: pItem.id})
    }

    const renderItems = ({ item }: {item: InnerSectionList}) => {
        const disabledReason = item.disabledReason;
        return (
            <>
                {item.sectionDescription ? <Text style={styles.sectionDescription} numberOfLines={2}>{item.sectionDescription}</Text> : null}
                {disabledReason ? <Text style={styles.disabledReason} numberOfLines={1}>{disabledReason}</Text> : null}
                <FlatList
                    data={item.list}
                    numColumns={2}
                    ListEmptyComponent={EmptySection}
                    renderItem={({item}) => 
                        <FoodItemPreview 
                            cartItem={cart[item.id]}
                            item={item} 
                            sectionDisabled={!!disabledReason}
                            navigateToProductDetail={(fItem: FoodItem) => navigateToProductDetail(!!disabledReason, fItem)} 
                            addToCart={(pItem: FoodItem) => addToCart(pItem)} 
                            removeFromCart={(pItem: FoodItem) => removeFromCart(pItem)}
                        />}
                    keyExtractor={(kItem) => String(kItem.id)}
                />
                {renderInnerSubSection(item.subSection)}
            </>
        )
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={foodSection}
                renderSectionHeader={SectionItemPreview}
                renderItem={renderItems}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 254, 250)',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
    },
    sectionDescription: {
        marginBottom: 12,
        marginHorizontal: 5,
        lineHeight: 21,
    },
    disabledReason: {
        marginHorizontal: 5,
        color: 'rgb(250, 85, 83)',
        paddingBottom: 10
    }
})
export default MenuScreen;
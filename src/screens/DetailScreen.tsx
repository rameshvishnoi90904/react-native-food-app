import React, { useContext, useEffect, useState } from "react"
import { Image, StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartItem, FoodItem, NavigationScreenPropsType } from "../utils/types";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
type Props = NativeStackScreenProps<NavigationScreenPropsType, 'Detail'>;
import RenderHtml from 'react-native-render-html';
import { AppContext, AppContextType } from "../state";

const DetailScreen = ({route}: Props) => {
    const item: FoodItem = route.params.item;
    const disabledSection: boolean = route.params.disabledSection;
    const {state, dispatch} = useContext(AppContext) as AppContextType
    const cart = state.cart;
    
    const currentCart = cart[item.id] || {};

    const addToCart = () => {
        dispatch({type: 'add', foodId: item.id})
    }
    const removeFromCart = () => {
        dispatch({type: 'remove', foodId: item.id})
    }

    let actionButton, priceValue;
    if (item.itemStock.quantityLeft > 0) {
        if (currentCart.quantity > 0) {
            const totalPrice = item.unitPriceFractional * currentCart.quantity/100;
            actionButton = (
                actionButton = (
                    <View style={[styles.cardFunctions, {marginRight: 4}]}>
                        <TouchableOpacity testID="remove-cart" onPress={() => removeFromCart()}>
                            <Text style={styles.cartAction}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.cartQuantity}>{currentCart.quantity}</Text>
                        <TouchableOpacity testID="add-cart" onPress={() => addToCart()}>
                            <Text style={styles.cartAction}>+</Text>
                        </TouchableOpacity>
                    </View>
                )
            )
            priceValue = (
                <TouchableOpacity style={[styles.addButton, {marginLeft: 4}]} onPress={addToCart}>
                    <Text style={styles.addText}>Update ($ {totalPrice})</Text>
                </TouchableOpacity>
            )
        } else if (disabledSection) {
            actionButton = (
                <TouchableOpacity style={styles.addButton} disabled>
                    <Text style={styles.addText}>Not Available</Text>
                </TouchableOpacity>
            )
        } else {
            actionButton = (
                <TouchableOpacity testID="add-cart-button" style={styles.addButton} onPress={addToCart}>
                    <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
            )
        }
       
    } else {
        actionButton = (
            <TouchableOpacity style={[styles.addButton, styles.soldOutButton]} disabled>
                <Text style={styles.addText}>Sold out</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1,}} contentContainerStyle={{}}>
                <Image src={item.imageUrl} style={styles.imagePreview} resizeMode="contain"/>
                <View style={styles.textContainer}>
                    <Text style={styles.header} testID="item-label">{item.label}</Text>
                    {
                        item.description ?
                        <RenderHtml
                            contentWidth={width}
                            source={{html: item.description}}
                        />
                        :
                        <Text style={styles.description}>Description not available</Text>
                    }
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                {actionButton}
                {priceValue}
            </View>
        </View>


    )
}
const {width} = Dimensions.get("screen")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 254, 250)',
    },
    imagePreview: {
        width: width,
        height: width * 3/4,
    },
    textContainer: {
        flex: 1, 
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 20,
        marginVertical: 10
    },
    description: {
        lineHeight: 21,
    },
    addButton: {
        backgroundColor: 'rgb(250, 85, 83)',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderRadius: 4,
        flex: 1
    },
    soldOutButton: {
        backgroundColor: '#fdcece',
    },
    addText: {
        color: 'white'
    },
    cardFunctions: {
        borderWidth: 1,
        flexDirection: 'row' ,
        height: 40, 
        alignItems: 'center',
        borderRadius: 4,
         flex: 1,
     },
     cartAction: {
         fontSize: 18,
         padding: 10
     },
     cartQuantity: {
         flex: 1,
         fontSize: 20,
         textAlign: 'center'
     },
     buttonWrapper: {
        marginHorizontal: 20,
        flexDirection: 'row'
     }
})
export default DetailScreen
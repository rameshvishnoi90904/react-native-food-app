import React from "react"
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, GestureResponderEvent } from "react-native"

import { CartItem, FoodItem } from "../utils/types"
const {width, height} = Dimensions.get('screen')
const FoodItemPreview = ({item, cartItem, navigateToProductDetail, addToCart, sectionDisabled, removeFromCart}: {item: FoodItem, navigateToProductDetail: (pItem: FoodItem) => void, addToCart: (pItem: FoodItem) => void, removeFromCart: (pItem: FoodItem) => void, cartItem: CartItem, sectionDisabled: string}) => {
    let actionButton;
    const soldOut = item.itemStock.quantityLeft == 0;
    if (!soldOut) {
        if (cartItem && cartItem.quantity > 0) {
            actionButton = (
                <View style={styles.cardFunctions}>
                   <TouchableOpacity onPress={() => removeFromCart(item)}>
                        <Text style={styles.cartAction}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.cartQuantity}>{cartItem.quantity}</Text>
                    <TouchableOpacity onPress={() => addToCart(item)}>
                        <Text style={styles.cartAction}>+</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (sectionDisabled) {
            actionButton = (
                <TouchableOpacity style={styles.addButton} onPress={() => {}}>
                    <Text style={styles.addText}>Not available</Text>
                </TouchableOpacity>
            )
        } else {
            actionButton = (
                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                    <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
            )
        }
        
    } else {
        actionButton = (
            <TouchableOpacity style={styles.addButton} onPress={() => {}}>
                <Text style={styles.addText}>Sold out</Text>
            </TouchableOpacity>
        )
    }

    const price = item.unitPriceFractional/100;
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigateToProductDetail(item)}>
            <Image src={item.imageUrl} style={styles.imagePreview}/>
            <View style={styles.itemTextContainer}>
                <Text style={styles.title} numberOfLines={2}>{item.label}</Text>
                <Text style={styles.description}numberOfLines={3}>{item.description}</Text>
                <Text style={styles.price}>{item.currency} {price}</Text>
            </View>
            {actionButton}
            {
                (sectionDisabled || soldOut) ? 
                    <View style={styles.disabledSection}>
                    </View>
                : null
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        marginBottom: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#fff',
        width: width/2 - 20,
        height: 350,
        borderRadius: 4,
        flexDirection: 'column',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    disabledSection: {
        backgroundColor: 'rgba(265,265,265,0.4)',
        position: 'absolute',
        width: width/2 - 20,
        height: 350,
        top: 0
    },
    imagePreview: {
        width: width/2 - 20 - 2,
        height: width/2 - 40 - 2,
        resizeMode: 'contain',
        backgroundColor: '#fff',
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
    },
    itemTextContainer: {
        paddingHorizontal: 12,
        paddingTop: 15,
        height: 60,
        flex: 1,
    },
    title: {
        fontSize: 16,
        marginBottom: 6,
    },
    description: {
        fontSize: 12,
        lineHeight: 19,
        flex: 1
    },
    price: {
        marginVertical: 12,
    },
    addButton: {
        backgroundColor: 'rgb(250, 85, 83)',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4
    },
    addText: {
        color: 'white',
        fontWeight: '500'
    },
    cardFunctions: {
       borderWidth: 1,
       flexDirection: 'row' ,
       height: 40, 
       alignItems: 'center',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
    },
    cartAction: {
        fontSize: 18,
        padding: 10
    },
    cartQuantity: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center'
    }

})
export default FoodItemPreview;
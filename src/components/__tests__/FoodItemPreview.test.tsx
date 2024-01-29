import 'react-native';
import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import {it, jest, expect} from '@jest/globals';
import FoodItemPreview from '../FoodItemPreview';

it('renders FoodItemPreview correctly', () => {
    const item = {
        "id": 116,
        "label": "Rasa Sayang Burg",
        "description": "Marrying great taste and sustainability, the 100% plant-based burger features Quorn's meat-free burger patty packed with the goodness of mycoprotein - a nutritious protein source that is high in protein and fibre, and low in saturated fat.<br/><br/>Paired with a special, vegan sunny-side up egg, the burger is topped with fresh cucumber slices, a generous dollop of kampong sambal sauce, sweet caramelized onions, creamy vegan aioli, all sitting on a bed of crunchy lettuce and sandwiched between a fresh wholemeal bun.<br/><br/>*Patty is NOT allium-free. You can opt for allium-free patty. <br/>*Option to remove onions.",
        "displayOrder": 0,
        "unitPriceFractional": 1390,
        "currency": "SGD",
        "imageUrl": "https://storage.googleapis.com/kaluga-core-active-storage/9uvvn2dj2x6y28uqkw7e1gs9bnkt",
        "itemStock": {
            "quantityLeft": 999
        }
    }
    const navigateToProductDetail = jest.fn();
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();

    const tree = render(<FoodItemPreview 
        navigateToProductDetail={navigateToProductDetail} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart}
        sectionDisabled={false}
        cartItem={{foodId: item.id, quantity: 0}}
        item={item}
        />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders FoodItemPreview for sold out', () => {
    const item = {
        "id": 116,
        "label": "Rasa Sayang Burg",
        "description": "Marrying great taste and sustainability, the 100% plant-based burger features Quorn's meat-free burger patty packed with the goodness of mycoprotein - a nutritious protein source that is high in protein and fibre, and low in saturated fat.<br/><br/>Paired with a special, vegan sunny-side up egg, the burger is topped with fresh cucumber slices, a generous dollop of kampong sambal sauce, sweet caramelized onions, creamy vegan aioli, all sitting on a bed of crunchy lettuce and sandwiched between a fresh wholemeal bun.<br/><br/>*Patty is NOT allium-free. You can opt for allium-free patty. <br/>*Option to remove onions.",
        "displayOrder": 0,
        "unitPriceFractional": 1390,
        "currency": "SGD",
        "imageUrl": "https://storage.googleapis.com/kaluga-core-active-storage/9uvvn2dj2x6y28uqkw7e1gs9bnkt",
        "itemStock": {
            "quantityLeft": 0
        }
    }
    const navigateToProductDetail = jest.fn();
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();

    const tree = render(<FoodItemPreview 
        navigateToProductDetail={navigateToProductDetail} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart}
        sectionDisabled={false}
        cartItem={{foodId: item.id, quantity: 0}}
        item={item}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})

it('renders FoodItemPreview for sectionDisabled', () => {
    const item = {
        "id": 116,
        "label": "Rasa Sayang Burg",
        "description": "Marrying great taste and sustainability, the 100% plant-based burger features Quorn's meat-free burger patty packed with the goodness of mycoprotein - a nutritious protein source that is high in protein and fibre, and low in saturated fat.<br/><br/>Paired with a special, vegan sunny-side up egg, the burger is topped with fresh cucumber slices, a generous dollop of kampong sambal sauce, sweet caramelized onions, creamy vegan aioli, all sitting on a bed of crunchy lettuce and sandwiched between a fresh wholemeal bun.<br/><br/>*Patty is NOT allium-free. You can opt for allium-free patty. <br/>*Option to remove onions.",
        "displayOrder": 0,
        "unitPriceFractional": 1390,
        "currency": "SGD",
        "imageUrl": "https://storage.googleapis.com/kaluga-core-active-storage/9uvvn2dj2x6y28uqkw7e1gs9bnkt",
        "itemStock": {
            "quantityLeft": 999
        }
    }
    const navigateToProductDetail = jest.fn();
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();

    const tree = render(<FoodItemPreview 
        navigateToProductDetail={navigateToProductDetail} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart}
        sectionDisabled={true}
        cartItem={{foodId: item.id, quantity: 0}}
        item={item}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})


it('renders FoodItemPreview and add item into cart ', async () => {
    const item = {
        "id": 116,
        "label": "Rasa Sayang Burg",
        "description": "Marrying great taste and sustainability, the 100% plant-based burger features Quorn's meat-free burger patty packed with the goodness of mycoprotein - a nutritious protein source that is high in protein and fibre, and low in saturated fat.<br/><br/>Paired with a special, vegan sunny-side up egg, the burger is topped with fresh cucumber slices, a generous dollop of kampong sambal sauce, sweet caramelized onions, creamy vegan aioli, all sitting on a bed of crunchy lettuce and sandwiched between a fresh wholemeal bun.<br/><br/>*Patty is NOT allium-free. You can opt for allium-free patty. <br/>*Option to remove onions.",
        "displayOrder": 0,
        "unitPriceFractional": 1390,
        "currency": "SGD",
        "imageUrl": "https://storage.googleapis.com/kaluga-core-active-storage/9uvvn2dj2x6y28uqkw7e1gs9bnkt",
        "itemStock": {
            "quantityLeft": 999
        }
    }
    const navigateToProductDetail = jest.fn();
    const addToCart = jest.fn().mockImplementationOnce(() => {})
    const removeFromCart = jest.fn();

    const screen = render(<FoodItemPreview 
        navigateToProductDetail={navigateToProductDetail} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart}
        sectionDisabled={false}
        cartItem={{foodId: item.id, quantity: 0}}
        item={item}
        />);

    

    const addCartButton = await screen.findByTestId(`add-cart-button-${item.id}`)
    expect(addCartButton).toBeTruthy()

    act(() => {
        fireEvent.press(addCartButton);
    })

    expect(addToCart).toBeCalledTimes(1);
})


it('renders FoodItemPreview and add item into cart ', async () => {
    const item = {
        "id": 116,
        "label": "Rasa Sayang Burg",
        "description": "Marrying great taste and sustainability, the 100% plant-based burger features Quorn's meat-free burger patty packed with the goodness of mycoprotein - a nutritious protein source that is high in protein and fibre, and low in saturated fat.<br/><br/>Paired with a special, vegan sunny-side up egg, the burger is topped with fresh cucumber slices, a generous dollop of kampong sambal sauce, sweet caramelized onions, creamy vegan aioli, all sitting on a bed of crunchy lettuce and sandwiched between a fresh wholemeal bun.<br/><br/>*Patty is NOT allium-free. You can opt for allium-free patty. <br/>*Option to remove onions.",
        "displayOrder": 0,
        "unitPriceFractional": 1390,
        "currency": "SGD",
        "imageUrl": "https://storage.googleapis.com/kaluga-core-active-storage/9uvvn2dj2x6y28uqkw7e1gs9bnkt",
        "itemStock": {
            "quantityLeft": 999
        }
    }
    const navigateToProductDetail = jest.fn();
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();

    const screen = render(<FoodItemPreview 
        navigateToProductDetail={navigateToProductDetail} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart}
        sectionDisabled={false}
        cartItem={{foodId: item.id, quantity: 1}}
        item={item}
        />);

    
    const addCartButton = await screen.findByTestId(`add-cart-${item.id}`)
    expect(addCartButton).toBeTruthy()

    act(() => {
        fireEvent.press(addCartButton);
        fireEvent.press(addCartButton);
        fireEvent.press(addCartButton);
    })

    expect(addToCart).toBeCalledTimes(3);

    const removeFromCartButton = await screen.findByTestId(`remove-cart-${item.id}`)
    expect(removeFromCartButton).toBeTruthy()

    act(() => {
        fireEvent.press(removeFromCartButton);
        fireEvent.press(removeFromCartButton);
    })

    expect(removeFromCart).toBeCalledTimes(2);

    const cardItem = await screen.findByTestId(`food-card-${item.id}`)
    expect(removeFromCartButton).toBeTruthy()

    act(() => {
        fireEvent.press(cardItem);
    })

    expect(navigateToProductDetail).toBeCalledTimes(1)

})
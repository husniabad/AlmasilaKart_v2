import {
    CART_ADD_ITEM,
    CART_MINUS_ITEM,

    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'



export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const newItem = action.payload;
            const existingItem = state.cartItems.find(x => x.product === newItem.product);

            if (existingItem) {
                const newQty = existingItem.qty + newItem.qty;
                if (newQty <= existingItem.countInStock) {
                  return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                      x.product === existingItem.product ? { ...x, qty: newQty } : x
                    )
                  };
                } else {
                  return state; // Return current state if the new quantity exceeds countInStock
                }
              }  else {
                return {
                ...state,
                cartItems: [...state.cartItems, newItem]
                };
            }

            // if (existItem) {
            //     return {
            //       ...state,
            //       cartItems: state.cartItems.map(x =>
            //         x.product === existItem.product
            //           ? { ...x, qty: x.qty +    cartItems.qty } // Increase the quantity
            //           : x
            //       ),
            //     };
            //   }
            //  else {
            //     return {
            //         ...state,
            //         cartItems: [...state.cartItems, item]
            //     }
            // }
            case CART_MINUS_ITEM:
                const productIdToMinus = action.payload;
                const updatedCartItems = state.cartItems.map(item =>
                  item.product === productIdToMinus 
                    ? { ...item, qty: item.qty - 1 }
                    : item
                );
                
                console.log('Updated cartItems after CART_MINUS_ITEM:', updatedCartItems); // Add this line
          
                return {
                  ...state,
                  cartItems: updatedCartItems,
                };

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}
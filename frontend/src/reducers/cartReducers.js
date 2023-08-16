import {

  // CART_LIST_REQUEST,
  //   CART_LIST_SUCCESS,
  //   CART_LIST_FAIL,


    CART_ADD_ITEM,
    CART_MINUS_ITEM,

    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

// // reduce cart from db
// export const cartListReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//       case CART_LIST_REQUEST:
//           return { loading: true, cartItems: [] }

//       case CART_LIST_SUCCESS:
//         console.log("cartItems",action.payload.cartItems)


//           return {
//               loading: false,
//               cartItems: action.payload.cartItems,
             
//           }

//       case CART_LIST_FAIL:

//           return { loading: false, error: action.payload }

//       default:
//           return state
//   }
// }



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
                const minusItem = action.payload;
  
                const updatedCartItems = state.cartItems.map(item =>
                  item.product === Number(minusItem) 
                  ? { ...item, qty: item.qty - 1 }
                  : item
                  );
                  
          
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
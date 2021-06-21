import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import CartItem from '../../models/cartItem'
import { ADD_ORDER } from "../actions/ordersAction";
// import { DELETE_PRODUCT } from "../actions/productsActions";
const initialState ={
    items:{},
    totalAmount :0
}

export default(state= initialState,action) =>
{
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            let updatedNewCartItem;
            if(state.items[addedProduct.id]){
                //ALREADY IN THE CART!! 
                updatedNewCartItem = new CartItem(state.items[addedProduct.id].quantity+1,
                                                    prodPrice,
                                                    prodTitle,
                                                    state.items[addedProduct.id].sum+prodPrice);
                // return {...state,items:{...state.items,[addedProduct.id]:updatedCartItem},
                // totalAmount:state.totalAmount+prodPrice}
            }
            else{
                updatedNewCartItem = new CartItem(1,prodPrice,prodTitle,prodPrice);
                

            }
            return {
                // ...state,
                items:{...state.items,[addedProduct.id]:updatedNewCartItem},
                totalAmount:state.totalAmount+prodPrice};
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid]
            const currentQTY = selectedCartItem.quantity;
            let updatedCartItems;
            if(currentQTY>1)
            {
                //NEED TO REDUCE IT NOT TO ERASE IT
                const updatedCartItem = new CartItem(selectedCartItem.quantity-1,selectedCartItem.productPrice,selectedCartItem.productTitle,selectedCartItem.sum-selectedCartItem.productPrice);
                updatedCartItems= {...state.items,[action.pid]:updatedCartItem}
            }
            else{
                //ERASE IT
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid];
            }
            return {
            ...state,
            items:updatedCartItems,
            totalAmount:state.totalAmount-selectedCartItem.productPrice}
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if(!state.items[action.pid])
            {
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum
            delete updatedItems[action.pid];
            return {
                ...state,
                items:updatedItems,
                totalAmount:state.totalAmount-itemTotal
            }
    }
    return state;
}


import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
    // No need to add thunk manually!
});

export default store;
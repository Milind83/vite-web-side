import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // {product, quantity}
    },
    reducers: {
        addToCart(state, action) {
            const existing = state.items.find(item => item.product.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.product.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

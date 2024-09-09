import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0
  },
  reducers: {
    addItem: (state, action) => {
    const {name, image, cost} = action.payload;
    const existingItem = state.items.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.items.push({ name, image, cost, quantity: 1 });
    }
    state.totalItems++;
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      const ItemToRemove = state.items.find(item => item.name === name);

      if (ItemToRemove) {
        state.totalItems -= ItemToRemove.quantity; 
        state.items = state.items.filter(item => item.name !== name);
      }
    },
    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate){
        state.totalItems += (quantity - itemToUpdate.quantity);
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const selectTotalItems = state => state.cart.totalItems;

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

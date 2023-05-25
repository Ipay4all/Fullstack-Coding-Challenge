import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: {},
        error: null,
        loading: false,
    },
    reducers: {
        productRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        productFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getAllProductsSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload;
        },
        getProductSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.product = action.payload;
        },
        addProductSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products.push(action.payload);
        },
        updateProductSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = state.products.map(product => product._id === action.payload._id ? action.payload : product);
        },
        deleteProductSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = state.products.filter(product => product._id !== action.payload);
        },
        getOriginalProductSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.product = action.payload;
        },
        dropDBSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = [];
            state.product = {};
        }
    }
});

export const { productRequest, productFailure, getAllProductsSuccess, getProductSuccess, addProductSuccess, updateProductSuccess, deleteProductSuccess, getOriginalProductSuccess, dropDBSuccess } = productSlice.actions;

export const selectProduct = state => state.product;

export default productSlice.reducer;

import axios from "axios";
import { productRequest, productFailure, getAllProductsSuccess, getProductSuccess, addProductSuccess, updateProductSuccess, deleteProductSuccess, getOriginalProductSuccess, dropDBSuccess } from "../features/productSlicer";

// Get all products
export const getAllProducts = (dispatch) => {
    try {
        dispatch(productRequest());
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/products`)
            .then(response => {
                dispatch(getAllProductsSuccess(response.data));
            })
            .catch(error => {
                dispatch(productFailure(error.response.data.message));
            });
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}

// Get a product
export const getProduct = (dispatch, id) => {
    try {
        dispatch(productRequest());
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/product/${id}`)
            .then(response => {
                dispatch(getProductSuccess(response.data));
            })
            .catch(error => {
                dispatch(productFailure(error.response.data.message));
            });
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}

// Add a product
export const addProduct = (dispatch, payload) => {
    const productDetails = {
        name: payload.target.name.value,
        price: payload.target.price.value,
        description: payload.target.description.value,
        image: payload.target.image.value,
        category: payload.target.category.value,
    };

    try {
        dispatch(productRequest());
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/product`, productDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })  
            .then(response => {
                dispatch(addProductSuccess(response.data));
            })
            .catch(error => {
                dispatch(productFailure(error.response.data.message));
            });
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}

// Update a product
export const updateProduct = (dispatch, payload) => {
    const productDetails = {
        name: payload.target.name.value,
        price: payload.target.price.value,
        description: payload.target.description.value,
        image: payload.target.image.value,
        category: payload.target.category.value,
    };

    try {
        dispatch(productRequest());
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/product/${payload.target.id.value}`, productDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                dispatch(updateProductSuccess(response.data));
            })
            .catch(error => {
                dispatch(productFailure(error.response.data.message));
            });
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}

// Delete a product
export const deleteProduct = (dispatch, id) => {
    try {
        dispatch(productRequest());
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                dispatch(deleteProductSuccess(response.data));
            })
            .catch(error => {
                dispatch(productFailure(error.response.data.message));
            });
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}

// Get original products
export const getOriginalProducts = (dispatch) => {
    try {
        dispatch(productRequest());
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/save`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                dispatch(getOriginalProductSuccess(response.data));
            }
            )
            .catch(error => {
                dispatch(productFailure(error.response.data.message));
            }
            );
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}

// Drop DB
export const dropDB = (dispatch, password) => {
    try {
        dispatch(productRequest());
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/drop/${password}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                dispatch(dropDBSuccess(response.data));
            }
            )
            .catch(error => {
                dispatch(productFailure(error.response.data.message));
            }
            );
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}



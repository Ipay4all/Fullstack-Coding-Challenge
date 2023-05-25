import axios from "axios";
import { productRequest, productFailure, getAllProductsSuccess, getProductSuccess, addProductSuccess, updateProductSuccess, deleteProductSuccess, getOriginalProductSuccess, dropDBSuccess } from "../features/productSlicer";

// Get all products
export const getAllProducts = (dispatch) => {
    try {
        dispatch(productRequest());
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/products`)
            .then(response => {
                console.log(response.data)
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
export const addProduct = (dispatch, payload, toast) => {

    try {
        dispatch(productRequest());
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/product`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })  
            .then(response => {
                dispatch(addProductSuccess(response.data));
                toast({
                    title: "Product added.",
                    description: "We've added your product for you.",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
            })
            .catch(error => {
                dispatch(productFailure(error.response.data.message));
            });
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}

// Update a product
export const updateProduct = (dispatch, payload, toast) => {

    console.log(payload)

    try {
        dispatch(productRequest());
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/product/${payload.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                dispatch(updateProductSuccess(response.data));
                toast({
                    title: "Product updated.",
                    description: payload.productName + " has been updated.",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });

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
                dispatch(deleteProductSuccess(id));
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
            .get(`${process.env.REACT_APP_SERVER_URL}/save`, {
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
export const dropDB = (dispatch, password, toast, onClose) => {
    try {
        dispatch(productRequest());
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/drop/${password}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                dispatch(dropDBSuccess());
                toast({
                    title: "Products Database Deleted",
                    description: "You have cleared all data in the Products Database",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                onClose();
            }
            )
            .catch(error => {
                dispatch(productFailure(error.response));
            }
            );
    } catch (error) {
        dispatch(productFailure(error.message));
    }
}



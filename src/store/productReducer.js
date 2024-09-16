import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ERROR_CLEAR,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
} from "../constants/constants";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.allProducts,
                productsCount: action.payload.productsCount,
                currentProducts: action.payload.currentProducts,
            };
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ERROR_CLEAR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                ...state
            };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ERROR_CLEAR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

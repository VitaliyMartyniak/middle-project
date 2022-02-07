import {createReducer, on} from "@ngrx/store";
import {setUser} from "../actions/auth";

export interface AuthState {
  user: any,
}

export const initialState: AuthState = {
  user: {},
}

export const authReducer = createReducer(
  initialState,
  on(setUser, (state) => ({
    ...state,
    cartProducts: []
  })),
  // on(addToCart, (state, {product}) => {
  //   const existingProduct = state.cartProducts.find((cartProduct: Product) => cartProduct.id === product.id);
  //   if (!existingProduct) {
  //     return ({
  //       ...state,
  //       cartProducts: [...state.cartProducts, {...product, countInCart: 1}],
  //     })
  //   } else {
  //     return ({
  //       ...state,
  //       cartProducts: state.cartProducts.map((cartProduct: Product) => cartProduct.id === product.id ? {
  //         ...cartProduct, countInCart: cartProduct.countInCart! + 1
  //       }: cartProduct)
  //     })
  //   }
  // }),
  // on(changeExistingProductCount, (state, {product, value}) => ({
  //   ...state,
  //   cartProducts: state.cartProducts.map((cartProduct: Product) => cartProduct.id === product.id ? {
  //     ...cartProduct, countInCart: value
  //   } : cartProduct),
  // })),
  // on(removeFromCart, (state, {id}) => ({
  //   ...state,
  //   cartProducts: state.cartProducts.filter((product: Product) => product.id !== id),
  // })),
  // on(submitOrder, (state) => ({
  //   ...state,
  //   cartProducts: []
  // })),
);

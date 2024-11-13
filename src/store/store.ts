import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) => {
        set(
          produce((state: any) => {
            let found = false;

            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                found = true;
                let size = false;

                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size === cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }

                if (!size) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }

            if (!found) {
              state.CartList.push(cartItem);
            }
          }),
        );
      },
      calculateCartPrice: () => {
        set(
          produce((state: any) => {
            let total = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let itemPrice = 0;

              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                itemPrice +=
                  parseFloat(state.CartList[i].prices[j].price) *
                  state.CartList[i].prices[j].quantity;
              }

              state.CartList[i].itemPrice = itemPrice.toFixed(2).toString();
              total += itemPrice;
            }

            state.CartPrice = total.toFixed(2).toString();
          }),
        );
      },
      addToFavoriteList: (type: string, id: number) => {
        set(
          produce((state: any) => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favourite === false) {
                    state.CoffeeList[i].favourite = true;
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  }

                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {
                  if (state.BeanList[i].favourite === false) {
                    state.BeanList[i].favourite = true;
                    state.FavoritesList.unshift(state.BeanList[i]);
                  }

                  break;
                }
              }
            }
          }),
        );
      },
      removeFromFavoriteList: (type: string, id: number) => {
        set(
          produce((state: any) => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favourite === true) {
                    state.CoffeeList[i].favourite = false;
                  }

                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {
                  if (state.BeanList[i].favourite === true) {
                    state.BeanList[i].favourite = false;
                  }

                  break;
                }
              }
            }
            let index = state.FavoritesList.findIndex(
              (item: any) => item.id === id,
            );

            if (index !== -1) {
              state.FavoritesList.splice(index, 1);
            }
          }),
        );
      },
      increamentCartItemQuantity: (id: number, size: string) => {
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        );
      },
      decrementCartItemQuantity: (id: string, size: string) => {
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    if (state.CartLis[i].prices.length > 1) {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                        break;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                        break;
                      } else {
                        state.CartList.splice(i, 1);
                        break;
                      }
                    }
                  }
                }
              }
            }
          }),
        );
      },
      addToOrderHistoryListFromCart: () => {
        set(
          produce(state => {
            const temp = state.CartList.reduce(
              (acc: number, curr: any) =>
                acc + parseFloat(curr.itemPrice.price),
              0,
            );

            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                orderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                cartList: state.CartList,
                cartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                orderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                cartList: state.CartList,
                cartListPrice: temp.toFixed(2).toString(),
              });
            }

            state.CartList = [];
          }),
        );
      },
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useStore;

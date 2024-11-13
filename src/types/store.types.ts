export interface Store {
  CoffeeList: any;
  BeansList: any;
  cartPrice: number;
  CartList: any[];
  orderHistoryList: any[];
}

type Price = {
  size: string;
  price: string;
  currency: string;
};

export type CoffeeItem = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string;
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
};

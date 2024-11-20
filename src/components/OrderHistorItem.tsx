import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';
import OrderCard from './OrderCard';

interface Props {
  navigationHandler: any;
  orderDate: any;
  cartList: any;
  cartListPrice: any;
}

const OrderHistorItem: React.FC<Props> = ({
  navigationHandler,
  orderDate,
  cartList,
  cartListPrice,
}) => {
  return (
    <View style={styles.orderHistoryItemContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SPACING.space_20,
        }}>
        <View>
          <Text style={styles.title}>Order Time</Text>
          <Text style={styles.subTitle}>{orderDate}</Text>
        </View>
        <View>
          <Text style={styles.title}>Total Amount</Text>
          <Text
            style={[
              styles.subTitle,
              {color: COLORS.primaryOrangeHex, textAlign: 'right'},
            ]}>
            $ {cartListPrice}
          </Text>
        </View>
      </View>

      {/* cart list */}
      <View style={{marginTop: 15, paddingHorizontal: SPACING.space_20}}>
        {cartList.map((cartItem: any, i: number) => {
          return (
            <OrderCard
              key={i}
              name={cartItem.name}
              special_ingredient={cartItem.special_ingredient}
              imagelink_square={cartItem.imagelink_square}
              type={cartItem.type}
              id={cartItem.id}
              prices={cartItem.prices}
              itemPrice={cartItem.ItemPrice}
            />
          );
        })}
      </View>
    </View>
  );
};

export default OrderHistorItem;

const styles = StyleSheet.create({
  orderHistoryItemContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 12,
    color: COLORS.secondaryLightGreyHex,
    fontWeight: 'bold',
  },
});

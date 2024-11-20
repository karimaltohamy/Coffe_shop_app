import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING} from '../theme/theme';

interface Props {
  name: string;
  special_ingredient: string;
  imagelink_square: ImageProps;
  type: string;
  id: number;
  prices: any;
  itemPrice: string;
}

const OrderCard: React.FC<Props> = ({
  name,
  special_ingredient,
  imagelink_square,
  type,
  id,
  prices,
  itemPrice,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.orderCardContainer}>
      <View style={styles.orderCardContainerInfo}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image source={imagelink_square} style={styles.orderCardImage} />
          <View>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.primaryWhiteHex,
                fontWeight: 'bold',
              }}>
              {name}
            </Text>
            <Text style={{fontSize: 12, color: COLORS.secondaryLightGreyHex}}>
              {special_ingredient}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 14,
            color: COLORS.primaryOrangeHex,
            fontWeight: 'bold',
          }}>
          $ <Text style={{color: COLORS.primaryWhiteHex}}>{itemPrice}</Text>
        </Text>
      </View>
      <View style={styles.orderCardContainerPrices}>
        {prices.map((data: any, i: number) => {
          return (
            <View key={i} style={styles.priceItem}>
              <View style={styles.infoPrices}>
                <Text style={[styles.infoPricesText]}>{data.size}</Text>
                <View
                  style={{width: 1, height: '100%', backgroundColor: '#fff'}}
                />
                <Text style={styles.infoPricesText}>
                  <Text style={{color: COLORS.primaryOrangeHex}}>$ </Text>
                  {data.price}
                </Text>
              </View>
              <View
                style={[
                  styles.infoPrices,
                  {gap: SPACING.space_20, backgroundColor: 'transparent'},
                ]}>
                <Text style={{color: COLORS.primaryWhiteHex}}>
                  X {data.quantity}
                </Text>
                <Text
                  style={{color: COLORS.primaryOrangeHex, fontWeight: 'bold'}}>
                  $ {data.price}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </LinearGradient>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  orderCardContainer: {
    padding: SPACING.space_10,
    marginBottom: SPACING.space_10,
    borderRadius: SPACING.space_10,
  },
  orderCardContainerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.space_10,
    paddingBottom: SPACING.space_10,
  },
  orderCardImage: {width: 70, height: 70, borderRadius: SPACING.space_10},
  orderCardContainerPrices: {},
  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_10,
    marginBottom: SPACING.space_10,
    width: '100%',
  },
  infoPrices: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: SPACING.space_8,
  },
  infoPricesText: {
    fontSize: 12,
    color: COLORS.primaryWhiteHex,
    minWidth: 70,
    textAlign: 'center',
    padding: SPACING.space_8,
    fontWeight: 'bold',
  },
});

import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Props {
  id: number;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<Props> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cartItemContainer}>
          <View style={styles.cartDetailsContainer}>
            <Image source={imagelink_square} style={styles.cartImage} />
            <View style={styles.cartDetailsInfo}>
              <View>
                <Text style={styles.cartName}>{name}</Text>
                <Text style={styles.cartSubtitle}>{special_ingredient}</Text>
              </View>
              <View>
                <View style={styles.cartRoasted}>
                  <Text style={{fontSize: 10, color: COLORS.primaryWhiteHex}}>
                    {roasted}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cartQuantityContainer}>
            {prices.map((data: any, i: number) => {
              return (
                <View style={styles.priceItem} key={i}>
                  <View style={styles.priceItemSize}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.primaryWhiteHex,
                        fontWeight: 'bold',
                      }}>
                      {data.size}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: SPACING.space_10}}>
                    <Text style={styles.priceItemCurrency}>
                      {data.currency}{' '}
                      <Text style={styles.priceItemPrice}>{data.price}</Text>
                    </Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        decrementCartItemQuantityHandler(id, data.size);
                      }}>
                      <AntDesign
                        name="minus"
                        size={20}
                        color={COLORS.primaryWhiteHex}
                      />
                    </TouchableOpacity>
                    <View style={styles.quantityItem}>
                      <Text style={styles.priceItemPrice}>{data.quantity}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        incrementCartItemQuantityHandler(id, data.size);
                      }}>
                      <AntDesign
                        name="plus"
                        size={20}
                        color={COLORS.primaryWhiteHex}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cartItemContainer}>
          <View style={styles.cartDetailsContainer}>
            <Image source={imagelink_square} style={styles.cartImage} />
            <View style={styles.cartDetailsInfo}>
              <View>
                <Text style={styles.cartName}>{name}</Text>
                <Text style={styles.cartSubtitle}>{special_ingredient}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: SPACING.space_10,
                  alignItems: 'center',
                  marginBottom: SPACING.space_10,
                  marginTop: SPACING.space_10,
                  flex: 1,
                }}>
                <View style={styles.priceSingleItemSize}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        fontSize:
                          type == 'Bean' ? FONTSIZE.size_10 : FONTSIZE.size_14,
                      },
                    ]}>
                    {prices[0].size}
                  </Text>
                </View>
                <Text style={styles.priceItemCurrency}>
                  {prices[0].currency}{' '}
                  <Text style={styles.priceItemPrice}>{prices[0].price}</Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: SPACING.space_10,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, prices[0].size);
                  }}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
                <View style={styles.quantityItem}>
                  <Text style={styles.priceItemPrice}>
                    {prices[0].quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, prices[0].size);
                  }}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    padding: SPACING.space_10,
    marginBottom: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_15,
  },
  cartDetailsContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: SPACING.space_10,
  },
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: BORDERRADIUS.radius_15,
  },
  cartDetailsInfo: {
    justifyContent: 'space-between',
    flex: 1,
  },
  cartName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_4,
  },
  cartSubtitle: {
    fontSize: 12,
    color: COLORS.secondaryLightGreyHex,
  },
  cartRoasted: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_4,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_4,
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  cartQuantityContainer: {
    flex: 1,
  },
  priceItem: {
    flexDirection: 'row',
    gap: SPACING.space_2,
    justifyContent: 'space-between',
    marginTop: SPACING.space_10,
  },
  priceItemSize: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_4,
    backgroundColor: COLORS.secondaryBlackRGBA,
  },
  priceSingleItemSize: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_2,
    borderRadius: BORDERRADIUS.radius_4,
    backgroundColor: COLORS.secondaryBlackRGBA,
  },
  priceItemCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_16,
  },
  priceItemPrice: {
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  quantityButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING.space_8,
  },
  quantityItem: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBlackRGBA,
    borderRadius: SPACING.space_4,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    fontWeight: 'bold',
  },
});

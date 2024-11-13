import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import {Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  id: number;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const ItemCard: React.FC<Props> = React.memo(
  ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
  }) => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.cardContainer}>
        <ImageBackground source={imagelink_square} style={styles.imageCard}>
          <View style={styles.rateContainer}>
            <AntDesign name="star" size={14} color={COLORS.primaryOrangeHex} />
            <Text
              style={{
                color: COLORS.primaryWhiteHex,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              {average_rating}
            </Text>
          </View>
        </ImageBackground>

        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: COLORS.primaryWhiteHex,
            marginBottom: SPACING.space_4,
          }}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.primaryWhiteHex,
          }}>
          {special_ingredient}
        </Text>

        <View style={styles.cardBottom}>
          <Text style={styles.price}> ${price.price}</Text>
          <TouchableOpacity style={styles.btnAdd} onPress={buttonPressHandler}>
            <MaterialIcons
              name="add"
              size={24}
              color={COLORS.primaryWhiteHex}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  },
);

export default ItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_20,
  },
  imageCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_4,
    backgroundColor: COLORS.primaryBlackRGBA,
    position: 'absolute',
    top: 0,
    right: 0,
    padding: SPACING.space_4,
    paddingHorizontal: SPACING.space_8,
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryOrangeHex,
  },
  btnAdd: {
    backgroundColor: COLORS.primaryOrangeHex,
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

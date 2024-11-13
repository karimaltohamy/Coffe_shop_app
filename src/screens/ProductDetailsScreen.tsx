import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import useStore from '../store/store';
import {TouchableOpacity} from 'react-native';
import PaymentFooter from '../components/PaymentFooter';

const ProductDetails = ({navigation, route}: any) => {
  const productItem = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const [price, setPrice] = useState<any>(productItem.prices[0]);
  const {
    removeFromFavorites,
    addToFavoriteList,
    addToCart,
    calculateCartPrice,
  } = useStore((state: any) => state);

  const BackHandler = () => {
    navigation.goBack();
  };

  const ToggleFavourite = () => {
    productItem.favourite
      ? removeFromFavorites(productItem.type, productItem.id)
      : addToFavoriteList(productItem.type, productItem.id);
  };

  const handleAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackgroundInfo
          enableBackHandler={true}
          imagelink_portrait={productItem.imagelink_portrait}
          type={productItem.type}
          id={productItem.id}
          favourite={productItem.favourite}
          name={productItem.name}
          special_ingredient={productItem.special_ingredient}
          ingredients={productItem.ingredients}
          average_rating={productItem.average_rating}
          ratings_count={productItem.ratings_count}
          roasted={productItem.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View
          style={{
            paddingHorizontal: SPACING.space_20,
            marginTop: SPACING.space_20,
            marginBottom: SPACING.space_30,
          }}>
          <Text style={styles.mainTitle}>Description</Text>
          {showFullDescription ? (
            <TouchableWithoutFeedback
              onPress={() => setShowFullDescription(prev => !prev)}>
              <Text style={{color: 'white', lineHeight: 20}}>
                {productItem.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setShowFullDescription(prev => !prev)}>
              <Text style={{color: 'white', lineHeight: 20}} numberOfLines={3}>
                {productItem.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>

        <View style={{paddingHorizontal: SPACING.space_20}}>
          <Text style={styles.mainTitle}>Size</Text>
          <View style={{flexDirection: 'row', gap: SPACING.space_8, flex: 1}}>
            {productItem.prices.map((item: any) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.sizeButton,
                    {
                      borderColor:
                        item.size === price.size
                          ? COLORS.primaryOrangeHex
                          : 'transparent',
                    },
                  ]}
                  key={item.size}
                  onPress={() => {
                    setPrice(item);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: FONTSIZE.size_16,
                    }}>
                    {item.size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <PaymentFooter
          price={price.price}
          currency={price.currency}
          title="Add to Cart"
          onclick={() =>
            handleAddToCart({
              id: productItem.id,
              index: productItem.index,
              name: productItem.name,
              roasted: productItem.roasted,
              imagelink_square: productItem.imagelink_square,
              special_ingredient: productItem.special_ingredient,
              type: productItem.type,
              price: price,
            })
          }
        />
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  mainTitle: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_20,
    marginBottom: SPACING.space_8,
    fontWeight: 'bold',
  },
  sizeButton: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    padding: SPACING.space_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING.space_8,
    borderWidth: 2,
  },
});

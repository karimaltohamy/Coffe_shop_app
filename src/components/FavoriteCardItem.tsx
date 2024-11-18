import {ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import useStore from '../store/store';

interface Props {
  id: number;
  name: string;
  imagelink_portrait: ImageProps;
  special_ingredient: string;
  roasted: string;
  type: string;
  description: string;
  favourite: boolean;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
}

const FavoriteCardItem: React.FC<Props> = ({
  id,
  name,
  imagelink_portrait,
  special_ingredient,
  roasted,
  type,
  description,
  favourite,
  ingredients,
  average_rating,
  ratings_count,
}) => {
  const {addToFavoriteList, removeFromFavoriteList} = useStore(
    (state: any) => state,
  );

  const ToggleFavourite = () => {
    favourite ? removeFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  return (
    <View style={styles.favoriteCardContainer}>
      <ImageBackgroundInfo
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favourite={favourite}
        name={name}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        BackHandler={() => {}}
        ToggleFavourite={ToggleFavourite}
        enableBackHandler={false}
        special_ingredient={special_ingredient}
      />
      <LinearGradient
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        start={{y: 0, x: 0}}
        end={{y: 1, x: 1}}
        style={styles.linearGradient}>
        <Text style={styles.headTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

export default FavoriteCardItem;

const styles = StyleSheet.create({
  favoriteCardContainer: {
    borderRadius: SPACING.space_20,
    marginBottom: SPACING.space_20,
    overflow: 'hidden',
  },
  linearGradient: {
    padding: SPACING.space_10,
  },
  headTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
    marginBottom: SPACING.space_4,
  },
  description: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
  },
});

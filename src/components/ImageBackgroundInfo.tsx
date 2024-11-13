import {
  View,
  ImageBackground,
  StyleSheet,
  ImageBackgroundProps,
  Touchable,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {SafeAreaView} from 'react-native';
import GradientBGIcon from './GradientBGIcon.component';
import {useHeaderHeight} from '@react-navigation/elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  enableBackHandler: boolean;
  imagelink_portrait: ImageBackgroundProps;
  type: string;
  id: number;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler: () => void;
  ToggleFavourite: () => void;
}

const ImageBackgroundInfo: React.FC<Props> = ({
  enableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}) => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imagelink_portrait}
        style={[styles.ImageBackground, {paddingTop: headerHeight}]}>
        <SafeAreaView
          style={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          {enableBackHandler ? (
            <View style={styles.enableBackHandlerRow}>
              <TouchableOpacity onPress={BackHandler}>
                <GradientBGIcon>
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={COLORS.primaryWhiteHex}
                  />
                </GradientBGIcon>
              </TouchableOpacity>
              <TouchableOpacity onPress={ToggleFavourite}>
                <GradientBGIcon>
                  <MaterialIcons
                    name={favourite ? 'favorite' : 'favorite-border'}
                    size={24}
                    color={
                      favourite ? COLORS.primaryRedHex : COLORS.primaryWhiteHex
                    }
                  />
                </GradientBGIcon>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.disableBackHandlerRow}>
              <TouchableOpacity onPress={BackHandler}>
                <GradientBGIcon>
                  <MaterialIcons
                    name="favorite-border"
                    size={24}
                    color={COLORS.primaryWhiteHex}
                  />
                </GradientBGIcon>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.imageInfoFooter}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text style={styles.infoImageTitle}>{name}</Text>
                <Text style={styles.infoImageSubtitle}>
                  {special_ingredient}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View style={styles.miniBox}>
                  <MaterialCommunityIcons
                    name={
                      type == 'Bean'
                        ? 'coffee-maker-check-outline'
                        : 'coffee-outline'
                    }
                    size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                    color={COLORS.primaryOrangeHex}
                  />

                  <Text style={[styles.PropertyTextFirst, ,]}>{type}</Text>
                </View>
                <View style={styles.miniBox}>
                  <Ionicons
                    name={type == 'Bean' ? 'location-outline' : 'water-outline'}
                    size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                    color={COLORS.primaryOrangeHex}
                  />

                  <Text style={[styles.PropertyTextFirst]}>{ingredients}</Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.InfoContainerRow,
                {
                  marginTop: SPACING.space_12,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <AntDesign
                  name="star"
                  size={FONTSIZE.size_24}
                  color={COLORS.primaryOrangeHex}
                />
                <Text style={styles.PropertyRate}>{average_rating}</Text>
                <Text style={styles.PropertyTextFirst}>({ratings_count})</Text>
              </View>
              <View style={styles.PropertyRoasted}>
                <Text style={styles.PropertyText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageBackground: {
    flexGrow: 1,
    aspectRatio: 20 / 25,
  },

  enableBackHandlerRow: {
    paddingHorizontal: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disableBackHandlerRow: {
    paddingHorizontal: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageInfoFooter: {
    backgroundColor: COLORS.primaryBlackRGBA,
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    borderTopLeftRadius: SPACING.space_20,
    borderTopRightRadius: SPACING.space_20,
  },
  InfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoImageTitle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_4,
  },
  infoImageSubtitle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  miniBox: {
    width: 55,
    height: 55,
    borderRadius: 13,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PropertyTextFirst: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
    fontWeight: 'bold',
    marginTop: SPACING.space_2,
  },
  PropertyRate: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
  },
  PropertyRoasted: {
    padding: SPACING.space_15,
    borderRadius: SPACING.space_8,
    backgroundColor: COLORS.primaryBlackHex,
  },
  PropertyText: {
    color: COLORS.secondaryLightGreyHex,
  },
});

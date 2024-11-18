import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SPACING} from '../theme/theme';
import Header from '../components/Header.component';
import useStore from '../store/store';
import EmptyComponent from '../components/EmptyComponent';
import FavoriteCardItem from '../components/FavoriteCardItem';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const Favorites = () => {
  const {FavoritesList} = useStore((state: any) => state);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContainer,
          {
            paddingBottom: tabBarHeight,
          },
        ]}>
        <View style={styles.innerScrollViewContainer}>
          <Header title="Favorites" enablePadding={true} />
          {FavoritesList.length === 0 ? (
            <EmptyComponent title="Favorites is Empty" />
          ) : (
            <>
              <View style={{paddingHorizontal: SPACING.space_20, flex: 1}}>
                {FavoritesList.map((productItem: any, i: number) => {
                  return (
                    <FavoriteCardItem
                      key={i}
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
                      description={productItem.description}
                    />
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  innerScrollViewContainer: {
    flex: 1,
  },
});

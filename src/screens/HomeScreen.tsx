import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import useStore from '../store/store';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header.component';
import SearchBar from '../components/SearchBar.component';
import ItemCard from '../components/ItemCard.component';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

interface Category {
  index: number;
  category: string;
}

// function for getting categories from data
const getCategoriesFromData = (data: any[]) => {
  let temp: any = {};

  data.forEach((item: any) => {
    if (temp[item.name] == undefined) {
      temp[item.name] = 1;
    } else {
      temp[item.name] += 1;
    }
  });

  let categories = Object.keys(temp);
  categories.unshift('All');

  return categories;
};

// function for getting coffee list from data
const getCoffeeList = (category: string, data: any[]) => {
  if (category === 'All') {
    return data;
  } else {
    const filteredData = data.filter((item: any) => item.name === category);
    return filteredData;
  }
};

const Home = ({navigation}: any) => {
  const listRef = useRef<FlatList<any>>(null);
  const coffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const {addToCart, calculateCartPrice} = useStore((state: any) => state);
  const [searchText, setSearchText] = useState<string>('');
  const [categories, setCategories] = useState<string[]>(
    getCategoriesFromData(coffeeList),
  );
  const [categoryIndex, setCategoryIndex] = useState<Category>({
    index: 0,
    category: 'All',
  });
  const [sortedCoffee, setSortedCoffee] = useState<any[]>(
    getCoffeeList(categoryIndex.category, coffeeList),
  );
  const tabBarHeight = useBottomTabBarHeight();

  const handleSearch = (text: string) => {
    setSearchText(text);
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee(
      coffeeList.filter((item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const resetSearch = () => {
    if (searchText.length > 0) {
      listRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setSearchText('');
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee(getCoffeeList(categories[0], coffeeList));
    }
  };

  const handleAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar
        backgroundColor={COLORS.primaryBlackHex}
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollViewContainer,
          {paddingBottom: tabBarHeight},
        ]}>
        <Header title="Home" />

        <Text style={styles.mainTitle}>Find the best{'\n'}coffee for you</Text>

        {/* Search Bar */}
        <SearchBar
          searchText={searchText}
          setSearchText={handleSearch}
          resetSearch={resetSearch}
        />

        {/* Coffee List */}
        <View style={{paddingBottom: tabBarHeight}}>
          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.CategoryScrollViewStyle}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                style={{alignItems: 'center'}}
                onPress={() => {
                  listRef.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index, category});
                  setSortedCoffee(getCoffeeList(category, coffeeList));
                }}>
                <Text
                  style={{
                    color:
                      index === categoryIndex.index
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryLightGreyHex,
                  }}>
                  {category}
                </Text>
                {index === categoryIndex.index && (
                  <View style={styles.activeCategory}></View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <FlatList
            ref={listRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            keyExtractor={item => item.id}
            contentContainerStyle={[styles.FlatListContainer]}
            ListEmptyComponent={() => (
              <View style={styles.EmptyListContainer}>
                <Text style={styles.EmptyListText}>
                  No coffee found for "{searchText}"
                </Text>
                <Text style={styles.EmptyListText}>
                  Try searching for a different category
                </Text>
              </View>
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push('productDetails', {
                    id: item.id,
                    index: index,
                    type: item.type,
                  })
                }>
                <ItemCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {
                    handleAddToCart({
                      id: item.id,
                      index: item.index,
                      name: item.name,
                      roasted: item.roasted,
                      imagelink_square: item.imagelink_square,
                      special_ingredient: item.special_ingredient,
                      type: item.type,
                      prices: [{...item.prices[2], quantity: 1}],
                    });
                  }}
                />
              </TouchableOpacity>
            )}
          />

          <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

          {/* Bean List */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={BeanList}
            keyExtractor={item => item.id}
            contentContainerStyle={[styles.FlatListContainer]}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push('productDetails', {
                    id: item.id,
                    index: index,
                    type: item.type,
                  })
                }>
                <ItemCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {
                    handleAddToCart({
                      id: item.id,
                      index: item.index,
                      name: item.name,
                      roasted: item.roasted,
                      imagelink_square: item.imagelink_square,
                      special_ingredient: item.special_ingredient,
                      type: item.type,
                      prices: [{...item.prices[2], quantity: 1}],
                    });
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  CategoryScrollViewStyle: {
    marginBottom: SPACING.space_20,
    gap: SPACING.space_20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
    marginBottom: 20,
  },
  activeCategory: {
    width: SPACING.space_8,
    height: SPACING.space_8,
    borderRadius: 50,
    backgroundColor: COLORS.primaryOrangeHex,
    marginTop: 5,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_10,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginTop: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  EmptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.space_30,
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
  },
  EmptyListText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
  },
});

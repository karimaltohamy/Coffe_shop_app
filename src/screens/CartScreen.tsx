import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useStore from '../store/store';
import {COLORS, SPACING} from '../theme/theme';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header.component';
import {ScrollView} from 'react-native';
import PaymentFooter from '../components/PaymentFooter';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';
import CartItem from '../components/CartItem';
import EmptyComponent from '../components/EmptyComponent';

const CartScreen = ({navigation}: any) => {
  const {
    CartList,
    CartPrice,
    decrementCartItemQuantity,
    incrementCartItemQuantity,
    calculateCartPrice,
  } = useStore((state: any) => state);
  const tabBarHeight = useBottomTabBarHeight();

  const handleDecrementCartItemQuantity = (id: number, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const handleIncrementCartItemQuantity = (id: number, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

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
          <View style={{flex: 1}}>
            <Header title="Cart" enablePadding={true} />
            {CartList.length === 0 ? (
              <EmptyComponent title="Cart is Empty" />
            ) : (
              <>
                <View style={{paddingHorizontal: SPACING.space_20, flex: 1}}>
                  {CartList.map((data: any, i: number) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.push('productDetails', {
                            index: data.index,
                            id: data.id,
                            type: data.type,
                          })
                        }
                        key={data.id}>
                        <CartItem
                          id={data.id}
                          name={data.name}
                          imagelink_square={data.imagelink_square}
                          special_ingredient={data.special_ingredient}
                          roasted={data.roasted}
                          prices={data.prices}
                          type={data.type}
                          incrementCartItemQuantityHandler={
                            handleIncrementCartItemQuantity
                          }
                          decrementCartItemQuantityHandler={
                            handleDecrementCartItemQuantity
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <PaymentFooter
                  title="Pay"
                  onclick={() => {
                    navigation.push('payment', {
                      amount: CartPrice,
                      currency: '$',
                    });
                  }}
                  price={CartPrice}
                  currency={'$'}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

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
    justifyContent: 'space-between',
  },
});

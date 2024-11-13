import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useStore from '../store/store';
import {COLORS, SPACING} from '../theme/theme';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header.component';
import {ScrollView} from 'react-native';
import PaymentFooter from '../components/PaymentFooter';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const CartScreen = () => {
  const {CartList, CartPrice} = useStore((state: any) => state);
  const tabBarHeight = useBottomTabBarHeight();

  console.log(CartList.length);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContainer,
          {
            marginBottom: tabBarHeight,
          },
        ]}>
        <View style={styles.innerScrollViewContainer}>
          <View style={{flex: 1}}>
            <View>
              <Header title="Cart" enablePadding={true} />
            </View>
          </View>
          <PaymentFooter
            title="Pay"
            onclick={() => {}}
            price={CartPrice}
            currency={'$'}
          />
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

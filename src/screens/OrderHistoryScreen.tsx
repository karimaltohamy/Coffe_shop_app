import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SPACING} from '../theme/theme';
import Header from '../components/Header.component';
import useStore from '../store/store';
import OrderHistorItem from '../components/OrderHistorItem';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import PopupAnimation from './PopupAnimation';

const OrderHistory = ({navigation}: any) => {
  const {OrderHistoryList} = useStore((state: any) => state);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };

  const handleDownload = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopupAnimation
          source={require('../lottie/download.json')}
          style={{height: 200, width: 200}}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollViewContainer,
          {paddingBottom: tabBarHeight},
        ]}>
        <View style={styles.innerScrollViewContainer}>
          <Header title="Order History" enablePadding={true} />

          {/* orders history */}
          {OrderHistoryList.map((orderHistory: any, i: number) => {
            return (
              <OrderHistorItem
                key={i}
                navigationHandler={navigationHandler}
                orderDate={orderHistory.orderDate}
                cartList={orderHistory.cartList}
                cartListPrice={orderHistory.cartListPrice}
              />
            );
          })}
        </View>
        {OrderHistoryList.lenght > 0 && (
          <View style={{paddingHorizontal: SPACING.space_20, marginTop: 20}}>
            <TouchableOpacity
              style={styles.buttonDownload}
              onPress={handleDownload}>
              <Text
                style={{
                  color: COLORS.primaryWhiteHex,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                Download
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistory;

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
  buttonDownload: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_15,
    borderRadius: SPACING.space_15,
    width: '100%',
    alignItems: 'center',
  },
});

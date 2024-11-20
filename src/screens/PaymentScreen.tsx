import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon.component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemPayment from '../components/ ItemPayment';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useStore from '../store/store';
import PaymentFooter from '../components/PaymentFooter';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import PopupAnimation from './PopupAnimation';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const Payment = ({navigation, route}: any) => {
  const [paymentMode, setPaymentMode] = useState('credit');
  const [showAnimation, setShowAnimation] = useState(false);
  const {addToOrderHistoryListFromCart, calculateCartPrice, CartPrice} =
    useStore((state: any) => state);

  const handlePress = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();

    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('OrderHistory');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopupAnimation
          source={require('../lottie/successful.json')}
          style={{width: 200, height: 200}}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.scrollViewInnerContainer}>
          {/* header */}
          <View style={styles.headerPayment}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <GradientBGIcon>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={COLORS.primaryWhiteHex}
                />
              </GradientBGIcon>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment</Text>
            <View style={{width: 30}} />
          </View>

          {/* payment list */}
          <View style={{paddingHorizontal: SPACING.space_20, marginTop: 20}}>
            <TouchableOpacity onPress={() => setPaymentMode('credit')}>
              <View
                style={[
                  styles.CreditCardContainer,
                  {
                    borderColor:
                      paymentMode === 'credit'
                        ? COLORS.primaryOrangeHex
                        : COLORS.secondaryLightGreyHex,
                  },
                ]}>
                <Text style={styles.creditCardTitle}>Credit Card</Text>
                <LinearGradient
                  start={{y: 0, x: 0}}
                  end={{y: 1, x: 1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.CreditCardLinear}>
                  <View style={styles.CreditCardRow}>
                    <MaterialCommunityIcons
                      name="integrated-circuit-chip"
                      size={30}
                      color={COLORS.primaryOrangeHex}
                    />
                    <FontAwesome name="cc-visa" size={30} color="#fff" />
                  </View>
                  <View style={styles.numbersRow}>
                    <Text style={styles.numbers}>1913</Text>
                    <Text style={styles.numbers}>9834</Text>
                    <Text style={styles.numbers}>5239</Text>
                    <Text style={styles.numbers}>3062</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>
                        Robert Evans
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
            {PaymentList.map((payment: any, i: number) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setPaymentMode(payment.name)}>
                  <ItemPayment
                    icon={payment.icon}
                    name={payment.name}
                    isIcon={payment.isIcon}
                    paymentMode={paymentMode}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <PaymentFooter
          title={'Pay with ' + paymentMode.toUpperCase()}
          onclick={handlePress}
          price={route.params.amount}
          currency={route.params.currency}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  scrollViewInnerContainer: {
    flex: 1,
  },
  headerPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
  },

  CreditCardContainer: {
    borderWidth: 2,
    padding: SPACING.space_10,
    borderRadius: 15,
    marginBottom: SPACING.space_15,
  },
  creditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardLinear: {
    padding: SPACING.space_10,
    borderRadius: 15,
  },

  numbersRow: {
    paddingVertical: SPACING.space_30,
    flexDirection: 'row',
    gap: SPACING.space_15,
    alignItems: 'center',
  },
  numbers: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
    letterSpacing: 3,
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  CreditCardNameSubitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
    marginTop: SPACING.space_2,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
});

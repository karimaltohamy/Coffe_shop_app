import React from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDERRADIUS, COLORS} from '../theme/theme';

interface Props {
  price: any;
  currency: string;
  title: string;
  onclick: () => void;
}

const PaymentFooter: React.FC<Props> = ({price, title, onclick, currency}) => {
  return (
    <View style={styles.paymentFooter}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.secondaryLightGreyHex,
          }}>
          Price
        </Text>

        <Text
          style={{
            fontSize: 25,
            color: COLORS.primaryWhiteHex,
            marginTop: 5,
            fontWeight: 'bold',
          }}>
          <Text
            style={{
              fontSize: 22,
              color: COLORS.primaryOrangeHex,
              paddingRight: 5,
            }}>
            {currency}
          </Text>
          {price}
        </Text>
      </View>
      <TouchableOpacity onPress={onclick} style={styles.button}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.primaryWhiteHex,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  paymentFooter: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
    marginTop: 30,
  },
  button: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: BORDERRADIUS.radius_20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

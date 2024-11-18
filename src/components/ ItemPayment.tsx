import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface props {
  name: string;
  icon: any;
  isIcon: boolean;
  paymentMode: string;
}

const ItemPayment: React.FC<props> = ({name, icon, isIcon, paymentMode}) => {
  return (
    <LinearGradient
      start={{y: 0, x: 0}}
      end={{y: 1, x: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={[
        styles.itemPayment,
        {
          borderColor:
            paymentMode === name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        {isIcon ? (
          <MaterialCommunityIcons
            name={'wallet'}
            size={24}
            color={COLORS.primaryOrangeHex}
          />
        ) : (
          <Image source={icon} style={{width: 24, height: 24}} />
        )}
        <Text style={styles.itemPaymentText}>{name}</Text>
      </View>
      {isIcon ? <Text style={styles.PaymentPrice}>$ 100.50</Text> : null}
    </LinearGradient>
  );
};

export default ItemPayment;

const styles = StyleSheet.create({
  itemPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 50,
  },
  itemPaymentText: {
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  PaymentPrice: {
    fontSize: 14,
    color: COLORS.secondaryLightGreyHex,
    fontWeight: 'bold',
  },
});

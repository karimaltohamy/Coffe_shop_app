import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

interface props {
  children: React.ReactNode;
}

const GradientBGIcon: React.FC<props> = ({children}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.linearStyle}>
        {children}
      </LinearGradient>
    </View>
  );
};

export default GradientBGIcon;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.secondaryLightGreyHex,
    borderRadius: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
  },
  linearStyle: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

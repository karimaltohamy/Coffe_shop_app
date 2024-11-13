import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SPACING} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon.component';

interface HeaderProps {
  title: string;
  enablePadding?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, enablePadding = false}) => {
  return (
    <View
      style={[
        styles.headerContainer,
        {paddingHorizontal: enablePadding ? SPACING.space_20 : 0},
      ]}>
      <GradientBGIcon>
        <Ionicons name="grid" size={20} color={COLORS.primaryLightGreyHex} />
      </GradientBGIcon>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.profile}>
        <Image
          source={require('../assets/app_images/avatar.png')}
          style={styles.profile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
  },
  profile: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: SPACING.space_10,
  },
});

export default Header;

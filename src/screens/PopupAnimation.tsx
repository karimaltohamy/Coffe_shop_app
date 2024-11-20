import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

interface Props {
  style?: any;
  source?: any;
}

const PopupAnimation: React.FC<Props> = ({style, source}) => {
  return (
    <View style={styles.container}>
      <LottieView source={source} style={style} loop autoPlay />
    </View>
  );
};

export default PopupAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});

import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Payment from './src/screens/PaymentScreen';
import ProductDetails from './src/screens/ProductDetailsScreen';
import TabNavigators from './src/navigators/TabNavigators';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="tab" component={TabNavigators} />
        <Stack.Screen
          name="productDetails"
          component={ProductDetails}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IMCCalculatorScreen from './screens/IMCCalculatorScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <IMCCalculatorScreen />
    </SafeAreaProvider>
  );
}
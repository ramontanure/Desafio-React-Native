/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './src/Pages/Login'
import Cardapio from './src/Pages/Cardapio'

const App: () => React$Node = () => {
  return (
    <>
      <Login></Login>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;



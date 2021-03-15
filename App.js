import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import MainScreen from './src/screens/mainScreen/main';
import * as ScreenOrientation from 'expo-screen-orientation';
import DataProvider from './src/context/data';
import CarProvider from './src/context/car';
import Client from './src/API/client';


export default function App() {

  if (Platform.OS === 'ios' || Platform.OS === 'android')
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
  return (
    <SafeAreaView style={styles.container}>
      <DataProvider>
        <CarProvider>
          <Client>
            <MainScreen></MainScreen>
          </Client>
        </CarProvider>
      </DataProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row", // horizontal
    // justifyContent: "center", // main
    // alignItems: "center", // secondary
    // flexWrap: "wrap", 
    backgroundColor: '#00FF00FF'
  },
});

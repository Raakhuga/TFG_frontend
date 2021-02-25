import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import MainScreen from './src/screens/mainScreen/main';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import SPEED from './src/observables/speed';
import RPM from './src/observables/rpm';
//import * as ScreenOrientation from 'expo-screen-orientation';


const client = new W3CWebSocket('ws://192.168.100.1:4000')

export default function App() {

  client.onopen = () => {
    console.log('WebSocket Client Connected');
  }

  client.onmessage = (message) => {
    var data = message.data
    data = JSON.parse(data)
    if ('speed' in data) {
      SPEED.setValue(parseInt(data.speed));
    } else if ('rpm' in data) {
      RPM.setValue(parseInt(data.rpm))
    }
    console.log(data);
  }
  if (Platform.OS === 'ios' || Platform.OS === 'android')
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
  return (
    <SafeAreaView style={styles.container}>
      <MainScreen></MainScreen>
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

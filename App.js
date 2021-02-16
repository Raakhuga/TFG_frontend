import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/screens/mainScreen/main';
import { w3cwebsocket as W3CWebSocket } from "websocket";


const client = new W3CWebSocket('ws://localhost:4000')

export default function App() {

  client.onopen = () => {
    console.log('WebSocket Client Connected');
  }

  client.onmessage = (message) => {
    var data = message.data
    data = JSON.parse(data)
    console.log(data);
  }

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

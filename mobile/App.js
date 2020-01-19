import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>And Again, here we are!!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: '#fff', 
    fontSize: 30
  }
});

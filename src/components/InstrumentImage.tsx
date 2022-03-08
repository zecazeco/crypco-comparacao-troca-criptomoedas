import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function InstrumentImage({ imagePath }: any) {
  console.log(imagePath);
  return (
    <Avatar.Image style={styles.logo} size={24} source={{ uri: imagePath}} />
  );
}

const styles = StyleSheet.create({
  logo: {
    //paddingRight: 10,
  }
});

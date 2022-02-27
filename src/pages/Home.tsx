import React from 'react';
import { ScrollView } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Header from '../components/Header';
import Instrument from '../components/Instrument';

export default function App() {
  return (
    <>
      <Header />
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        overScrollMode='never'
      >
        <Instrument code='BTC' name='Bitcoin234' />
        <Instrument code='ETH' name='Ethereum' />                   
      </ScrollView>
    </>
  );
}
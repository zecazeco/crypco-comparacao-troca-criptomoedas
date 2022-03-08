import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import InstrumentImage from './InstrumentImage';

export default function Instrument({ coin, onPress }: any) {

  //const actionButton = ({props}:any) => <IconButton {...props} icon="plus" onPress={() => console.log(coin)} />
  const actionButton = ({props}:any) => <IconButton {...props} icon="plus" onPress={onPress} />
  const instImg = () => <InstrumentImage imagePath={coin.thumb} />

  return (
    <Card style={styles.card} mode='elevated' elevation={2}>
      <Card.Title
        title={coin.symbol}
        subtitle={coin.name}
        left={instImg}
        right={actionButton}
      />
    </Card>    
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    textTransform: 'uppercase'
  },
});
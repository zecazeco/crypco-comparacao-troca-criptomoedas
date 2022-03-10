import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, IconButton, List, Title, Headline } from 'react-native-paper';
import InstrumentImage from './InstrumentImage';

export default function ItemPortfolio({ coin }: any) {

  const instImg = () => <InstrumentImage imagePath={coin.thumb} />
  const instData = ({props}:any) => { 
    return (
      <View style={styles.view}>
        <Text style={styles.rel}>BTC:
          <Title style={styles.relTitle}>{coin.relPercBTC}</Title>
        </Text>
        <Text style={styles.rel}>ETH:
          <Title style={styles.relTitle}>{coin.relPercETH}</Title>
        </Text>
        <IconButton icon="chart-line-variant" onPress={() => {}} />
      </View>
    )}

  return (
    <Card style={styles.card} mode='elevated' elevation={2}>
      <Card.Title
        title={coin.symbol}
        subtitle={coin.name}
        left={instImg}
        right={instData}
      />
    </Card>    
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  rel: {
    margin: 6,
    marginRight: 40,
    justifyContent: 'center',
    aligItems: 'center',  
    height: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
  },
  relTitle: {
    marginLeft: 10,
  },    
  view: {
    flexDirection: "row",
  },  
});

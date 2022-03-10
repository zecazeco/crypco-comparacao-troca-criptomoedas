import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, IconButton, List, Title, Headline } from 'react-native-paper';
import InstrumentImage from './InstrumentImage';

export default function ItemPortfolio({ coin }: any) {

  const instImg = () => <InstrumentImage imagePath={coin.thumb} />
  const instData = ({props}:any) => { 
    return (
      <View style={styles.view}>
        <Text style={styles.rel}>price:
          <Title style={styles.relTitle}>R${(coin.actualPrice).toFixed(2)}</Title>
        </Text>        
        <Text style={styles.rel}>BTC:
          <Title style={styles.relTitle}>{(coin.actualBTC.relPerc)}</Title>
        </Text>
        <Text style={styles.rel}>ETH:
          <Title style={styles.relTitle}>{(coin.actualETH.relPerc)}</Title>
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
    marginRight: 20,
    justifyContent: 'center',
    aligItems: 'center',  
    height: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 10,
  },
  relTitle: {
    marginLeft: 5,
  },    
  view: {
    flexDirection: "row",
  },  
});

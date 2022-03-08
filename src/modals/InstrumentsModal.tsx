import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { Modal, Portal, TextInput, IconButton } from 'react-native-paper';
import AddFab from '../components/AddFab';
import Instrument from '../components/Instrument';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type Item = {
  id: string;
  name: string;
  symbol: string;
  thumb: String;
};

/* const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed123ad53abb28ba',
    name: 'First Item',
    symbol: 'ABC',
    image: 'rrrrr',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    symbol: 'ABC',
    image: 'rrrrr',
  },  
  {
    id: '58694a0f-3da1-471f-bd96-145571e1272',
    name: 'ultimoooem',
    symbol: 'ABC',
    image: 'rrrrr',
  },  
]; */

export default function InstrumenListModal() {
  const [dimensions, setDimensions] = useState({ window, screen });
  const [visible, setVisible] = useState(false);
  const [coins, setCoins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("BTC");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleAddInstrument = (item: Item) => {
    console.log(item);
  };

  const handleSearchInstrument = () => {
    loadData();
  };

  const renderItem = ({ item }: { item: Item }) => (
    <Instrument key={item.id} coin={item} onPress={() => handleAddInstrument(item)}/>
  );
  const renderEmptyItem = ({ item }: { item: Item }) => (
    <Instrument key='empty' coin='empty' />
  );

  const keyExtractor = (item: { id: string }) => item.id;

  const loadData = async () => {
    //const res = await fetch( "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=9&page=1&sparkline=false" );
    //const res = await fetch( "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Coxbitcoin&vs_currencies=brl" );
    const res = await fetch( `https://api.coingecko.com/api/v3/search?query=${search}` );  
    const data = await res.json();
    setCoins(data.coins);
  };

  useEffect(() => {
    //loadData();
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return subscription; 
  }, []);
  
  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <View style={styles.viewOut}>
            <View>
              <TextInput
                autoComplete='off'
                label='Buscar uma moeda'
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <IconButton icon="plus" onPress={handleSearchInstrument} />
            </View>
            <View style={{
              width: '100%',
              height: dimensions.window.height - 160}}>
              <FlatList
                data={coins}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshing={refreshing}
                //ListEmptyComponent={renderEmptyItem}
                onRefresh={async () => {
                  setRefreshing(true);
                  await loadData();
                  setRefreshing(false);
                }}
              />
            </View>
          </View>
        </Modal>
      </Portal>
      <AddFab onPress={showModal}/>   
    </>
 
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white', 
    margin:20, 
    padding: 20
  },
  viewOut: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
});
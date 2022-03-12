import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { Modal, Portal, Searchbar, Card, Title, Snackbar } from 'react-native-paper';
import { doc, setDoc } from 'firebase/firestore';
import AddFab from '../components/AddFab';
import Instrument from '../components/Instrument';
import db from '../config/firebase';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type Item = {
  id: string;
  name: string;
  symbol: string;
  thumb: String;
  price: String;
};

export default function InstrumenListModal() {
  const [dimensions, setDimensions] = useState({ window, screen });
  const [visible, setVisible] = useState(false);
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [coins, setCoins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string>();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showSnack = () => setVisibleSnack(true);
  const hideSnack = () => setVisibleSnack(false);

  const handleAddInstrument = (item: Item) => {
    handleSubmit(item);
  };

  const handleSearchInstrument = () => {
    loadData();
  };

  const handleSubmit = async (item: Item) => {
    try {
      let id = item.id;
      await setDoc(doc(db, 'portfolio', id), {
        id: id,
        symbol: item.symbol,
        name: item.name,
        thumb: item.thumb,
        actualPrice: 0,
        actualBTC: {
          price: 0,
          rel: 0,
          relMin: 0,
          relMax: 0,
          relPerc: 0,
        },
        actualETH: {
          price: 0,
          rel: 0,
          relMin: 0,
          relMax: 0,
          relPerc: 0,
        }                          
      })
      showSnack();
    } catch (err) {
      setError('erro');
    }
  }
  
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
              <Searchbar
                autoComplete='off'
                placeholder="Buscar uma moeda"
                onChangeText={(text) => setSearch(text)}
                value={search}
                onIconPress={handleSearchInstrument}
              />
            </View>
            <View style={{
              width: '100%',
              height: dimensions.window.height - 200}}>
                {
                  coins.length > 0 ?
                  <FlatList
                    data={coins}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    refreshing={refreshing}
                    ListEmptyComponent={renderEmptyItem}
                    onRefresh={async () => {
                      setRefreshing(true);
                      await loadData();
                      setRefreshing(false);
                    }}
                  />
                  : 
                  <Card style={styles.card} mode='elevated' elevation={2}>
                    <Card.Content>
                      <Title>Nenhum item encontrado</Title>
                    </Card.Content>
                  </Card> 
                }
            </View>
            <Snackbar visible={visibleSnack} onDismiss={hideSnack} duration={1800}>
              Moeda adicionada com sucesso!
            </Snackbar>            
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
  card: {
    margin: 10,
  },    
});
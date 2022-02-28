import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import AddFab from '../components/AddFab';
import Instrument from '../components/Instrument';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type Item = {
  id: string;
  name: string;
  code: string;
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
    code: 'ABC',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },                                
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },    
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    code: 'ABC',
  },  
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'ultimoooem',
    code: 'ABC',
  },  
];

/* const data = Object.keys(examples).map(
  (id): Item => ({ id, data: examples[id] })
); */

export default function InstrumenListModal() {
  const [dimensions, setDimensions] = useState({ window, screen });
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const renderItem = ({ item }: { item: Item }) => (
    <Instrument key='{item.id}' code='codigo' name={item.name} />
  );

  const keyExtractor = (item: { id: string }) => item.id;

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return subscription;
  });

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <View style={styles.viewOut}>
            <View style={{
              width: '100%',
              height: dimensions.window.height - 160}}>
              <FlatList
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                data={DATA}
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
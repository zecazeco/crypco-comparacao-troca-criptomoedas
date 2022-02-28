import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Header from '../components/Header';
import Instrument from '../components/Instrument';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import db from '../config/firebase';

export default function App() {
  //const [instrument, setInstrument] = useState([])

/*   useEffect(() => {  
    const q = query(collection(db, 'portfolio'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
     console.log(querySnapshot.docs);
    }) 
  },[]) */
    
  return (
    <>
      <Header />
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        overScrollMode='never'
      >
        <Instrument code='BTC' name='Bitcoin23456' />
        <Instrument code='ETH' name='Ethereum' />                   
      </ScrollView>
    </>
  );
}
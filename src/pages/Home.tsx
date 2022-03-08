import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import Item from '../components/Item';
import InstrumenListModal from '../modals/InstrumentsModal';

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import db from '../config/firebase';

import * as FirestoreService from '../services/firebase';

/* interface IInstrument {
  code: string;
  name: string;
} */

export default function App() {
  const [portfolioItems, setPortfolioItems] = useState<any>([]);
  //const [error, setError] = useState();


  useEffect(() => {  
    async function getPortfolio() {
      const portfolioSnapshot = query(collection(db, 'portfolio'));
      onSnapshot(portfolioSnapshot, (querySnapshot) => {
        const portfolioItems = querySnapshot.docs.map(doc => doc.data());
        setPortfolioItems(portfolioItems);
      });
    }
    getPortfolio();
  },[]) 

  return (
    <>
      <Header />
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        overScrollMode='never'
      >
        {
          portfolioItems.length > 0 && portfolioItems.map((item: any) => (
            <Item key={item.code} code={item.code} name={item.name} />
          ))
        }                       
      </ScrollView>
      <InstrumenListModal />
    </>
  );
}
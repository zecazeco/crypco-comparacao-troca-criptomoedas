import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import ItemPortfolio from '../components/ItemPortfolio';
import InstrumenListModal from '../modals/InstrumentsModal';

import { collection, query, orderBy, onSnapshot, addDoc, setDoc, doc } from "firebase/firestore";
import db from '../config/firebase';

import * as FirestoreService from '../services/firebase';

/* interface IInstrument {
  code: string;
  name: string;
} */

export default function App() {
  const [portfolioItems, setPortfolioItems] = useState<any>([]);
  const [error, setError] = useState<string>();
  const [stringIds, setStringIds] = useState<string>();
  const [prices, setPrices] = useState<any>([]);

  const loadPrices = async () => {
    const res = await fetch( `https://api.coingecko.com/api/v3/simple/price?ids=${stringIds}&vs_currencies=brl` );
    const data = await res.json();
    setPrices(data);
  };

  const savePrices = async () => {
    Object.keys(prices).forEach( async (key) => {
      try {
        let id = key;
        let date = new Date();
        await setDoc(doc(db, 'portfolio', id, 'prices', date.toISOString()), {
          data: date.toLocaleDateString("pt-BR"),
          valor: prices[key].brl,
        })
      } catch (err) {
        setError('erro');
      }    
    });
  }

  useEffect(() => {  
    savePrices();
  },[prices]) 


  useEffect(() => {  
    async function getPortfolio() {
      const portfolioSnapshot = query(collection(db, 'portfolio'));
      let strIds = '';
      onSnapshot(portfolioSnapshot, (querySnapshot) => {
        const portfolioItems = querySnapshot.docs.map(doc => {
          strIds += `${doc.data().id},`;
          return doc.data();
        });
        setStringIds(strIds);
        setPortfolioItems(portfolioItems);
      });
    }
    getPortfolio();
  },[]) 

  return (
    <>
      <Header onPress={loadPrices} />
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        overScrollMode='never'
      >
        {
          portfolioItems.length > 0 && portfolioItems.map((item: any) => (
            <ItemPortfolio key={item.id} coin={item} />
          ))
        }                       
      </ScrollView>
      <InstrumenListModal />
    </>
  );
}
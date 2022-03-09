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
  const [priceBTC, setPriceBTC] = useState<string>('0');
  const [priceETH, setPriceETH] = useState<string>('0');

  const loadPrices = async () => {
    const pricesBase = await fetch( `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl` );
    const dataBase = await pricesBase.json();
    setPriceBTC(dataBase.bitcoin.brl);
    setPriceETH(dataBase.ethereum.brl);

    const res = await fetch( `https://api.coingecko.com/api/v3/simple/price?ids=${stringIds}&vs_currencies=brl` );
    const data = await res.json();
    setPrices(data);
  };

  const savePrices = async () => {
    Object.keys(prices).forEach( async (key) => {
      let id = key;
      let val = prices[id].brl;
      let date = new Date();      
      let relBTC = parseFloat(priceBTC) / parseFloat(val);
      let relETH = parseFloat(priceETH) / parseFloat(val);

      try {
        await setDoc(doc(db, 'portfolio', id, 'prices', date.toISOString()), {
          date: date.toLocaleDateString("pt-BR"),
          price: val,
          priceBTC: priceBTC,
          priceETH: priceETH,
          relBTC: relBTC,
          relETH: relETH,
        })
      } catch (err) {
        setError('erro');
      }    
    });
  }

  const calcEverything = async () => {
    portfolioItems.map((item: any) => {
      const pricesSnapshot = query(collection(db, 'portfolio', item.id, 'prices'));
      onSnapshot(pricesSnapshot, (querySnapshot) => {
        const priceItems = querySnapshot.docs.map(doc => {
          //console.log(item.id);
          //console.log(doc.data());
        });
      });      
      
    });
/*     const portfolioSnapshot = query(collection(db, 'portfolio'));
    let strIds = '';
    onSnapshot(portfolioSnapshot, (querySnapshot) => {
      const portfolioItems = querySnapshot.docs.map(doc => {
        strIds += `${doc.data().id},`;
        return doc.data();
      });
      setStringIds(strIds);
      setPortfolioItems(portfolioItems);
    }); */
  }

  useEffect(() => {  
    savePrices();
    calcEverything();
  },[prices]) 


  useEffect(() => {  
    async function getPortfolio() {
      const portfolioSnapshot = query(collection(db, 'portfolio'));
      let strIds = '';
      onSnapshot(portfolioSnapshot, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => {
          strIds += `${doc.data().id},`;
          return doc.data();
        });
        setStringIds(strIds);
        setPortfolioItems(items);
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
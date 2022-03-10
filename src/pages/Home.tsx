import React, { useEffect, useRef, useState } from 'react';
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

  const isInitialMount = useRef(true);
  
  const loadPrices = async () => {
    const pricesBase = await fetch( `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl` );
    const dataBase = await pricesBase.json();
    setPriceBTC(dataBase.bitcoin.brl);
    setPriceETH(dataBase.ethereum.brl);

    const res = await fetch( `https://api.coingecko.com/api/v3/simple/price?ids=${stringIds}&vs_currencies=brl` );
    const data = await res.json();
    setPrices(data);
  };



 /* const calcResume = async () => {
    portfolioItems.map((item: any) => {
      const pricesSnapshot = query(collection(db, 'portfolio', item.id, 'resume'));
      onSnapshot(pricesSnapshot, (querySnapshot) => {
        const priceItems = querySnapshot.docs.map(doc => {
          //console.log(item.id);
          //console.log(doc.data());
        });
      });      
      
    });
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
  }*/

  useEffect(() => {  
    const calcData = async () => {
      console.log('ini refresh');
      Object.keys(prices).forEach((key) => {
        let id = key;
        let val = prices[id].brl;
        let date = new Date();      
        let relBTC = parseFloat(priceBTC) / parseFloat(val);
        let relETH = parseFloat(priceETH) / parseFloat(val);

        //save prices on a collection
        try {
          setDoc(doc(db, 'portfolio', id, 'history', date.toISOString()), {
            date: date.toLocaleDateString("pt-BR"),
            price: val,
            priceBTC: priceBTC,
            priceETH: priceETH,
            relBTC: relBTC,
            relETH: relETH,
          })
        } catch (err) {
          setError('erro1');
        } 

        //check if is min or max
        let obj = portfolioItems.find((obj: any) => obj.id == id);

        if (relBTC > parseFloat(obj.relMaxBTC) || parseFloat(obj.relMaxBTC) == 0) {
          //console.log('é a maior BTC');
          try {
            setDoc(doc(db, 'portfolio', obj.id), {
              relMaxBTC: relBTC,       
            },{merge: true});
            console.log('1');
          } catch (err) {
            setError('erro2');
          }          
        } 
        if (relBTC < parseFloat(obj.relMinBTC) || parseFloat(obj.relMinBTC) == 0) {
          //console.log('é a menor BTC');
          try {
            setDoc(doc(db, 'portfolio', obj.id), {
              relMinBTC: relBTC,       
            },{merge: true});
            console.log('2');
          } catch (err) {
            setError('erro3');
          }            
        }
        if (relETH > parseFloat(obj.relMaxETH) || parseFloat(obj.relMaxETH) == 0) {
          //console.log('é a maior ETH');
          try {
            setDoc(doc(db, 'portfolio', obj.id), {
              relMaxETH: relETH,       
            },{merge: true});
            console.log('3');
          } catch (err) {
            setError('erro4');
          } 
        } 
        if (relETH < parseFloat(obj.relMinETH) || parseFloat(obj.relMinETH) == 0) {
          //console.log('é a menor ETH');
          try {
            setDoc(doc(db, 'portfolio', obj.id), {
              relMinETH: relETH,       
            },{merge: true});
            console.log('4');
          } catch (err) {
            setError('erro5');
          }           
        }       

        //salva porcentagem da relaçao atual no portfolio
        let maxMinBTC = (parseFloat(obj.relMaxBTC) - parseFloat(obj.relMinBTC));
        let percBTC = maxMinBTC != 0 ? 100 - (((relBTC - parseFloat(obj.relMinBTC)) * 100) / maxMinBTC) : 100;
        let maxMinETH = (parseFloat(obj.relMaxETH) - parseFloat(obj.relMinETH));
        let percETH = maxMinETH != 0 ? 100 - (((relETH - parseFloat(obj.relMinETH)) * 100) / maxMinETH) : 100;        

        try {
          setDoc(doc(db, 'portfolio', obj.id), {
            relPercBTC: percBTC.toFixed(1),
            relPercETH: percETH.toFixed(1),     
          },{merge: true});
          console.log('5');
        } catch (err) {
          setError('erro6');
        }   
      });
      console.log('end refresh');
    }    

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      calcData();
    }
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

/*   useEffect(() => {  
    function displayTime() {
      console.log(portfolioItems);
     }
    const createClock = setInterval(displayTime, 5000);    
  },[portfolioItems])   */

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
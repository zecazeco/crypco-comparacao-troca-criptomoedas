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
  const [priceBTC, setPriceBTC] = useState<number>(0);
  const [priceETH, setPriceETH] = useState<number>(0);

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
        let relBTC = priceBTC / parseFloat(val);
        let relETH = priceETH / parseFloat(val);

        //save prices on history collection
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

        //save actual data
        //check if is min or max
        let obj = portfolioItems.find((obj: any) => obj.id == id);

        if (relBTC > (obj.actualBTC.relMax) || (obj.actualBTC.relMax) == 0) {
          //console.log('é a maior BTC');
          try {
            setDoc(doc(db, 'portfolio', obj.id), {
              actualBTC: {
                relMax: relBTC,
              },      
            },{merge: true});            
          } catch (err) {
            setError('erro2');
          }          
        } 
        if (relBTC < (obj.actualBTC.relMin) || (obj.actualBTC.relMin) == 0) {
          //console.log('é a menor BTC');
          try {
            setDoc(doc(db, 'portfolio', obj.id), {
              actualBTC: {
                relMin: relBTC,
              },      
            },{merge: true});              
          } catch (err) {
            setError('erro3');
          }            
        }
        if (relETH > (obj.actualETH.relMax) || (obj.actualETH.relMax) == 0) {
          //console.log('é a maior ETH');
          try {
            setDoc(doc(db, 'portfolio', obj.id), {
              actualETH: {
                relMax: relETH,
              },      
            },{merge: true});              
          } catch (err) {
            setError('erro4');
          } 
        } 
        if (relETH < (obj.actualETH.relMin) || (obj.actualETH.relMin) == 0) {
          //console.log('é a menor ETH');
          try {
            setDoc(doc(db, 'portfolio', obj.id), {
              actualETH: {
                relMin: relETH,
              },      
            },{merge: true});               
          } catch (err) {
            setError('erro5');
          }           
        }       

        //salva porcentagem da relaçao atual no portfolio
        let maxMinBTC = ((obj.actualBTC.relMax) - (obj.actualBTC.relMin));
        let percBTC = maxMinBTC != 0 ? 100 - (((relBTC - (obj.actualBTC.relMin)) * 100) / maxMinBTC) : 100;
        let maxMinETH = ((obj.actualETH.relMax) - (obj.actualETH.relMin));
        let percETH = maxMinETH != 0 ? 100 - (((relETH - (obj.actualETH.relMin)) * 100) / maxMinETH) : 100;        
        console.log('obj.relMaxBTC ' + obj.relMaxBTC);
        console.log('obj.relMinBTC ' + obj.relMinBTC);
        console.log('maxMinBTC ' + maxMinBTC);
        console.log('relBTC ' + relBTC);
        try {
          setDoc(doc(db, 'portfolio', obj.id), {
            actualBTC: {
              price: priceBTC,
              rel: relBTC,
              relPerc: parseFloat(percBTC.toFixed(1)),
            },             
            actualETH: {
              price: priceETH,
              rel: relETH,
              relPerc: parseFloat(percETH.toFixed(1)),
            }, 
            actualPrice: val,                
          },{merge: true});            
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
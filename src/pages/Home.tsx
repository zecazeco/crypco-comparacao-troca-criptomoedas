import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import ItemPortfolio from '../components/ItemPortfolio';
import InstrumenListModal from '../modals/InstrumentsModal';

import { collection, query, orderBy, onSnapshot, addDoc, setDoc, doc } from "firebase/firestore";
import db from '../config/firebase';

import * as FirestoreService from '../services/firebase';

export default function App() {
  const [portfolioItems, setPortfolioItems] = useState<any>([]);
  const [error, setError] = useState<string>();
  const [stringIds, setStringIds] = useState<string>();
  
  const refreshValues = async () => {
    const pricesBase = await fetch( `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl` );
    const dataBTCETH = await pricesBase.json();
    let priceBTC = dataBTCETH.bitcoin.brl;
    let priceETH = dataBTCETH.ethereum.brl;

    const res = await fetch( `https://api.coingecko.com/api/v3/simple/price?ids=${stringIds}&vs_currencies=brl` );
    const data = await res.json();

    Object.entries(data).map( async (item: any) => {
      let id = item[0];
      let val = item[1].brl;
      let date = new Date();      
      let relBTC = priceBTC / parseFloat(val);
      let relETH = priceETH / parseFloat(val);   

      try {
        //save prices on history collection
        await setDoc(doc(db, 'portfolio', id, 'history', date.toISOString()), {
          date: date.toLocaleDateString("pt-BR"),
          price: val,
          priceBTC: priceBTC,
          priceETH: priceETH,
          relBTC: relBTC,
          relETH: relETH,
        })
        //sava actual data
        await setDoc(doc(db, 'portfolio', id), {
          actualBTC: {
            price: priceBTC,
            rel: relBTC,
          },             
          actualETH: {
            price: priceETH,
            rel: relETH,
          }, 
          actualPrice: val,                
        },{merge: true});         
      } catch (err) {
        setError('erro1');
      } 

      //check if is min or max
      let obj = portfolioItems.find((obj: any) => obj.id == id);

      let maxBTC = obj.actualBTC.relMax;
      let minBTC = obj.actualBTC.relMin;
      let maxETH = obj.actualETH.relMax;
      let minETH = obj.actualETH.relMin;

      if (relBTC > (obj.actualBTC.relMax) || (obj.actualBTC.relMax) == 0) {
        //console.log('é a maior BTC');
        maxBTC = relBTC;
        try {
          await setDoc(doc(db, 'portfolio', obj.id), {
            actualBTC: {
              relMax: maxBTC,
            },      
          },{merge: true});           
        } catch (err) {
          setError('erro2');
        }          
      } 
      if (relBTC < (obj.actualBTC.relMin) || (obj.actualBTC.relMin) == 0) {
        //console.log('é a menor BTC');
        minBTC = relBTC; 
        try {
          await setDoc(doc(db, 'portfolio', obj.id), {
            actualBTC: {
              relMin: minBTC,
            },      
          },{merge: true});              
        } catch (err) {
          setError('erro3');
        }            
      }
      if (relETH > (obj.actualETH.relMax) || (obj.actualETH.relMax) == 0) {
        //console.log('é a maior ETH');
        maxETH = relETH; 
        try {
          await setDoc(doc(db, 'portfolio', obj.id), {
            actualETH: {
              relMax: maxETH,
            },      
          },{merge: true});            
        } catch (err) {
          setError('erro4');
        }
      } 
      if (relETH < (obj.actualETH.relMin) || (obj.actualETH.relMin) == 0) {
        //console.log('é a menor ETH');
        minETH = relETH; 
        try {
          await setDoc(doc(db, 'portfolio', obj.id), {
            actualETH: {
              relMin: minETH,
            },      
          },{merge: true});             
        } catch (err) {
          setError('erro5');
        }           
      } 

      //salva porcentagem da relaçao atual no portfolio
      let maxMinBTC = maxBTC - minBTC;
      let percBTC = maxMinBTC != 0 ? 100 - (((relBTC - minBTC) * 100) / maxMinBTC) : 100;
      let maxMinETH = maxETH - minETH;
      let percETH = maxMinETH != 0 ? 100 - (((relETH - (minETH)) * 100) / maxMinETH) : 100;        

      try {
        await setDoc(doc(db, 'portfolio', obj.id), {
          actualBTC: {
            relPerc: parseFloat(percBTC.toFixed(1)),
          },             
          actualETH: {
            relPerc: parseFloat(percETH.toFixed(1)),
          },                 
        },{merge: true});            
      } catch (err) {
        setError('erro6');
      } 

    }) 
  };

  useEffect(() => {  
    async function getPortfolio() {
      const portfolioSnapshot = query(collection(db, 'portfolio'));
      onSnapshot(portfolioSnapshot, (querySnapshot) => {
        let strIds = '';
        const items = querySnapshot.docs.map(document => {
          strIds += `${document.data().id},`;
          return document.data();
        });
        setStringIds(strIds);
        setPortfolioItems(items);
      });
    }
    getPortfolio();

  },[]) 

  useEffect(() => {  
    console.log('update teste');
  }) 

  return (
    <>
      <Header onPress={refreshValues} />
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
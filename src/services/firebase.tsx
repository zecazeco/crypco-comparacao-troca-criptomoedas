import { collection, getDocs, orderBy, onSnapshot, query } from "firebase/firestore";
import db from '../config/firebase';

export const getPortfolioInstruments = () => {
  const itemsColRef = collection(db, 'portfolio');
  return getDocs(itemsColRef);
}

export const streamPortfolioInstruments = (snapshot: any, error: any) => {
  const itemsColRef = collection(db, 'portfolio')
  const itemsQuery = query(itemsColRef, orderBy('created'))
  return onSnapshot(itemsQuery, snapshot, error);
};

export const testeInst = () => {
  let portfolioItems: any = [];
  const portfolioSnapshot = query(collection(db, 'portfolio'));
  console.log('3');
  onSnapshot(portfolioSnapshot, (querySnapshot) => {
    console.log('4');
    portfolioItems = querySnapshot.docs.map(doc => doc.data());
  });
  console.log('5');
  return portfolioItems;
}
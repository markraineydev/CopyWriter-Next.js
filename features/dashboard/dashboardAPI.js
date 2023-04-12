import { collection, doc, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { readDashboardCardData } from './dashboardSlice';

export async function dashboardCardDataAPI({ uid, dispatch }) {
  try {
    const q = collection(db, 'user-template-data', uid, 'outputs');
    const sort = query(q, orderBy('time', 'desc'), limit(5));
    onSnapshot(sort, (querySnapshot) => {
      const outputsData = [];
      querySnapshot.forEach((doc) => {
        outputsData.push({ ...doc.data() });
      });
      dispatch(readDashboardCardData({ outputsData }));
    });
  } catch (error) {
    console.log(error);
  }
}

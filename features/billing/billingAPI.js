import { addDoc, collection, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { cloudFunctions, db } from '../../firebase';
import { httpsCallable } from 'firebase/functions';
import { productsData, subscriptionData, userPlanDetailData } from './billingSlice';

export async function billingAPI({ dispatch }) {
  try {
    const q = query(collection(db, 'products'));
    const docData = query(q, where('active', '==', true));
    const productsPlan = [];
    onSnapshot(docData, (querySnapshot) => {
      querySnapshot.forEach(async function (doc) {
        // console.log(doc.id, ' => ', doc.data());
        const subColRef = collection(db, 'products', doc.id, 'prices');
        const priceSnap = await getDocs(subColRef);
        priceSnap.docs.forEach((doc) => {
          //   console.log(doc.id, ' => 2 ', doc.data());
          productsPlan.push({ priceId: doc.id, ...doc.data() });
        });

        dispatch(productsData(productsPlan));
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function subscriptionTrialsAPI({ uid, priceId }) {
  try {
    const docRef = await addDoc(collection(db, 'users', uid, 'checkout_sessions'), {
      price: priceId,
      trial_from_plan: true,
      success_url: `${window.location.origin}/billing`,
      cancel_url: `${window.location.origin}/billing`,
    });

    onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function subscriptionPlanAPI({ uid, dispatch }) {
  try {
    const q = query(collection(db, 'users', uid, 'subscriptions'));
    const docData = query(q, where('status', 'in', ['active']));
    const subscriptionPlan = [];
    onSnapshot(docData, async (snapshot) => {
      // In this implementation we only expect one active or trialing subscription to exist.
      snapshot.forEach((doc) => {
        const {
          status,
          product,
          price,
          items,
          current_period_start,
          current_period_end,
          canceled_at,
          cancel_at_period_end,
          cancel_at,
        } = doc.data();
        subscriptionPlan.push({ subscriptionId: doc.id, ...doc.data() });
        dispatch(
          userPlanDetailData({
            status,
            product,
            price,
            item: items[0],
            current_period_start,
            current_period_end,
            canceled_at,
            cancel_at_period_end,
            cancel_at,
          }),
        );
      });

      dispatch(subscriptionData(subscriptionPlan));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function viewBillingHistoryPlanAPI() {
  try {
    const functionRef = httpsCallable(cloudFunctions, 'ext-firestore-stripe-payments-createPortalLink');
    const { data } = await functionRef({ returnUrl: `${window.location.origin}/billing` });
    console.log('data', data);
    window.location.assign(data.url);
  } catch (error) {
    console.log(error);
  }
}

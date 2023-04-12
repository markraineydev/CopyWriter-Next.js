import { notification } from 'antd';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { SOME_THING_WENT_WRONG } from '../../utils/constants';
import { ADMIN_CHANGE_PLAN_DETAILS } from '../../utils/content';
import { fetchPlans, fetchsubCollectionData, fetchUidData, fetchUserDataSuccess } from './usersManagementSlice';

export async function updateUserDetails({ uid, displayName, status, authority, companyName, websiteDomain }) {
  console.log('uid', uid, status);
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        displayName,
        status,
        authority,
        companyName,
        websiteDomain,
      },
      { merge: true },
    ).then(() => {
      console.log('Update UserInfo Successfully');
      notification.success({
        message: 'Update',
        description: 'User Info Update successfully.', //todo
      });
    });
  } catch (error) {
    console.log(error.message);
    notification.error({
      message: SOME_THING_WENT_WRONG,
      description: error.code,
    });
  }
}
export async function updatePlanDetails({ name, words, team, projects, yearlyWords }) {
  console.log('name,word in API', name, words, team, projects);
  try {
    await setDoc(
      doc(db, 'plan-details', name),
      {
        name,
        words,
        team,
        projects,
        yearlyWords,
      },
      { merge: true },
    ).then(() => {
      console.log('PlanDetails update Successfully');
      notification.success({
        description: ADMIN_CHANGE_PLAN_DETAILS,
      });
    });
  } catch (error) {
    console.log(error.message);
    notification.error({
      message: SOME_THING_WENT_WRONG,
      description: error.code,
    });
  }
}

export async function fetchPlanDetails({ dispatch }) {
  try {
    onSnapshot(collection(db, 'plan-details'), (querySnapshot) => {
      const plans = [];
      querySnapshot.forEach((doc) => {
        plans.push({ id: doc.id, ...doc.data() });
      });
      dispatch(fetchPlans(plans));
    });
  } catch (error) {
    console.log(error);
  }
}
export async function fetchOutputs({ uid, dispatch }) {
  try {
    const q = query(collection(db, 'user-template-data', uid, 'outputs'));
    const docData = query(q, where('uid', '==', uid));
    onSnapshot(docData, (querySnapshot) => {
      const outputUserData = [];
      querySnapshot.forEach((doc) => {
        outputUserData.push({ ...doc.data() });
      });

      dispatch(fetchsubCollectionData({ outputUserData }));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserData({ uid, dispatch }) {
  try {
    onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({ ...doc.data() });
      });
      dispatch(fetchUserDataSuccess({ userData }));
      // return doc.data();
    });
  } catch (error) {
    console.log(error);
  }
}
export async function fetchUserProfileData({ uid, dispatch }) {
  try {
    const q = query(collection(db, 'users'));
    const docData = query(q, where('uid', '==', uid));
    onSnapshot(docData, (querySnapshot) => {
      const userUIDData = [];
      querySnapshot.forEach((doc) => {
        userUIDData.push({ ...doc.data() });
      });
      dispatch(fetchUidData({ userUIDData }));
      // return doc.data();
    });
  } catch (error) {
    console.log(error);
  }
}

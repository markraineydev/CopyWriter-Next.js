import { async } from '@firebase/util';
import { notification } from 'antd';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteField,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, firestore } from '../../firebase';
import { FAVOURITE_TEXT, UN_FAVOURITE_TEXT, USER_OUTPUT_DELETE } from '../../utils/content';
import { ICON_ALERT_MESSAGE } from '../../utils/generateUtils';
import {
  readDeletedCollectionsData,
  readfavouriteData,
  readHistoryData,
  readOutputCollectionData,
  readSubCollectionsData,
} from './outputSlice';

export async function fetchOutputs({ uid, projectId, dispatch }) {
  try {
    const q = query(collection(db, 'user-template-data', uid, 'outputs'));
    const docData = query(q, where('projectId', '==', projectId));
    onSnapshot(docData, (querySnapshot) => {
      const outputsData = [];
      querySnapshot.forEach((doc) => {
        outputsData.push({ ...doc.data(), outputId: doc.id });
      });
      dispatch(readSubCollectionsData(outputsData));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllOutputs({ uid, dispatch }) {
  try {
    const q = collection(db, 'user-template-data', uid, 'outputs');
    onSnapshot(q, (querySnapshot) => {
      const outputsData = [];
      querySnapshot.forEach((doc) => {
        outputsData.push({ ...doc.data() });
      });
      console.log('outputsData.length', outputsData.length);
      dispatch(readOutputCollectionData(outputsData.length));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDeletedOutputs({ uid, projectId, dispatch }) {
  try {
    const q = query(collection(db, 'user-deleted-template-data', uid, 'outputs'));
    const docData = query(q, where('projectId', '==', projectId));
    onSnapshot(docData, (querySnapshot) => {
      const deletedOutput = [];
      querySnapshot.forEach((doc) => {
        deletedOutput.push({ ...doc.data() });
      });
      dispatch(readDeletedCollectionsData(deletedOutput));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function favouriteAPIData({ uid, contentId, outputId }) {
  try {
    await setDoc(
      doc(db, 'user-template-data', uid, 'outputs', outputId),
      {
        favourites: arrayUnion(contentId),
      },
      { merge: true },
    )
      .then(() => {
        console.log('Mark as a favourite ');
        ICON_ALERT_MESSAGE(FAVOURITE_TEXT);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function removefavouriteAPIData({ uid, contentId, outputId }) {
  try {
    await setDoc(
      doc(db, 'user-template-data', uid, 'outputs', outputId),
      {
        favourites: arrayRemove(contentId),
      },
      { merge: true },
    )
      .then(() => {
        console.log('remove from  favourite ');
        ICON_ALERT_MESSAGE(UN_FAVOURITE_TEXT);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function deletedDataAPI({ changeOutputInDatabase, saveDelete, uid, outputId }) {
  try {
    await setDoc(
      doc(db, 'user-deleted-template-data', uid, 'outputs', outputId),
      {
        ...saveDelete,
        outputDeleteTime: new Date(),
      },
      { merge: true },
    )
      .then(async () => {
        await setDoc(
          doc(db, 'user-template-data', uid, 'outputs', outputId),
          {
            ...changeOutputInDatabase,
          },
          { merge: true },
        )
          .then(() => {
            notification.success({
              message: USER_OUTPUT_DELETE,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTemplateOutputsAPI({ uid, templateId, projectId, dispatch }) {
  try {
    const q = query(collection(db, 'user-template-data', uid, 'outputs'));
    const docData = query(q, where('templateId', '==', templateId), where('projectId', '==', projectId));
    onSnapshot(docData, (querySnapshot) => {
      const outputsData = [];
      querySnapshot.forEach((doc) => {
        outputsData.push({ ...doc.data() });
      });
      dispatch(readHistoryData(outputsData));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTemplateHistory({ uid, templateId, projectId }) {
  try {
    console.log('fetchTemplateHistory uid, templateId, projectId,', uid, templateId, projectId);
    const q = query(collection(db, 'user-template-data', uid, 'outputs'));
    const docData = query(q, where('templateId', '==', templateId), where('projectId', '==', projectId));
    onSnapshot(docData, (querySnapshot) => {
      const outputsData = [];
      querySnapshot.forEach((doc) => {
        outputsData.push({ ...doc.data() });
      });
      console.log('outputsDataddddd', outputsData);
      return outputsData;
      // dispatch(readHistoryData(outputsData));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFavouriteOutputsAPI({ uid, projectId, dispatch }) {
  try {
    const q = query(collection(db, 'user-template-data', uid, 'outputs'));
    const docData = query(q, where('projectId', '==', projectId), orderBy('favourites'));
    onSnapshot(docData, (querySnapshot) => {
      const favouriteOutputs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.favourites && data.favourites.length > 0 && favouriteOutputs.push({ ...data });
      });
      dispatch(readfavouriteData(favouriteOutputs));
    });
  } catch (error) {
    console.log(error);
  }
}

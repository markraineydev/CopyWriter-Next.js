import { getAuth } from '@firebase/auth';
import { notification } from 'antd';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { NEW_TEMPLATE_ADDED, TEMPLATE_DELETE_CONFIRMATION } from '../../utils/content';
import { readTemplatesDataSuccess } from './newTemplatesSlice';

const auth = getAuth();

export async function addNewTemplateAPI({ toolFields, id }) {
  try {
    await setDoc(
      doc(db, 'templates-list', id),
      {
        ...toolFields,
      },
      { merge: true },
    ).then(() => {
      notification.success({
        message: NEW_TEMPLATE_ADDED,
      });
    });
  } catch (err) {
    console.log(`err`, err);
  }
}

export async function fetchTemplateList({ dispatch }) {
  try {
    onSnapshot(collection(db, 'templates-list'), (querySnapshot) => {
      const templateList = [];
      querySnapshot.forEach((doc) => {
        templateList.push({ ...doc.data() });
      });
      dispatch(readTemplatesDataSuccess(templateList));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTemplateAPI({ id }) {
  try {
    await deleteDoc(doc(db, 'templates-list', id), { merge: true }).then(() => {
      notification.success({
        message: TEMPLATE_DELETE_CONFIRMATION,
      });
    });
  } catch (err) {
    console.log(`err`, err);
  }
}

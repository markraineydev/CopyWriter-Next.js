import { getAuth } from '@firebase/auth';
import { notification } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const auth = getAuth();

export async function updateCompanyData({ uid, websiteDomain, companyName }) {
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        uid,
        websiteDomain,
        companyName,
      },
      { merge: true },
    )
      .then(() => {
        console.log('Save the company Data');
        notification.success({
          message: 'Update',
          description: `your Comapny data update successFully`, //todo
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
  //   console.log('res', res);
}

import {
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  updateEmail,
  updatePassword,
  deleteUser,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from '@firebase/auth';
import { notification } from 'antd';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { DELETE, REAUTHENICATEFORPASSWORD, RESETEMAIL, RESETPASSWORD } from '../../utils/constants';
import { EMAIL_UPDATED, PASSWORD_UPDATED, USER_UPDATE_NAME, WRONG_PASSWORD } from '../../utils/content';
import { authenticateError, reauthicateError } from './settingSlice';

const auth = getAuth();

export async function updateUser({ uid, displayName, secondName }) {
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        uid,
        displayName,
        secondName,
      },
      { merge: true },
    )
      .then(() => {
        console.log('Save the user Data');
        updateProfile(auth.currentUser, displayName)
          .then(() => {
            // Profile updated!
            notification.success({
              description: USER_UPDATE_NAME,
            });
            // ...
          })
          .catch((error) => {
            // An error occurred
            console.log('error', error);
            // ...
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function updateEmailAPI({ uid, email, providerId, dispatch }) {
  try {
    updateEmail(auth.currentUser, email)
      .then(() => {
        // email updated!
        console.log('user Email update successfully');
        setDoc(
          doc(db, 'users', uid),
          {
            email,
          },
          { merge: true },
        )
          .then(() => {
            notification.success({
              description: EMAIL_UPDATED,
            });
          })
          .catch((error) => {
            console.log(error);
          });
        // ...
      })
      .catch((error) => {
        // An error occurred
        console.log('error', error);
        // Handle Errors here.
        const errorCode = error.code;
        const { code } = error;
        let errorMessage = code;
        console.log('error message', errorMessage);

        if (errorMessage === 'auth/requires-recent-login') {
          dispatch(authenticateError('authenticatePasswordForEmail'));
        }

        // ...
      });
  } catch (error) {
    console.log(error);
  }
}

export async function updatePasswordAPI({ password, dispatch }) {
  console.log('password', password);
  try {
    await updatePassword(auth.currentUser, password)
      .then(() => {
        // Update successful.
        notification.success({
          description: PASSWORD_UPDATED,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const { code } = error;
        let errorMessage = code;
        console.log('errorMessage', errorMessage);

        if (errorMessage === 'auth/requires-recent-login') {
          dispatch(authenticateError(REAUTHENICATEFORPASSWORD));
        }

        // ...
      });
  } catch (error) {
    console.log(error);
  }
}

export async function updatePasswordStatusAPI({ uid, setPassword, teamId }) {
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        setPassword,
        teamId,
      },
      { merge: true },
    )
      .then(() => {
        console.log('User Password Status Update Successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserAccountAPI({ providerId, dispatch }) {
  const user = auth.currentUser;
  try {
    deleteUser(user)
      .then(() => {
        // User deleted.
        console.log('userdata delete successfully');
      })
      .catch((error) => {
        // An error ocurred
        console.log('error', error.code);
        if (error.code === 'auth/requires-recent-login') {
          dispatch(authenticateError('authenticatePassword'));
        }

        // ...
      });
  } catch (error) {
    console.log('error', error);
  }
}

export async function userAuthenticateAPI({ uid, credential, dispatch }) {
  const { providerId } = credential;
  let authenticateWith = null;
  if (providerId === 'password' || providerId === 'firebase') {
    authenticateWith = userAuthenticateWithPasswordAPI({ credential, uid, dispatch });
  } else if (providerId === 'google.com') {
    authenticateWith = userAuthenticateWithGoogleAPI({ credential, uid, dispatch });
  }
  try {
    authenticateWith.then(() => {
      console.log('reauthentication complete');
    });
  } catch (error) {
    console.log('error', error);
  }
}

function userAction({ action, uid, updatedData, providerId }) {
  if (action === DELETE) {
    deleteUserAccountAPI(providerId);
  } else if (action === RESETEMAIL) {
    updateEmailAPI({ uid, email: updatedData, providerId });
  } else if (action === RESETPASSWORD) {
    updatePasswordAPI({ password: updatedData });
  }
}

function userAuthenticateWithPasswordAPI({ credential, uid, dispatch }) {
  const { email, loginUserPassword, action, updatedData, providerId } = credential;
  const user = auth.currentUser;
  const fbCredentials = EmailAuthProvider.credential(email, loginUserPassword);
  try {
    reauthenticateWithCredential(user, fbCredentials)
      .then(() => {
        console.log('reauthentication with password complete');
        userAction({ action, updatedData, uid, providerId });
      })
      .catch((error) => {
        console.log('error', error);
        if ((error.code = 'auth/wrong-password')) {
          notification.error({
            message: WRONG_PASSWORD,
          });
        }
      });
  } catch (error) {
    console.log('error', error);
  }
}

function userAuthenticateWithGoogleAPI({ credential, uid, dispatch }) {
  const { action, updatedData, providerId } = credential;
  const user = auth.currentUser;
  const googleProvider = new GoogleAuthProvider();
  try {
    reauthenticateWithPopup(user, googleProvider)
      .then(() => {
        console.log('reauthentication with google complete');
        userAction({ action, updatedData, uid, providerId });
      })
      .catch((error) => {
        console.log('error', error);
        if (error.code === 'auth/popup-closed-by-user') {
          dispatch(authenticateError(null));
        }
      });
  } catch (error) {
    console.log('error', error);
  }
}

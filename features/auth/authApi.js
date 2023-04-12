import { async } from '@firebase/util';
import { notification } from 'antd';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ST } from 'next/dist/shared/lib/utils';
import { db, firebaseAuth, googleAuthProvider } from '../../firebase';
import {
  CREATE_NEW_PROJECT,
  DEMO,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_SUCCESSFULLY,
  STARTER,
} from '../../utils/constants';
import {
  EMAIL_FOR_PASSWORD_RESET_DESCRIPTION,
  EMAIL_FOR_PASSWORD_RESET_TITLE,
  EMAIL_FOR_PASSWORD_WRONG_EMAIL,
  PASSWORD_RESET_CODE_EXPIRE,
  PASSWORD_RESET_TITLE,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from '../../utils/content';
import { projectIdByChar } from '../../utils/generateUtils';
import { projectActionCUD } from '../projects/projectsSlice';
import { addMember, addOwner } from '../team/teamSlice';
import { readteamId, readUserDataSuccess, resetPasswordMessage } from './authSlice';
const auth = getAuth();

export async function fbSignIn({ dispatch }) {
  const result = await signInWithPopup(firebaseAuth, googleAuthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const { isNewUser } = getAdditionalUserInfo(result);
      const { user, providerId } = result;
      const { displayName, uid, email, emailVerified } = user;
      isNewUser && addUserData({ uid, displayName, email, emailVerified, providerId, dispatch });
      return user;
    })
    .catch((error) => {
      console.log('error message', error.code);
      // Handle Errors here.
      const errorCode = error.code;
      const { code } = error;
      let errorMessage = code;

      if (errorMessage === 'auth/popup-closed-by-user') {
        errorMessage = 'User has cancelled the authentication request';
      }
      notification.warning({
        message: 'Error',
        description: errorMessage,
      });

      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  return result;
}

export async function createSignInWithEmail({ name, email, password, dispatch }) {
  try {
    // Firebase Query
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const { user } = result;
    const { uid, emailVerified } = user;
    const { providerId } = getAdditionalUserInfo(result);
    await addUserData({ uid, displayName: name, email, emailVerified, providerId, dispatch });
  } catch (error) {
    console.error(error);
    // alert(error.message);
    const { code } = error;
    let errorMessage = code;

    if (errorMessage === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters ';
    } else if (errorMessage === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use';
    }
    notification.warning({
      message: 'Error',
      description: errorMessage,
    });
  }
  return result;
}

export async function fetchUserData({ uid, dispatch }) {
  try {
    onSnapshot(doc(db, 'users', uid), (doc) => {
      dispatch(readUserDataSuccess({ userData: { ...doc.data() } }));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function signInusingEmailAndPassword({ email, password }) {
  const result = await signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      console.log('error message', error.code);
      // Handle Errors here.
      const errorCode = error.code;
      const { code } = error;
      let errorMessage = code;

      if (errorMessage === 'auth/user-not-found') {
        errorMessage = USER_NOT_FOUND;
      } else if (errorMessage === 'auth/wrong-password') {
        errorMessage = WRONG_PASSWORD;
      }
      notification.warning({
        message: 'Error',
        description: errorMessage,
      });
      // ..
    });
  return result;
}

export async function memberTeamId({ email, dispatch }) {
  try {
    const q = query(collection(db, 'invite-team'));
    const docData = query(q, where('email', '==', email));
    onSnapshot(docData, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        dispatch(readteamId({ teamId: data.teamId, docId: doc.id }));
      });
    });
  } catch (error) {
    console.log('error', error);
  }
}
export async function deleteInviteCollectionAPI({ email, docId, dispatch }) {
  console.log('docId', docId);
  try {
    await deleteDoc(doc(db, 'invite-team', docId))
      // const docData = query(q, where('email', '==', email));
      .then(() => {
        console.log('invite teamId delete successfully');
      });
  } catch (error) {
    console.error(error);
    // alert(error.message);
    const { code } = error;
    let errorMessage = code;
    console.log('code', error);
  }
}

export async function loginTeamUser({ providerId, email, uid, displayName, emailVerified, dispatch }) {
  console.log('uid in', uid);

  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        emailVerified,
        email,
        displayName,
        planStatus: 'active',
        providerId,
        status: 'active',
        date: new Date(),
        authority: 'user',
        plan: DEMO,
        uid,
        teamId: null,
        setPassword: false,
        teamMember: true,
      },
      { merge: true },
    ).then(() => {
      console.log('user data saved');
      const projectUniqueId = projectIdByChar(5);
      const updateProject = [
        { name: 'Personal', description: 'Personal Projects', projectId: projectUniqueId, order: 1 },
      ];
      const selectedProject = { name: 'Personal', description: 'Personal Projects', projectId: projectUniqueId };
      dispatch(projectActionCUD({ uid, updateProject, selectedProject, actionType: CREATE_NEW_PROJECT }));
    });
  } catch (error) {
    console.error(error);
    // alert(error.message);
    const { code } = error;
    let errorMessage = code;
  }
  return result;
}

const addUserData = async ({ uid, displayName, email, emailVerified, providerId = '', dispatch }) => {
  await setDoc(
    doc(db, 'users', uid),
    {
      displayName,
      emailVerified,
      email,
      planStatus: 'active',
      providerId,
      status: 'active',
      date: new Date(),
      authority: 'user',
      plan: DEMO,
      uid,
    },
    { merge: true },
  ).then(() => {
    console.log('user data saved');
    const projectUniqueId = projectIdByChar(5);
    const updateProject = [
      { name: 'Personal', description: 'Personal Projects', projectId: projectUniqueId, order: 1 },
    ];
    const selectedProject = { name: 'Personal', description: 'Personal Projects', projectId: projectUniqueId };
    dispatch(projectActionCUD({ uid, updateProject, selectedProject, actionType: CREATE_NEW_PROJECT }));
    const updateTeam = { email, name: displayName, joined: new Date(), role: 'owner', order: 1 };
    dispatch(addOwner({ uid, updateTeam, email, teamOwner: false }));
  });
};

export async function resetPasswordAPI({ email }) {
  try {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!');
        // Password reset email sent!
        notification.info({
          message: EMAIL_FOR_PASSWORD_RESET_TITLE,
          description: EMAIL_FOR_PASSWORD_RESET_DESCRIPTION,
        });
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        console.log('errorCode', errorCode);
        if (errorCode === 'auth/user-not-found') {
          errorMessage = EMAIL_FOR_PASSWORD_WRONG_EMAIL(email);
        }
        notification.warning({
          message: 'Error',
          description: errorMessage,
        });
        // ..
      });
  } catch (error) {
    console.log('error', error);
  }
}

export async function handleResetPasswordAPI({ password, actionCode, dispatch }) {
  try {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        const accountEmail = email;
        // the new password.
        const newPassword = password;

        // Save the new password.
        confirmPasswordReset(auth, actionCode, newPassword)
          .then((resp) => {
            console.log('your password reset Succesfully');
            notification.info({
              description: PASSWORD_RESET_TITLE,
            });
            dispatch(resetPasswordMessage(PASSWORD_RESET_SUCCESSFULLY));

            // Password reset has been confirmed and new password updated.
            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);
            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
          })
          .catch((error) => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
            console.log('error', error);
          });
      })
      .catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        console.log('error.code', error.code);
        const { code } = error;
        if (code == 'auth/invalid-action-code') {
          notification.warning({
            description: PASSWORD_RESET_CODE_EXPIRE,
          });
        }
        dispatch(resetPasswordMessage(PASSWORD_RESET_FAILED));
      });
  } catch (error) {
    console.log('error', error);
  }
}

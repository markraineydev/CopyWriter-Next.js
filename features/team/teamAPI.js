import { async } from '@firebase/util';
import { notification } from 'antd';
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '../../firebase';
import { TEAM_OWNER_USAGE_ASSIGN } from '../../utils/content';
import {
  addTeamMemeberAsOwner,
  deleteTeamId,
  fetchingTeamData,
  fetchPlanData,
  teamAlert,
  teamAlertMessage,
} from './teamSlice';

// const dispatch = useDispatch()
const auth = getAuth();

export async function updateTeamMembersAPI({ uid, updateTeam, email, dispatch }) {
  try {
    const q = query(collection(db, 'users'));
    const emailData = query(q, where('email', '==', email));
    console.log('emailData', emailData);
    // const emailExit = getDoc(emailData);
    // console.log('emailExit', (await emailExit).data());
    onSnapshot(emailData, (querySnapshot) => {
      const outputsData = [];
      querySnapshot.forEach((doc) => {
        const { email } = doc.data();
        outputsData.push(email);
      });
      if (outputsData.length === 0) {
        addTeamData({ uid, updateTeam, email, teamOwner: true });
        teamMembersInfoAPI({ email, uid });
      } else {
        dispatch(teamAlertMessage(outputsData));
      }
    });
  } catch (error) {
    console.log(error);
  }
  //   console.log('res', res);
}

export async function readTeamData({ uid, dispatch }) {
  try {
    onSnapshot(doc(db, 'team', uid), (doc) => {
      const { team, remainingWords, total, teamStatus, teamTotalWords } = doc.data() || {
        team: [],
        remainingWords: null,
        total: null,
        teamStatus: null,
        teamTotalWords: null,
      };
      const sortTeam = team && team.sort((a, b) => a.order - b.order);

      if (team && team.length === 0) {
        dispatch(deleteTeamId());
      } else {
        dispatch(fetchingTeamData({ sortTeam, remainingWords, total, teamStatus, teamTotalWords }));
      }
      // return doc.data();
    });
  } catch (error) {
    console.log(error);
  }
}
export async function fetchPlan({ name, dispatch }) {
  try {
    onSnapshot(doc(db, 'plan-details', name), (doc) => {
      dispatch(fetchPlanData({ id: doc.id, ...doc.data() }));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addTeamData({ uid, updateTeam, email, teamOwner }) {
  await setDoc(
    doc(db, 'team', uid),
    {
      team: arrayUnion(updateTeam),
      teamStatus: 'active',
    },
    { merge: true },
  )
    .then(() => {
      console.log('team successfully created');
      setDoc(
        doc(db, 'users', uid),
        {
          teamOwner,
        },
        { merge: true },
      )
        .then(() => {
          console.log('teamOwner set to be true');
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addOwnerAPI({ uid, updateTeam, email }) {
  await setDoc(doc(db, 'team', uid), {
    team: arrayUnion(updateTeam),
    teamStatus: 'active',
  })
    .then(() => {
      console.log('team Member add in you acount');
      // teamMembersSubmissionInfoAPI({ email });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function teamStatusAPI({ uid }) {
  await setDoc(
    doc(db, 'team', uid),
    {
      teamStatus: 'active',
    },
    { merge: true },
  )
    .then(() => {
      // console.log('team Status update Successfully');
      // teamMembersSubmissionInfoAPI({ email });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function holdTeamStatusAPI({ uid }) {
  await setDoc(
    doc(db, 'team', uid),
    {
      teamStatus: 'hold',
    },
    { merge: true },
  )
    .then(() => {
      // console.log('team Status update Successfully');
      // teamMembersSubmissionInfoAPI({ email });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteTeamIdAPI({ uid, email, displayName, dispatch }) {
  try {
    await updateDoc(doc(db, 'users', uid), {
      teamId: deleteField(),
    })
      .then(() => {
        console.log('uid Delete success fully');
        const updateTeam = { email, name: displayName, joined: new Date(), role: 'owner', order: 1 };
        dispatch(addTeamMemeberAsOwner({ uid, updateTeam, email }));
      })
      .catch((error) => {
        console.log('error', error);
      });
  } catch (error) {
    console.log('error', error);
  }
}

export async function sendEmailLink() {
  // console.log('email', email,window.location.href)
  console.log('auth', auth);
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      console.log('email', email);
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        console.log('email', email);
        console.log('result', result);
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        console.log('error', error);
      });
  }
}

export async function addTeamUsage({ uid, updateUsageArray }) {
  await setDoc(
    doc(db, 'team', uid),
    {
      team: updateUsageArray,
    },
    { merge: true },
  )
    .then(() => {
      console.log('team usage add in you team collection array');
      notification.info({
        description: TEAM_OWNER_USAGE_ASSIGN,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function TeamMemberSummaryAPI({ uid, teamMemberId, length }) {
  try {
    await setDoc(
      doc(db, 'team', uid, 'summary', uid),
      {
        teamMemberId,
        projects: length,
      },
      { merge: true },
    )
      .then(() => {
        console.log('in summary');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log('error', error);
  }
}
export async function updateRemainingAPI({ uid, remainingWords }) {
  await setDoc(
    doc(db, 'team', uid),
    {
      remainingWords,
    },
    { merge: true },
  )
    .then(() => {
      console.log('team usage add in you team collection array');
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteMemberAPI({ uid, removeMemberArray, remainingWords }) {
  await setDoc(
    doc(db, 'team', uid),
    {
      team: removeMemberArray,
    },
    { merge: true },
  )
    .then(() => {
      console.log('team member remove successfully');
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function updateMemberAPI({ teamId, updatedTeamData }) {
  await setDoc(
    doc(db, 'team', teamId),
    {
      team: updatedTeamData,
    },
    { merge: true },
  )
    .then(() => {
      console.log('team member status update successfully');
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function teamMembersInfoAPI({ email, uid }) {
  await addDoc(
    collection(db, 'invite-team'),
    {
      email,
      teamId: uid,
      url: window.location.origin,
    },
    { merge: true },
  )
    .then(() => {
      console.log('team member info save successfully in invite-team');
    })
    .catch((error) => {
      console.log(error);
    });
}

// export async function teamMembersSubmissionInfoAPI({ email }) {
//   await addDoc(
//     collection(db, 'submissions'),
//     {
//       email,
//       message: 'you received an email',
//     },
//     { merge: true },
//   )
//     .then(() => {
//       console.log('team member info save successfully in Submission');
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

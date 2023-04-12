import { notification } from 'antd';
import axios from 'axios';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { DISLIKE, LIKE, SOME_THING_WENT_WRONG } from '../../utils/constants';
import { DISLIKE_TEXT, LIKE_TEXT } from '../../utils/content';
import { fetchfavouriteTemplate, fetchTotalCredits } from './generationSlice';

export async function generationAPIData({ uid, templateBody, numOfOutputs, projectId }) {
  const finalTemplateBody = { ...templateBody, toolName: templateBody.templateId };

  try {
    return await axios
      .post(process.env.OPEN_AI_API, {
        userId: uid,
        ...finalTemplateBody,
        numOfOutputs,
        projectId,
      })
      .then(function (response) {
        if (response.data.error) {
          const errorMessage = response.data.error;
          notification.error({
            message: SOME_THING_WENT_WRONG,
            description: errorMessage,
          });
          return { error: errorMessage, outputData: null };
        } else {
          return { outputData: response.data };
        }
      })
      .catch((error) => {
        notification.warning({
          message: SOME_THING_WENT_WRONG,
        });
        return { error: SOME_THING_WENT_WRONG, outputData: null };
      });
  } catch (error) {
    notification.error({
      message: SOME_THING_WENT_WRONG,
    });
    return { error: SOME_THING_WENT_WRONG, outputData: null };

    console.error(error);
  }
}

export async function ratingAPIData({ uid, contentId, outputId, ratingType }) {
  const oppositeType = ratingType === LIKE ? DISLIKE : LIKE;
  const alertMessage = ratingType === LIKE ? LIKE_TEXT : DISLIKE_TEXT;
  try {
    await setDoc(
      doc(db, 'user-template-data', uid, 'outputs', outputId),
      { [ratingType]: arrayUnion(contentId), [oppositeType]: arrayRemove(contentId) },
      { merge: true },
    )
      .then(() => {
        console.log('Rating saved');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function favouriteTemplateAPI({ id, uid }) {
  try {
    await setDoc(
      doc(db, 'user-template-data', uid),
      {
        favouritesTemplate: arrayUnion(id),
      },
      { merge: true },
    )
      .then(() => {
        console.log('Mark Template as a favourite ');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function removeFavouriteTemplateAPI({ id, uid }) {
  console.log('uid,id', uid, id);
  try {
    await setDoc(
      doc(db, 'user-template-data', uid),
      {
        favouritesTemplate: arrayRemove(id),
      },
      { merge: true },
    )
      .then(() => {
        console.log('remove Template as a favourite ');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}
export async function fetchFavTemplates({ uid, dispatch }) {
  try {
    onSnapshot(doc(db, 'user-template-data', uid), (doc) => {
      const {
        currentPlanOutputWords,
        favouritesTemplate,
        planInterval,
        yearCurrentIntervalOutputWords,
        periodStart,
        lastOutputDate,
        yearIntervalIndex,
      } = doc.data() || {
        favouritesTemplate: [],
        currentPlanOutputWords,
      };

      dispatch(
        fetchfavouriteTemplate({
          templatesData: { favouritesTemplate },
          currentPlanOutputWords,
          planInterval,
          yearCurrentIntervalOutputWords,
          periodStart,
          lastOutputDate,
          yearIntervalIndex,
        }),
      );
    });
  } catch (error) {
    console.log(error);
  }
}

export async function totalCreditsAPI({ uid, dispatch }) {
  try {
    onSnapshot(doc(db, 'user-template-data', uid), (doc) => {
      const { currentPlanOutputWords } = doc.data() || {
        currentPlanOutputWords,
      };
      dispatch(fetchTotalCredits({ currentPlanOutputWords }));
    });
  } catch (error) {
    console.log(error);
  }
}

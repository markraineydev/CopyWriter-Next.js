import { deleteField, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { CREATE_NEW_PROJECT } from '../../utils/constants';
import { TeamMemberSummary } from '../team/teamSlice';
import { fetchProjectSuccess, fetchUserProjectSuccess, teamMemberTotalProject } from './projectsSlice';

// this is used to update, create and delete
export async function projectCUD({ uid, updateProject, selectedProject, actionType }) {
  let projectObj = { projects: updateProject };

  if (actionType === CREATE_NEW_PROJECT) {
    projectObj = {
      ...projectObj,
      selectedProject,
    };
  }
  try {
    await setDoc(
      doc(db, 'projects', uid),
      {
        ...projectObj,
      },
      { merge: true },
    )
      .then(() => {
        console.log('project saved');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProjectData({ uid, dispatch }) {
  try {
    onSnapshot(doc(db, 'projects', uid), (doc) => {
      const { projects, selectedProject } = doc.data() || { projects: [] };
      const sortProjects = projects.sort((a, b) => a.order - b.order);
      dispatch(fetchProjectSuccess({ projects: sortProjects, selectedProject, totalProjects: sortProjects.length }));
      return doc.data();
    });
  } catch (error) {
    console.log(error);
  }
}
export async function fetchUserProjectData({ uid, dispatch }) {
  try {
    onSnapshot(doc(db, 'projects', uid), (doc) => {
      const { projects } = doc.data() || { projects: [] };
      dispatch(fetchUserProjectSuccess({ projects }));
      return doc.data();
    });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProjectLength({ uid, teamMemberId, dispatch }) {
  try {
    onSnapshot(doc(db, 'projects', uid), (doc) => {
      const { projects } = doc.data() || { projects: [] };
      // return doc.data();
      console.log('projects.length', projects.length, uid);
      var length = projects.length;
      dispatch(TeamMemberSummary({ uid, teamMemberId, length }));
    });
  } catch (error) {
    console.log(error);
  }
}

export async function storeSelectedProject({ uid, selectedProject }) {
  try {
    await setDoc(
      doc(db, 'projects', uid),
      {
        selectedProject: selectedProject,
      },
      { merge: true },
    )
      .then(() => {
        console.log('select the data');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

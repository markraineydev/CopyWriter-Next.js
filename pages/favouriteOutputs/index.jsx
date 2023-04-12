import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import FavouriteOutputs from '../../components/favouriteoutputs';
import { fetchFavouriteOutputs } from '../../features/output/outputSlice';
import { firebaseAuth } from '../../firebase';

function FavouriteOutputPage() {
  const { selectedProject } = useSelector((state) => state.projects);
  const { projectId } = selectedProject;
  const [user] = useAuthState(firebaseAuth);
  const dispatch = useDispatch();
  const { uid } = user;

  useEffect(() => {
    uid && projectId && dispatch(fetchFavouriteOutputs({ uid, projectId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, projectId]);

  return (
    <>
      <FavouriteOutputs projectId={projectId} />
    </>
  );
}

export default FavouriteOutputPage;

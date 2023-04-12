import React, { useState } from 'react';
import { DashboardStyle } from '../../styles/pageStyled/dashboardStyled';
import Profile from '../../components/dashbord/profile';
import StatusBar from '../../components/dashbord/status-bar';
import RefFriend from '../../components/dashbord/referfriend';
import MostUsedTemplates from '../../components/dashbord/newProject';
import RecentGenerationCard from '../../components/dashbord/recentgeneration';
import DashBoardFooter from '../../components/dashbord/footer';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { dashboardCardData } from '../../features/dashboard/dashboardSlice';
import { useEffect } from 'react';
import { INPUT_REMOVE_LIST } from '../../utils/constants';

const Dashboard = () => {
  const [dashboardOutput, setDashboardOutput] = useState([]);
  const [totalTemplatesGenerate, setTotalTemplateGenerate] = useState([]);
  const { dashboardCard } = useSelector((state) => state.dashboard);

  const { outputsData } = dashboardCard;
  useEffect(() => {
    const temp = [];
    const totalTemplate = [];
    Array.isArray(outputsData) &&
      outputsData.forEach(
        ({ favourites, outputId, inputs, projectId, time, templateId, outputs: { result, price } }) => {
          result &&
            Array.isArray(result) &&
            result.forEach(({ content, contentId }) => {
              const inputArray = Object.keys(inputs);
              INPUT_REMOVE_LIST.forEach((objectKey) => {
                const index = inputArray.indexOf(objectKey);
                inputArray.splice(index, 1);
              });
              temp.push({
                inputs,
                inputArray,
                outputId,
                favourites,
                result,
                projectId,
                time,
                templateId,
                price,
                totalInputs: inputs[inputArray],
                content,
                contentId,
              });
              !totalTemplate.find((e) => e.outputId === outputId) && totalTemplate.push({ templateId, outputId });
            });
        },
      );
    const tempSorted = temp.sort((a, b) => b.time - a.time);
    setDashboardOutput(tempSorted);
    setTotalTemplateGenerate(totalTemplate);
  }, [outputsData]);

  return (
    <DashboardStyle>
      <div className="dashboard-header">Dashboard</div>
      <Profile />
      <StatusBar />
      <RefFriend />
      <MostUsedTemplates totalTemplatesGenerate={totalTemplatesGenerate} />
      <RecentGenerationCard dashboardOutput={dashboardOutput} />
      <DashBoardFooter />
    </DashboardStyle>
  );
};
export default Dashboard;

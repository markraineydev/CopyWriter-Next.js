import { Row, Col } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { numberFormat } from '../../../utils/generateUtils';
import { StatusBarStyled } from './styled';

const StatusBar = () => {
  const [dashboardOutput, setDashboardOutput] = useState([]);
  const [dashboardFavoriteOutput, setDashboardFavoriteOutput] = useState([]);
  const { outputGenerateData } = useSelector((state) => state.outputs);
  const { userData } = useSelector((state) => state.auth);
  const { planDetails } = useSelector((state) => state.team);
  const { userTotalWords } = userData || { userTotalWords: 0 };
  const { words } = planDetails;
  const creditsLeft = () => {
    const credits = words - userTotalWords;
    if (credits === NaN || userTotalWords === undefined) {
      credits = 0;
      credits = words - credits;
    } else if (Math.sign(credits) === 1) {
      credits = words - userTotalWords;
    } else if (Math.sign(credits) === -1) {
      credits = 0;
    } else {
      credits = words - userTotalWords;
    }

    return numberFormat(credits);
  };
  useEffect(() => {
    const temp = [];
    const fav = [];
    Array.isArray(outputGenerateData) &&
      outputGenerateData.forEach((res) => {
        const {
          favourites,
          outputId,
          inputs,
          outputs: { result },
        } = res;
        result &&
          Array.isArray(result) &&
          result.forEach((res) => {
            temp.push({ ...res, inputs, outputId, favourites });
            favourites && favourites.includes(res.contentId) && fav.push({ ...res });
          });
      });
    const tempSorted = temp.sort((a, b) => b.time - a.time);
    setDashboardFavoriteOutput(fav);
    setDashboardOutput(tempSorted);
  }, [outputGenerateData]);

  return (
    <StatusBarStyled>
      <Row>
        <Col xs={24} sm={6} md={8}>
          <div className="Status-bar">{creditsLeft()} Credits Left</div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div className="Status-bar">{dashboardOutput.length} AI Outputs</div>
        </Col>
        <Col xs={24} sm={6} md={8}>
          <div className="Status-bar">
            {dashboardFavoriteOutput && dashboardFavoriteOutput.length} Favourite Outputs
          </div>
        </Col>
      </Row>
    </StatusBarStyled>
  );
};

export default StatusBar;

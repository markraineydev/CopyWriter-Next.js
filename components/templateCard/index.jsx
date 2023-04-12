import React, { useState } from 'react';
import { TemplateCardStyle, TemplateCardStyleList } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import IconStar from '../../assets/iconStar';

import { Col } from 'antd';
import { Input, Typography } from 'antd';
import { FAVOURITE, GRID_VIEW, LIST_VIEW } from '../../utils/constants';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { favouriteTemplateData, removefavouriteTemplateData } from '../../features/generation/generationSlice';
import { firebaseAuth } from '../../firebase';
import star from '../../assets/star.png';
import { getTemplateIcon } from '../../utils/genericFunctions';

const { Text, Title } = Typography;

const TemplateCard = ({ commonIcon, id, title, text, imgWidth, imgHeight, type, uid, favouritesTemplate }) => {
  const [favouriteTemplate, setFavouriteTemplate] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const viewType = type === LIST_VIEW ? 24 : type === GRID_VIEW ? '' : 24;
  const onTemplateClick = ({ generationId }) => {
    router.push(`/generation/${generationId}`);
  };

  const addFavouriteTemplate = () => {
    dispatch(favouriteTemplateData({ id, uid }));
  };

  const removeFavouriteTemplate = () => {
    dispatch(removefavouriteTemplateData({ id, uid }));
  };
  return (
    <Col
      span={viewType}
      className={
        viewType
          ? !favouritesTemplate || !favouritesTemplate.includes(id)
            ? 'columnList'
            : 'columList'
          : !favouritesTemplate || !favouritesTemplate.includes(id)
          ? 'column'
          : 'colum'
      }
    >
      {type === LIST_VIEW && (
        <>
          <TemplateCardStyleList>
            <div>
              <Image
                alt={title}
                src={getTemplateIcon(commonIcon || id)}
                width={imgWidth}
                height={imgHeight}
                onClick={() => onTemplateClick({ generationId: id })}
              />
            </div>
            <div className="template-detail" onClick={() => onTemplateClick({ generationId: id })}>
              <div>
                <Text className="template-title-name">{title}</Text>
                <br />
                <Text className="template-description">{text}</Text>
              </div>
            </div>
            {favouriteTemplate !== FAVOURITE && (!favouritesTemplate || !favouritesTemplate.includes(id)) ? (
              <div onClick={() => addFavouriteTemplate()}>
                <IconStar />
              </div>
            ) : (
              <div onClick={() => removeFavouriteTemplate()}>
                <IconStar fill="#FCD34D" stroke="#FCD34D" />
              </div>
            )}
          </TemplateCardStyleList>
        </>
      )}
      {type === GRID_VIEW && (
        <TemplateCardStyle>
          <div className="templates-icons">
            <Image
              alt={title}
              src={getTemplateIcon(commonIcon || id)}
              width={imgWidth}
              height={imgHeight}
              onClick={() => onTemplateClick({ generationId: id })}
            />
            {favouriteTemplate !== FAVOURITE && (!favouritesTemplate || !favouritesTemplate.includes(id)) ? (
              <div onClick={() => addFavouriteTemplate()}>
                <IconStar />
              </div>
            ) : (
              <div onClick={() => removeFavouriteTemplate()}>
                <IconStar fill="#FCD34D" stroke="#FCD34D" />
              </div>
            )}
          </div>
          <div onClick={() => onTemplateClick({ generationId: id })}>
            <Text className="template-title-name">{title}</Text>
            <br />
            <Text className="template-description">{text}</Text>
          </div>
        </TemplateCardStyle>
      )}
    </Col>
  );
};

export default TemplateCard;

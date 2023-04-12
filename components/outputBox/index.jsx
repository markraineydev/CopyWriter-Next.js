import React from 'react';
import { OutputBoxStyled } from './styled';
import { Space, Tooltip, Typography } from 'antd';
import ReactTimeAgo from 'react-time-ago';
import IconStar from '../../assets/iconStar';

import { useDispatch } from 'react-redux';
import { addfavouriteContent, removefavouriteCardData } from '../../features/output/outputSlice';
import { firebaseAuth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { copyContent, copyFormat, ICON_ALERT_MESSAGE } from '../../utils/generateUtils';
import { Square2StackIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { FAVOURITE, REMOVE } from '../../utils/constants';
import { COPIED_TOOLTIP, COPIED_TO_CLIPBOARD, FAVOURITE_TOOLTIP, UN_FAVOURITE_TOOLTIP } from '../../utils/content';
import CopyToClipboard from 'react-copy-to-clipboard';

const { Text, Title } = Typography;
const OutputBox = ({ templateName, key, time, content, onClickModal, contentId, outputId, favourites }) => {
  const [isfavourite, setIsfavourite] = useState('');
  const dispatch = useDispatch();
  const [user] = useAuthState(firebaseAuth);

  const { uid } = user || { uid: null };

  const addFavouriteContent = (contentId) => {
    setIsfavourite(FAVOURITE);
    dispatch(addfavouriteContent({ contentId, outputId }));
  };
  const removefavouriteContent = (contentId) => {
    setIsfavourite(REMOVE);
    dispatch(removefavouriteCardData({ contentId, outputId }));
  };
  const onCopyClick = () => {
    ICON_ALERT_MESSAGE(COPIED_TO_CLIPBOARD);
  };

  return (
    <OutputBoxStyled key={key}>
      <div className="output_type">
        <Text className="box_text">{templateName}</Text>
        <div className="output-action-icons">
          <Space>
            <CopyToClipboard text={copyFormat(copyContent(content))} onCopy={onCopyClick}>
              <Tooltip placement="top" title={COPIED_TOOLTIP}>
                <Square2StackIcon style={{ width: 19, height: 20, color: '#D1D5DB' }} />{' '}
              </Tooltip>
            </CopyToClipboard>
            {isfavourite !== FAVOURITE && (!favourites || !favourites.includes(contentId)) ? (
              <Tooltip placement="top" title={FAVOURITE_TOOLTIP}>
                <span onClick={() => addFavouriteContent(contentId)}>
                  <IconStar color />
                </span>
              </Tooltip>
            ) : (
              <Tooltip placement="top" title={UN_FAVOURITE_TOOLTIP}>
                <span onClick={() => removefavouriteContent(contentId)}>
                  <IconStar fill="#FCD34D" stroke="#FCD34D" />
                </span>
              </Tooltip>
            )}
          </Space>
        </div>
      </div>
      <div className="content" onClick={onClickModal}>
        <Text className="content_text">{content}</Text>
      </div>
      <div className="output_time">
        <Text className="box_text">
          <ReactTimeAgo date={time || new Date()} timeStyle="round-minute" />{' '}
        </Text>
      </div>
    </OutputBoxStyled>
  );
};

export default OutputBox;

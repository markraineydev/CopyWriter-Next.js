import { Button } from 'antd';
import React from 'react';
import { RefFriendStyled } from './styled';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const RefFriend = () => {
  return (
    <RefFriendStyled>
      <div className="ref-box">
        <div className="refer-title">Refer your friends</div>
        <div className="credit-points">+10,000 credits</div>
        <div className="description">
          Give 10k credits and get 10k credits for each new account that signs up with your link. Credits are applied 7
          days after your referrals start their subscription.
        </div>
        <Button type="primary">Copy Share Link</Button>
      </div>
    </RefFriendStyled>
  );
};

export default RefFriend;

import React from 'react';
import FooteStyled from './styled';
import IconCopy from '../../../assets/iconCopy';
import facebook from '../../../assets/templateIcon/facebook.png';
import google from '../../../assets/templateIcon/google.png';
import photoPostCaption from '../../../assets/templateIcon/photoPostCaption.png';
import Image from 'next/image';

const DashBoardFooter = () => {
  return (
    <FooteStyled>
      <div className="footer-box">
        <div className="footer-data">
          <div className="text-data">About</div>
          <div className="text-data">Blog</div>
          <div className="text-data">Help center</div>
          <div className="text-data">Privacy</div>
          <div className="text-data">Privacy</div>
          <div className="text-data">Status</div>
        </div>
        <div className="icon-box">
          <div className="icon">
            {/* <IconCopy /> */}
            <Image alt="facebook" src={facebook} height={30} width={30} />
          </div>
          <div className="icon">
            <Image alt="facebook" src={google} height={30} width={30} />
          </div>
          <div className="icon">
            <Image alt="facebook" src={photoPostCaption} height={30} width={30} />
          </div>
        </div>
        <div className="copy-right-text">© 2022 CopyWriter. All rights reserved.</div>
      </div>
    </FooteStyled>
  );
};

export default DashBoardFooter;

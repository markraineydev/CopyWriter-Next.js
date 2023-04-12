import { Button, Dropdown, Select } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ALL } from '../../utils/constants';
import { OutputDropDownStyled } from './styled';

const OutputDropDown = ({ outputsData, selectedTemplateId }) => {
  const { templateList } = useSelector((state) => state.template);

  const selectedTemplateList = [...new Set(outputsData ? outputsData.map(({ templateId }) => templateId) : [])].map(
    (templateId, index) => {
      const { id, title } = templateList.find(({ id }) => id === templateId);
      return {
        value: id,
        label: title,
      };
    },
  );

  return (
    <OutputDropDownStyled>
      <Select
        defaultValue="all"
        style={{
          width: '100%',
        }}
        onChange={selectedTemplateId}
        options={[{ value: ALL, label: 'All' }, ...selectedTemplateList]}
      />
    </OutputDropDownStyled>
  );
};

export default OutputDropDown;

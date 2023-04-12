import React, { useState } from 'react';
import { Input, Typography } from 'antd';
import { TemplateCategoriesStyled } from './styled';
import { Button, Space } from 'antd';
import { categories } from '../../utils/TemplateData';
const { Text } = Typography;

export const TemplateCategories = ({ selectedCategory, handleSelect }) => {
  return (
    <>
      <TemplateCategoriesStyled>
        <Space size={[6, 1]} wrap>
          {categories.map((category, index) => (
            <Button
              className={`btn ${selectedCategory === category?.id && 'isSelected'}`}
              onClick={() => handleSelect(category?.id)}
              key={index}
            >
              {category?.name}
            </Button>
          ))}
        </Space>
      </TemplateCategoriesStyled>
    </>
  );
};

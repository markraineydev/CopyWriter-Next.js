import { useRouter } from 'next/router';
import React, { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/pageHeader';
import { TemplateCategories } from '../../components/templateCategories';
import { Col, Row } from 'antd';
import TemplateCard from '../../components/templateCard';
import { GRID_VIEW, LIST_VIEW } from '../../utils/constants';
import { TemplateStyled } from '../../styles/pageStyled/templatesStyled';
import { readFavouriteTemplates } from '../../features/generation/generationSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';

const Templates = () => {
  const router = useRouter();
  const [viewType, setViewType] = useState(GRID_VIEW);
  const [tempList, setTempList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templateTitle, setTemplateTitle] = useState('');
  const { favouriteTemplate } = useSelector((state) => state.generation);
  const { templateList } = useSelector((state) => state.template);
  const [user] = useAuthState(firebaseAuth);
  const { uid } = user || { uid: null };
  const dispatch = useDispatch();

  const { favouritesTemplate } = favouriteTemplate || { favouritesTemplate: [] };

  useEffect(() => {
    setTempList(templateList);
  }, [templateList]);

  const type = viewType === LIST_VIEW ? 'rowList' : viewType === GRID_VIEW ? 'row' : 'rowList';

  function getFilteredList() {
    if (selectedCategory === 'all') {
      return templateList;
    }
    return tempList.filter(({ categories }) => categories === selectedCategory);
  }

  const handleSelect = (id) => {
    setSelectedCategory(id);
  };
  const handleChange = (e) => {
    setTemplateTitle(e.target.value);
  };

  const filteredList = useMemo(getFilteredList, [selectedCategory, tempList, templateList]);
  const displayTemplates =
    filteredList &&
    filteredList
      .map((data) => {
        if (favouritesTemplate && favouritesTemplate.includes(data.id)) {
          return { ...data, fav: true };
        } else {
          return { ...data, fav: false };
        }
      })
      .sort(function (x, y) {
        return x.fav === y.fav ? 0 : x.fav ? -1 : 1;
      });

  return (
    <>
      <PageHeader
        type={viewType}
        onViewClick={setViewType}
        page="template"
        title="Templates"
        handleChange={handleChange}
        show={true}
      />
      <TemplateCategories selectedCategory={selectedCategory} handleSelect={handleSelect} />
      <TemplateStyled>
        <Row className={type} gutter={[16, 16]}>
          {displayTemplates &&
            displayTemplates
              .filter((card) => card.title.toLowerCase().includes(templateTitle.toLowerCase()))
              .map(({ id, star, title, commonIcon, description, image, fav }, index) => {
                return (
                  <TemplateCard
                    key={index}
                    id={id}
                    commonIcon={commonIcon}
                    type={viewType}
                    image={image}
                    star={star}
                    title={title}
                    text={description}
                    imgWidth={65}
                    imgHeight={65}
                    uid={uid}
                    fav={fav}
                    favouritesTemplate={favouritesTemplate}
                  />
                );
              })}
        </Row>
      </TemplateStyled>
    </>
  );
};

export default Templates;

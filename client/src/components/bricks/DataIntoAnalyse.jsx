// DataIntoDescription.jsx
import React from 'react';
import InfoComponent from './InfoComponent';
import DescriptionComponent from './DescriptionComponent';
import ExperiencesPartComponent from './ExperiencesPartComponent';
import ModelsPartComponent from './ModelsPartComponent';

const DataIntoDescription = ({ Infos, Desc, ListeExp = [], ListeModel = [] }) => {
  return (
    <div>
      <InfoComponent infosData={Infos} />
      <DescriptionComponent DescData={Desc} />
      <ExperiencesPartComponent listeExp={ListeExp} />
      <ModelsPartComponent listeModel={ListeModel} />
    </div>
  );
};

export default DataIntoDescription;

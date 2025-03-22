// DescriptionComponent.jsx
/*
  Descriptions = [Desc1,Desc2,Desc3]
  DescData = [Data1,Data2,Data3]
  donne

  Desc1 : 
    Data1
  Desc2 : 
    Data2
  Desc3 : 
    Data3

*/ 

import React from 'react';
const DescriptionComponent = 
(
  {
  Descriptions = 
    [
      "Description",
      "Collaborateurs",
      "Données Utilisées",
      "Statut",
    ],  
  DescData = []
  }
) => 
  {
  return (
    <div>
      {DescData.map((detail, index) => (
        <div key={`desc-${index}`} className="m-2">
          <span className="text-base font-bold">
            {Descriptions[index] + ": "}
          </span>
          <br />
          <span className="ml-8">{detail}</span>
          <br />
        </div>
      ))}
    </div>
  );
};
export default DescriptionComponent;
// InfoComponent.jsx
import React from 'react';
/*
  informations = [info1,info2,info3]
  infosData = [Data1,Data2,Data3]
  
  donne

  info1 : Data1
  info2 : Data2
  info3 : Data3

*/ 
const InfoComponent = 
(
  { 
    Informations = [
      "Créateur",
      "Date de création",
      "Type",
    ],
    infosData 

  }) => {
  return (
    <div>
      {infosData.map((info, index) => (
        <div key={`info-${index}`} className="m-2">
          <span className="text-base font-bold">
            {Informations[index] + ": "}
          </span>
          <span>{info}</span>
        </div>
      ))}
    </div>
  );
};
export default InfoComponent;
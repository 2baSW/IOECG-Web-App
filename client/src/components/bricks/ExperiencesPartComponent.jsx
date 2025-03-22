// ExperiencesModelsComponent.jsx
import React from 'react';

const ExperiencesPartComponent = ({  listeExp = [] }) => {

  return (
    <div>

      {listeExp.length > 0 && (
        <div className="m-2">
          <span className="text-base font-bold">Expériences réalisées: </span>
          <span className="ml-8">
            <table className="ml-8 border-collapse">
              <tbody>
                {listeExp.map((exp, index) => (
                  <tr key={`exp-${index}`} className="border border-gray-800 dark:border-gray-800">
                    <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                      <input type="checkbox" />
                    </td>
                    <th className="w-full text-left px-6 py-4 font-medium text-gray-900 bg-gray-50">
                      {exp}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                      <button className="text-xs text-center text-white bg-green-500 py-1 px-3 rounded-full">
                        Consulter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </span>
        </div>
      )}


    </div>
  );
};
export default ExperiencesPartComponent;
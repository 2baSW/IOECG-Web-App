// ModelsPartComponent.jsx
import React from 'react';

const ModelsPartComponent = ({ listeModel = [] }) => {
  const StatusToColor = (status) => {
    switch (status) {
      case 'Repos':
        return 'bg-blue-500';
      case 'En cours':
        return 'bg-red-500';
      case 'Executée':
        return 'bg-green-500';
      default:
        return 'bg-black-500';
    }
  };

  const StatusToAction = (status) => {
    switch (status) {
      case 'Repos':
        return 'Executer\u00A0';
      case 'En cours':
        return '\u00A0\u00A0\u00A0Suivi\u00A0\u00A0\u00A0\u00A0';
      case 'Executée':
        return 'Consulter';
      default:
        return 'Contactez un administrateur';
    }
  };

  return (
    <div>
      {listeModel.length === 1 && (
        <div className="m-2">
          <span className="text-base font-bold">Statut: </span>
          <span>{listeModel[0][1]}</span>
        </div>
      )}

      {listeModel.length > 0 && (
        <div className="m-2">
          <span className="text-base font-bold">Modèles à exécuter:</span>
          <span className="ml-8">
            <table className="table-fixed ml-8">
              <tbody>
                {listeModel.map((model, index) => (
                  <tr key={`model-${index}`} className="border border-gray-800 dark:border-gray-800">
                    <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                      <input type="checkbox" />
                    </td>
                    <th className="w-full text-left px-6 py-4 font-medium text-gray-900 bg-gray-50 dark:text-dark">
                      {model[0]}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                      <button className={`text-xs text-center text-white ${StatusToColor(model[1])} py-1 px-3 rounded-full`}>
                        {StatusToAction(model[1])}
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
export default ModelsPartComponent;
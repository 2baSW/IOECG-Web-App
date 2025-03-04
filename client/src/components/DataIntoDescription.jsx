
const Informations = [
    "Créateur",
    "Date de création",
    "Type",
  ];

const Descriptions = 
[
  "Description",
  "Collaborateurs",
  "Données Utilisées",
]
const Listes = [
  "Expériences réalisées",
  "Modèles à exécuter",
]
const DataIntoDescription = ({Infos,Desc,ListeExp,ListeModel}) =>
{
  const balises = [];
  let i = 0;

  balises.push(
    Infos.map((info, index) => (
      <div key={`info-${index}`} className="m-2">
        <span className="text-base font-bold">
          {Informations[i++] + ": "}
        </span>
        <span>{info}</span>
      </div>
    ))
  );

  i = 0;

  balises.push(
    Desc.map((detail, index) => (
      <div key={`desc-${index}`} className="m-2">
        <span className="text-base font-bold">
          {Descriptions[i++] + ": "}
        </span>
        <br />
        <span className="ml-8">{detail}</span>
        <br />
      </div>
    ))
  );

  const tables = [[], []];

  tables[0].push(
    <table className="ml-8 border-collapse">
      <tbody>
        {ListeExp.map((Exp, index) => (
          <tr key={`exp-${index}`} className="border border-gray-800 dark:border-gray-800">
            <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
              <input type="checkbox" />
            </td>
            <th className="w-full text-left px-6 py-4 font-medium text-gray-900 bg-gray-50">
              {Exp}
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
  );

  tables[1].push(
    <table className="table-fixed ml-8">
      <tbody>
        {ListeModel.map((Model, index) => (
          <tr key={`model-${index}`} className="border border-gray-800 dark:border-gray-800">
            <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
              <input type="checkbox" />
            </td>
            <th className="w-full text-left px-6 py-4 font-medium text-gray-900 bg-gray-50 dark:text-dark">
              {Model}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );

  i = 0;
  balises.push(
    Listes.map((listeRealisee, index) => (
      <div key={`liste-${index}`}>
        <span className="text-base font-bold">{listeRealisee + ":"}</span>
        <span className="ml-8">{tables[i++]}</span>
      </div>
    ))
  );

  return balises
}
export default DataIntoDescription;
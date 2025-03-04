const AnalysePage = () => {
  const balises = [];

  const attributs = [
    "Projet N°",
    "Créateur",
    "Date de création",
    "Type",
    "Description",
    "Collaborateurs",
    "Données Utilisées",
    "Expériences réalisées",
    "Modèles à exécuter",
  ];

  const datastatictest = [
    42,
    "Mon Titre Statique",
    "MonCreateur",
    "MaDate",
    "MonType",
    "MaDescription",
    "MesCollabs",
    "MesDonnéesUtilisées",
    ["Exp1", "Exp2"],
    ["Model1", "Model2"],
  ];

  /*création des balises, ce soir, je les transformerai en composants*/
  for (let i = 1; i < attributs.length - 5; i++) {
    balises.push(
      <div key={attributs[i]}>
        <span className="text-base font-bold ">{attributs[i] + ": "}</span>
        <span>{datastatictest[i + 1]}</span>
      </div>
    );
  }

  for (let i = attributs.length - 5; i < attributs.length - 2; i++) {
    balises.push(
      <div key={attributs[i]}>
        <span className="text-base font-bold ">{attributs[i] + ": "}</span>
        <br></br>
        <span className="ml-8">{"\t" + datastatictest[i + 1]}</span>
      </div>
    );
  }
  const ListeExp = datastatictest[datastatictest.length - 2];
  const ListeModel = datastatictest[datastatictest.length - 1];
  console.log(ListeExp);

  const tables = [[], []];

  tables[0].push(
    <table>
      <tbody>
        {ListeExp.map((Exp, index) => (
          <tr
            key={index}
            className="border-b border-gray-300 dark:border-gray-800"
          >
            <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
              <input type="checkbox" />
            </td>
            <th className="w-3/4 text-left px-6 py-4 font-medium text-gray-900 bg-gray-50">
              {Exp}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );

  tables[1].push(
    <table className="table-fixed">
      <tbody>
        {ListeModel.map((Model, index) => (
          <tr
            key={index}
            className=" border-b border-gray-200 dark:border-gray-700"
          >
            <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50 dark:text-white">
              <input type="checkbox" />
            </td>
            <th className="w-3/4 text-left px-6 py-4 font-medium text-gray-900 bg-gray-50 dark:text-white">
              {Model}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );

  for (let i = attributs.length - 2; i < attributs.length; i++) {
    balises.push(
      <div key={attributs[i]}>
        <span className="text-base font-bold ">{attributs[i] + ":"}</span>
        <span className="ml-8">{tables[i - (attributs.length - 2)]}</span>
      </div>
    );
  }
  return (
    <div className="Analyse">
      <div className="grid grid-cols-10 gap-4">
        <p className="text-2xl font-bold text-gray-700 col-start-3 col-end-10">
          {attributs[0] + datastatictest[0]} : {datastatictest[1]}
        </p>
        <br></br>
        <div className="col-start-2 col-end-10">{balises}</div>
      </div>
    </div>
  );
};
export default AnalysePage;

import DataIntoDescription from "../components/DataIntoDescription";

const AnalysePage = () => {
  const MyData = [
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

  const balises = (
    <DataIntoDescription 
      {...{
        Infos: MyData.slice(2, 5),
        Desc: MyData.slice(5, 8),
        ListeExp: MyData[8],
        ListeModel: MyData[9]
      }}
    />
  );
  
  return (
    <div className="Analyse">
      <div className="grid grid-cols-10 gap-4">
        <p className="text-2xl font-bold text-gray-700 col-start-3 col-end-10">
          {"Projet N°" + MyData[0]} : {MyData[1]}
        </p>
        <br></br>
        <div className="col-start-2 col-end-10">{balises}</div>
      </div>
    </div>
  );
};
export default AnalysePage;

import InfoComponent from "../components/bricks/InfoComponent";
import DescriptionComponent from "../components/bricks/DescriptionComponent";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const ModelPage = () => 
{
  const [Model, setModel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Récupère l'ID du projet depuis l'URL

  useEffect(() => {
      const fetchProjects = async () => {
        try 
        {
          const response = await fetch(`http://localhost:8080/api/models/${id}`);
          if (!response.ok) {
            throw new Error("Serveur indisponible");
          }
          const data = await response.json();
          setModel(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }, []);

  const infosModel = [Model.version, Model.dateCreation,"null","null"];
  const descriptionsModel=["null",Model.description, "null", "null","null"]; //statique

  return (
    <div id="Model">
      <div className="grid grid-cols-10 gap-4">
        <p className="text-2xl font-bold text-gray-700 col-start-3 col-end-10">
          {"Modèle N°" + Model.id} : {Model.nom}
        </p>
        <br></br>
        <div className="col-start-2 col-end-10">
          {
            <>
            <InfoComponent 
            {...{
              Informations :
              [
                  "Version",
                  "Date de publication",
                  "Laboratoire d'entraînement",
                  "Equipe d'entraînement",
              ],
              infosData: infosModel,
              
            }}
          />
            <DescriptionComponent 
            {...{
              Descriptions :
              [
                  "Données d'entraînement utilisées",
                  "Description",
                  "Cas d'utilisation",
                  "Données entrée/sorties",
                  "Publication scientifiques associées",
              ],
              DescData:descriptionsModel,
              
            }}
          />
          </>
          }</div>
      </div>
    </div>
  );
};
export default ModelPage;

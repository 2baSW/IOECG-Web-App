import DataIntoAnalyse from "../components/bricks/DataIntoAnalyse";
import { useParams } from "react-router-dom";
import { useEffect } from "react";



const AnalysePage = () => 
{
  const { id } = useParams(); // Récupère l'ID du projet depuis l'URL

  useEffect(() => {
      const fetchProjects = async () => {
        try 
        {
          const response = await fetch("http://localhost:8080/api/projects");
          if (!response.ok) {
            throw new Error("Serveur indisponible");
          }
          const data = await response.json();
          setProjects(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }, []);
    const data1 = {
      id: 1,
      nom: "wesh",
      description: "wesh",
      dateCreation: "2025-03-12T20:22:03.14741",
      typeProjet: "Analyse",
      createurNom: "Dupont",
      createurPrenom: "Jean"
      /* 
      partie manquante
      listeIDmodel: 1 2 3 soleil
      listeIDExp: 1 2 3 soleil
      */ 
    };
  /*
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/projects/${data1.id}/collabs`);
        if (!response.ok) {
          throw new Error("Serveur indisponible");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
	
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/projects/${data1.id}/modeles`);
        if (!response.ok) {
          throw new Error("Serveur indisponible");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/projects/${data1.id}/datasets`);
        if (!response.ok) {
          throw new Error("Serveur indisponible");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  */
  const infosdata1 = [data1.createurNom, data1.dateCreation, data1.typeProjet];
  const descriptionsdata=[data1.description, "null", "null"]; //statique
  const listeExperiences = ["null","testStatique","Public static void main (String[] argcs)"]; //statique
  const listeModeles = [["null","Repos"],["null","En cours"],["null","Executée"],]; //statique
  const balises = (
    <DataIntoAnalyse 
      {...{
        Infos: infosdata1,
        Desc: descriptionsdata,
        ListeExp: listeExperiences,
        ListeModel: listeModeles
      }}
    />
  );

  return (
    <div className="Analyse">
      <div className="grid grid-cols-10 gap-4">
        <p className="text-2xl font-bold text-gray-700 col-start-3 col-end-10">
          {"Projet N°" + data1.id} : {data1.nom}
        </p>
        <br></br>
        <div className="col-start-2 col-end-10">{balises}</div>
      </div>
    </div>
  );
};
export default AnalysePage;

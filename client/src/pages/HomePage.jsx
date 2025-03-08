import { useState, useEffect } from "react";
import plusIcon from "../assets/plus.png"; 

import CreateProjectModal from "../components/CreateProjectModal";
import CreateDatasetModal from "../components/CreateDatasetModal";
import ExploreModelsModal from "../components/ExploreModelsModal";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // État pour afficher le menu d'action (bouton "+")
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  // États pour afficher chaque modal
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDatasetModal, setShowDatasetModal] = useState(false);
  const [showModelsModal, setShowModelsModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/projects");
        if (!response.ok) throw new Error("Serveur indisponible");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Gérer l'affichage du menu lorsqu'on clique sur le bouton "+"
  const toggleCreateMenu = () => {
    setShowCreateMenu(!showCreateMenu);
  };

  // Ouvrir chaque modal et fermer le menu
  const openProjectModal = () => {
    setShowProjectModal(true);
    setShowCreateMenu(false);
  };

  const openDatasetModal = () => {
    setShowDatasetModal(true);
    setShowCreateMenu(false);
  };

  const openModelsModal = () => {
    setShowModelsModal(true);
    setShowCreateMenu(false);
  };

  return (
    <div className="p-8 relative">
      <h1 className="text-2xl font-bold mb-6">Projets consultés récemment</h1>

      {loading && <div className="text-center py-4">Chargement des projets...</div>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Erreur : {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom de Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {project.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.typeProjet}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.createur?.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bouton flottant "plus" */}
      <div className="fixed bottom-6 right-6">
        <input
          type="image"
          src={plusIcon}
          alt="Créer"
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition"
          onClick={toggleCreateMenu}
        />
        {showCreateMenu && (
          <div className="absolute bottom-16 right-0 bg-white border rounded shadow-md p-2">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={openProjectModal}
            >
              Créer un Projet
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={openDatasetModal}
            >
              Ajouter un Dataset
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={openModelsModal}
            >
              Explorer les Modèles
            </button>
          </div>
        )}
      </div>

      {/* Affichage conditionnel des modals */}
      {showProjectModal && (
        <CreateProjectModal onClose={() => setShowProjectModal(false)} />
      )}
      {showDatasetModal && (
        <CreateDatasetModal onClose={() => setShowDatasetModal(false)} />
      )}
      {showModelsModal && (
        <ExploreModelsModal onClose={() => setShowModelsModal(false)} />
      )}
    </div>
  );
};

export default HomePage;

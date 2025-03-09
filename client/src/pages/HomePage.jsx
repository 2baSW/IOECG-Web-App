import { useState, useEffect } from "react";
import plusIcon from "../assets/plus.png"; 
import CreateProjectModal from "../components/CreateProjectModal";
import CreateDatasetModal from "../components/CreateDatasetModal";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDatasetModal, setShowDatasetModal] = useState(false);

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

  const toggleCreateMenu = () => setShowCreateMenu(!showCreateMenu);

  const openProjectModal = () => {
    setShowProjectModal(true);
    setShowCreateMenu(false);
  };

  const openDatasetModal = () => {
    setShowDatasetModal(true);
    setShowCreateMenu(false);
  };

  return (
    <div className="p-8 relative">
      <h1 className="text-2xl font-bold mb-6">Projets consultés récemment</h1>

      {loading && <div className="text-center py-4">Chargement des projets...</div>}

      {error && (
        <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
          Erreur : {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nom de Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type de Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Créateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                    {project.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                    {project.typeProjet}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                    {project.createur?.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bouton flottant "plus" */}
      <div className="fixed bottom-16 right-6">
        <input
          type="image"
          src={plusIcon}
          alt="Créer"
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition"
          onClick={toggleCreateMenu}
        />
        {showCreateMenu && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-md p-2 w-48">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 whitespace-nowrap"
              onClick={openProjectModal}
            >
              Créer un Projet
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 whitespace-nowrap"
              onClick={openDatasetModal}
            >
              Ajouter un Dataset
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showProjectModal && <CreateProjectModal onClose={() => setShowProjectModal(false)} />}
      {showDatasetModal && <CreateDatasetModal onClose={() => setShowDatasetModal(false)} />}
    </div>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import CreateDatasetModal from "../components/CreateDatasetModal";
import plusIcon from "../assets/plus.png";

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Contrôle du modal de détails
  const [selectedProject, setSelectedProject] = useState(null);

  // Contrôle du menu (bouton plus)
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDatasetModal, setShowDatasetModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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

  // Ouvrir/fermer le menu du bouton plus
  const toggleCreateMenu = () => {
    setShowCreateMenu(!showCreateMenu);
  };

  const handleOpenProjectModal = () => {
    setShowProjectModal(true);
    setShowCreateMenu(false);
  };

  const handleOpenDatasetModal = () => {
    setShowDatasetModal(true);
    setShowCreateMenu(false);
  };

  // Ouvrir le modal de détails
  const handleShowDetails = (project) => {
    setSelectedProject(project);
  };

  // Fermer le modal de détails
  const handleCloseDetails = () => {
    setSelectedProject(null);
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

      {/* Tableau scrollable */}
      {!loading && !error && projects.length > 0 && (
        <div className="overflow-y-auto max-h-[70vh] rounded-lg border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
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
                  Détails
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
                    {project.createurNom} {project.createurPrenom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="text-blue-600 hover:text-blue-900 underline"
                      onClick={() => handleShowDetails(project)}
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bouton flottant plus */}
      <div className="fixed bottom-6 right-6 z-50">
        <img
          id = "PlusButton"
          src={plusIcon}
          alt="Créer"
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition cursor-pointer"
          onClick={toggleCreateMenu}
        />
        {showCreateMenu && (
          <div className="absolute bottom-16 right-0 bg-white border rounded shadow-md p-2 w-48">
            <button
              id = "CreateProjectButton"
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleOpenProjectModal}
            >
              Créer un Projet
            </button>
            <button
              id = "AddDadasetButton"
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleOpenDatasetModal}
            >
              Ajouter un Dataset
            </button>
          </div>
        )}
      </div>

      {/* Modals : Création Projet / Dataset */}
      {showProjectModal && (
        <CreateProjectModal onClose={() => setShowProjectModal(false)} />
      )}
      {showDatasetModal && (
        <CreateDatasetModal onClose={() => setShowDatasetModal(false)} />
      )}

      {/* Modal de Détails */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 max-h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Détails du projet</h2>
            <p className="mb-2">
              <strong>Nom :</strong> {selectedProject.nom}
            </p>
            <p className="mb-2">
              <strong>Description :</strong> {selectedProject.description}
            </p>
            <p className="mb-2">
              <strong>Date de création :</strong>{" "}
              {selectedProject.dateCreation
                ? new Date(selectedProject.dateCreation).toLocaleString()
                : "N/A"}
            </p>
            <p className="mb-2">
              <strong>Type de projet :</strong> {selectedProject.typeProjet}
            </p>
            <p className="mb-4">
              <strong>Créateur :</strong>{" "}
              {selectedProject.createurNom} {selectedProject.createurPrenom}
            </p>

            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
              onClick={handleCloseDetails}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

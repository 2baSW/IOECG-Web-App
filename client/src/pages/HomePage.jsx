import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import CreateDatasetModal from "../components/CreateDatasetModal";
import plusIcon from "../assets/plus.png";

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDatasetModal, setShowDatasetModal] = useState(false);

  const loggedUserId = parseInt(sessionStorage.getItem("userId"));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/projects");
        if (!response.ok) throw new Error("Serveur indisponible");
        const data = await response.json();
        // Filtrer pour ne conserver que les projets où l'utilisateur connecté est collaborateur
        const filteredProjects = data.filter(
          (project) =>
            project.collaborators &&
            project.collaborators.some((collab) => collab.id === loggedUserId)
        );
        setProjects(filteredProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [loggedUserId]);

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

  return (
    <div className="pt-4 pb-8 px-4 relative">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-bold text-center">Mes Projets</h1>
      </div>

      {loading && (
        <div className="text-center py-4">Chargement des projets...</div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Erreur : {error}
        </div>
      )}
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
                  Date de Création
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    <Link
                      to={`/projects/${project.id}`}
                      className="underline hover:text-blue-800"
                    >
                      {project.nom}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.typeProjet}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.createurNom} {project.createurPrenom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.dateCreation).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bouton plus flottant */}
      <div className="fixed bottom-6 right-6 z-50">
        <img
          src={plusIcon}
          alt="Créer"
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition cursor-pointer"
          onClick={toggleCreateMenu}
        />
        {showCreateMenu && (
          <div className="absolute bottom-16 right-0 bg-white border rounded shadow-md p-2 w-48">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleOpenProjectModal}
            >
              Créer un Projet
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleOpenDatasetModal}
            >
              Ajouter un Dataset
            </button>
          </div>
        )}
      </div>

      {/* Modales */}
      {showProjectModal && (
        <CreateProjectModal onClose={() => setShowProjectModal(false)} />
      )}
      {showDatasetModal && (
        <CreateDatasetModal onClose={() => setShowDatasetModal(false)} />
      )}
    </div>
  );
}

export default HomePage;

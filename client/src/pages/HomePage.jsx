import { useState, useEffect } from "react";

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleMoreInfo = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Projets consultés récemment</h1>

      {loading && <div className="text-center py-4">Chargement des projets...</div>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
          Erreur : {error}
        </div>
      )}

      {!loading && !error && projects.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom du Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plus d’informations
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
                    {project.createurNom && project.createurPrenom
                      ? `${project.createurNom} ${project.createurPrenom}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="text-blue-600 hover:text-blue-800 underline"
                      onClick={() => handleMoreInfo(project)}
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && !error && <p>Aucun projet trouvé</p>
      )}

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
              {selectedProject.createurNom && selectedProject.createurPrenom
                ? `${selectedProject.createurNom} ${selectedProject.createurPrenom}`
                : "N/A"}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
              onClick={closeModal}
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

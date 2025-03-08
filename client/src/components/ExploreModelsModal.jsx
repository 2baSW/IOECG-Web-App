import { useState, useEffect } from "react";

function ExploreModelsModal({ onClose }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/models");
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des modèles");
        const data = await response.json();
        setModels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  // Filtrer les modèles selon le champ de recherche
  const filteredModels = models.filter((model) => {
    const query = searchQuery.toLowerCase();
    return (
      model.nom.toLowerCase().includes(query) ||
      (model.version && model.version.toLowerCase().includes(query)) ||
      (model.description && model.description.toLowerCase().includes(query))
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Explorer les Modèles</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            Fermer
          </button>
        </div>

        {/* Champ de recherche */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {loading && <div>Chargement...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Nom</th>
                  <th className="border p-2 text-left">Version</th>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Date de Création</th>
                </tr>
              </thead>
              <tbody>
                {filteredModels.map((model) => (
                  <tr key={model.id}>
                    <td className="border p-2">{model.id}</td>
                    <td className="border p-2">{model.nom}</td>
                    <td className="border p-2">{model.version}</td>
                    <td className="border p-2">{model.description}</td>
                    <td className="border p-2">
                      {new Date(model.dateCreation).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreModelsModal;

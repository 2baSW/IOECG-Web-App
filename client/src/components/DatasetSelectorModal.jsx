import { useState, useEffect } from "react";

function DatasetSelectorModal({ onClose, onSelect }) {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/datasets");
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error("Erreur lors du chargement des datasets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatasets();
  }, []);

  const filteredDatasets = datasets.filter((d) =>
    d.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-11/12 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Explorer les Datasets</h2>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="overflow-y-auto max-h-64">
            {filteredDatasets.length > 0 ? (
              filteredDatasets.map((dataset) => (
                <div
                  key={dataset.id}
                  className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => { onSelect(dataset); onClose(); }}
                >
                  {dataset.nom}
                </div>
              ))
            ) : (
              <p>Aucun dataset trouvé</p>
            )}
          </div>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded">
          Fermer
        </button>
      </div>
    </div>
  );
}

export default DatasetSelectorModal;

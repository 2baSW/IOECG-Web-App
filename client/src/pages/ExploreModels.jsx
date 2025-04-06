import { useState, useEffect, useMemo } from "react";

const ExploreModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Etat pour les filtres par colonne
  const [filters, setFilters] = useState({
    nom: "",
    version: "",
    description: "",
    dateCreation: "",
  });
  // Etat pour le tri
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

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

  // Filtrer les modèles selon les filtres par colonne
  const filteredModels = models.filter((model) => {
    for (let key in filters) {
      if (filters[key]) {
        let value = model[key];
        // Pour la date, on convertit en chaîne lisible
        if (key === "dateCreation") {
          value = new Date(value).toLocaleString();
        }
        if (!value.toString().toLowerCase().includes(filters[key].toLowerCase())) {
          return false;
        }
      }
    }
    return true;
  });

  // Tri sur les modèles filtrés
  const sortedModels = useMemo(() => {
    const sortableModels = [...filteredModels];
    if (sortConfig.key !== null) {
      sortableModels.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "dateCreation") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          if (typeof aValue === "string") aValue = aValue.toLowerCase();
          if (typeof bValue === "string") bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableModels;
  }, [filteredModels, sortConfig]);

  // Gérer le clic sur un en-tête pour trier
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Indicateur visuel pour le tri
  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  // Mettre à jour le filtre pour une colonne donnée
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Catalogue des modèles</h2>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              {/* Ligne d'en-têtes pour le tri */}
              <tr>
                <th
                  className="border p-2 text-left cursor-pointer select-none"
                  onClick={() => handleSort("nom")}
                >
                  Nom{renderSortArrow("nom")}
                </th>
                <th
                  className="border p-2 text-left cursor-pointer select-none"
                  onClick={() => handleSort("version")}
                >
                  Version{renderSortArrow("version")}
                </th>
                <th
                  className="border p-2 text-left cursor-pointer select-none"
                  onClick={() => handleSort("description")}
                >
                  Description{renderSortArrow("description")}
                </th>
                <th
                  className="border p-2 text-left cursor-pointer select-none"
                  onClick={() => handleSort("dateCreation")}
                >
                  Date de Création{renderSortArrow("dateCreation")}
                </th>
              </tr>
              {/* Ligne de filtres par colonne */}
              <tr>
                <th className="border p-2">
                  <input
                    type="text"
                    placeholder="Filtrer"
                    value={filters.nom}
                    onChange={(e) => handleFilterChange("nom", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </th>
                <th className="border p-2">
                  <input
                    type="text"
                    placeholder="Filtrer"
                    value={filters.version}
                    onChange={(e) => handleFilterChange("version", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </th>
                <th className="border p-2">
                  <input
                    type="text"
                    placeholder="Filtrer"
                    value={filters.description}
                    onChange={(e) => handleFilterChange("description", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </th>
                <th className="border p-2">
                  <input
                    type="text"
                    placeholder="Filtrer"
                    value={filters.dateCreation}
                    onChange={(e) => handleFilterChange("dateCreation", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedModels.map((model) => (
                <tr key={model.id}>
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
  );
};

export default ExploreModels;

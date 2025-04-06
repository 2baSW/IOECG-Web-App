import { useState, useEffect, useMemo } from "react";

const ExploreModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- Recherche globale ---
  const [searchQuery, setSearchQuery] = useState("");

  // --- Filtres par colonne ---
  const [columnFilters, setColumnFilters] = useState({
    nom: "",
    version: "",
    description: "",
    dateCreation: "",
  });

  // --- Configuration du tri (asc, desc, etc.) ---
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  // Gère le clic sur l'en-tête pour trier
  const handleSort = (columnKey) => {
    // Si on reclique sur la même colonne
    if (sortConfig.key === columnKey) {
      // On bascule la direction : asc -> desc -> pas de tri
      if (sortConfig.direction === "asc") {
        setSortConfig({ key: columnKey, direction: "desc" });
      } else if (sortConfig.direction === "desc") {
        // Troisième clic: on enlève le tri
        setSortConfig({ key: null, direction: "asc" });
      } else {
        // Retour à asc
        setSortConfig({ key: columnKey, direction: "asc" });
      }
    } else {
      // Première fois qu'on trie cette colonne
      setSortConfig({ key: columnKey, direction: "asc" });
    }
  };

  // Met à jour les filtres de colonne
  const handleColumnFilterChange = (columnKey, value) => {
    setColumnFilters((prev) => ({ ...prev, [columnKey]: value }));
  };

  // Filtrage global + par colonne
  const filteredModels = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return models.filter((model) => {
      // --- Filtre global ---
      const passesGlobalFilter =
        query === "" ||
        model.nom?.toLowerCase().includes(query) ||
        model.version?.toLowerCase().includes(query) ||
        model.description?.toLowerCase().includes(query);

      if (!passesGlobalFilter) return false;

      // --- Filtres par colonne ---
      // Filtre "Nom"
      if (
        columnFilters.nom &&
        !model.nom?.toLowerCase().includes(columnFilters.nom.toLowerCase())
      ) {
        return false;
      }
      // Filtre "Version"
      if (
        columnFilters.version &&
        !model.version
          ?.toLowerCase()
          .includes(columnFilters.version.toLowerCase())
      ) {
        return false;
      }
      // Filtre "Description"
      if (
        columnFilters.description &&
        !model.description
          ?.toLowerCase()
          .includes(columnFilters.description.toLowerCase())
      ) {
        return false;
      }
      // Filtre "Date de création" (filtrage textuel simplifié)
      const dateText = new Date(model.dateCreation).toLocaleString().toLowerCase();
      if (
        columnFilters.dateCreation &&
        !dateText.includes(columnFilters.dateCreation.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [models, searchQuery, columnFilters]);

  // Trier la liste filtrée
  const sortedModels = useMemo(() => {
    if (!sortConfig.key) return filteredModels;

    const sorted = [...filteredModels].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Tri par date
      if (sortConfig.key === "dateCreation") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      // Pour gérer des valeurs undefined ou null
      if (aVal == null) aVal = "";
      if (bVal == null) bVal = "";

      // Pour un tri textuel (nom, version, description), on compare en minuscule
      if (sortConfig.key !== "dateCreation") {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredModels, sortConfig]);

  // Affiche un indicateur (flèche) selon l'état du tri
  const renderSortIndicator = (columnKey) => {
    if (sortConfig.key !== columnKey) return null;
    if (sortConfig.direction === "asc") {
      return <span className="ml-1">▲</span>;
    } else if (sortConfig.direction === "desc") {
      return <span className="ml-1">▼</span>;
    }
    return null;
  };

  return (
    <div className="pt-4 pb-8 px-4">
      {/* Conteneur pour centrer le titre */}
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-2xl font-bold text-center">Catalogue des modèles</h2>
      </div>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="overflow-auto max-h-[70vh] rounded-lg border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              {/* --- Ligne d'en-têtes (pour le tri) --- */}
              <tr>
                <th
                  onClick={() => handleSort("nom")}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                >
                  Nom {renderSortIndicator("nom")}
                </th>
                <th
                  onClick={() => handleSort("version")}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                >
                  Version {renderSortIndicator("version")}
                </th>
                <th
                  onClick={() => handleSort("description")}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                >
                  Description {renderSortIndicator("description")}
                </th>
                <th
                  onClick={() => handleSort("dateCreation")}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                >
                  Date de Création {renderSortIndicator("dateCreation")}
                </th>
              </tr>

              {/* --- Ligne de filtres par colonne --- */}
              <tr className="bg-gray-100">
                <th className="px-6 py-2">
                  <input
                    type="text"
                    placeholder="Filtrer Nom..."
                    value={columnFilters.nom}
                    onChange={(e) =>
                      handleColumnFilterChange("nom", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </th>
                <th className="px-6 py-2">
                  <input
                    type="text"
                    placeholder="Filtrer Version..."
                    value={columnFilters.version}
                    onChange={(e) =>
                      handleColumnFilterChange("version", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </th>
                <th className="px-6 py-2">
                  <input
                    type="text"
                    placeholder="Filtrer Description..."
                    value={columnFilters.description}
                    onChange={(e) =>
                      handleColumnFilterChange("description", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </th>
                <th className="px-6 py-2">
                  <input
                    type="text"
                    placeholder="Filtrer Date..."
                    value={columnFilters.dateCreation}
                    onChange={(e) =>
                      handleColumnFilterChange("dateCreation", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedModels.map((model) => (
                <tr key={model.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {model.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {model.version}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-normal">
                    {model.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(model.dateCreation).toLocaleString()}
                  </td>
                </tr>
              ))}
              {sortedModels.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    Aucun modèle ne correspond aux filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExploreModels;

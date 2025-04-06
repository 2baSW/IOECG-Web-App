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
    if (sortConfig.key === columnKey) {
      // Cycle asc -> desc -> aucun tri
      if (sortConfig.direction === "asc") {
        setSortConfig({ key: columnKey, direction: "desc" });
      } else if (sortConfig.direction === "desc") {
        // Troisième clic => on retire le tri
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
      // Nom
      if (
        columnFilters.nom &&
        !model.nom?.toLowerCase().includes(columnFilters.nom.toLowerCase())
      ) {
        return false;
      }
      // Version
      if (
        columnFilters.version &&
        !model.version?.toLowerCase().includes(columnFilters.version.toLowerCase())
      ) {
        return false;
      }
      // Description
      if (
        columnFilters.description &&
        !model.description
          ?.toLowerCase()
          .includes(columnFilters.description.toLowerCase())
      ) {
        return false;
      }
      // Date de création (filtrage textuel simplifié)
      const dateText = new Date(model.dateCreation).toLocaleDateString("fr-FR").toLowerCase();
      if (
        columnFilters.dateCreation &&
        !dateText.includes(columnFilters.dateCreation.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [models, searchQuery, columnFilters]);

  // Trie la liste filtrée
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
      // Pour gérer des valeurs null / undefined
      if (aVal == null) aVal = "";
      if (bVal == null) bVal = "";

      // Tri textuel (nom, version, description)
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

  // Indicateur de tri
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
    // On applique des classes pour le dark mode
    <div className="pt-4 pb-8 px-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Conteneur pour centrer le titre */}
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-2xl font-bold text-center">Catalogue des modèles</h2>
      </div>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-600 dark:text-red-300 mb-4">{error}</div>}

      {!loading && !error && (
        <div className="overflow-auto max-h-[70vh] rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              {/* Ligne d'en-têtes (pour le tri) */}
              <tr>
                <th
                  onClick={() => handleSort("nom")}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer text-gray-600 dark:text-gray-300"
                >
                  Nom {renderSortIndicator("nom")}
                </th>
                <th
                  onClick={() => handleSort("version")}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer text-gray-600 dark:text-gray-300"
                >
                  Version {renderSortIndicator("version")}
                </th>
                <th
                  onClick={() => handleSort("description")}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer text-gray-600 dark:text-gray-300"
                >
                  Description {renderSortIndicator("description")}
                </th>
                <th
                  onClick={() => handleSort("dateCreation")}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer text-gray-600 dark:text-gray-300"
                >
                  Date de Création {renderSortIndicator("dateCreation")}
                </th>
              </tr>

              {/* Ligne de filtres par colonne */}
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-6 py-2">
                  <input
                    type="text"
                    placeholder="Filtrer Nom..."
                    value={columnFilters.nom}
                    onChange={(e) =>
                      handleColumnFilterChange("nom", e.target.value)
                    }
                    className="w-full p-1 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
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
                    className="w-full p-1 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
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
                    className="w-full p-1 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
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
                    className="w-full p-1 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  />
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-600">
              {sortedModels.map((model) => (
                <tr key={model.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {model.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {model.version}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-gray-100">
                    {model.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(model.dateCreation).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
              {sortedModels.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-300"
                  >
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

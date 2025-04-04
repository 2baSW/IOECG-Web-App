import { useState, useEffect } from "react";
import DatasetSelectorModal from "./DatasetSelectorModal";
import ModelSelectorModal from "./ModelSelectorModal";
import CollaboratorSelectorModal from "./CollaboratorSelectorModal";

function CreateProjectModal({ onClose }) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [typeProjet, setTypeProjet] = useState("Analyse");
  const [message, setMessage] = useState("");

  // Sélections pour associations
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  // Chaque collaborateur aura la forme { id, nom, prenom, email, admin }
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  // Contrôle des modaux d'exploration
  const [showDatasetSelector, setShowDatasetSelector] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showCollaboratorSelector, setShowCollaboratorSelector] = useState(false);

  // Fonction pour modifier le droit admin d'un collaborateur sélectionné
  const toggleCollaboratorAdmin = (collabId) => {
    setSelectedCollaborators(prev =>
      prev.map((collab) =>
        collab.id === collabId ? { ...collab, admin: !collab.admin } : collab
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_createur = parseInt(sessionStorage.getItem("userId"));

    // Assurez-vous d'ajouter le créateur comme collaborateur avec admin true s'il n'est pas déjà présent
    const creatorAlreadySelected = selectedCollaborators.some(
      (collab) => collab.id === id_createur
    );
    let collaboratorsFinal = [...selectedCollaborators];
    if (!creatorAlreadySelected) {
      // On suppose que le front récupère aussi le nom/prénom du créateur via son profil (ici simplifié)
      const creator = {
        id: id_createur,
        // Pour l'affichage, on peut récupérer ces infos via sessionStorage ou autre,
        // ici on met des valeurs par défaut.
        nom: sessionStorage.getItem("userNom") || "",
        prenom: sessionStorage.getItem("userPrenom") || "",
        admin: true,
      };
      collaboratorsFinal = [creator, ...collaboratorsFinal];
    } else {
      // Si le créateur est déjà présent, on force admin à true
      collaboratorsFinal = collaboratorsFinal.map((collab) =>
        collab.id === id_createur ? { ...collab, admin: true } : collab
      );
    }

    const projectDTO = {
      nom,
      description,
      typeProjet,
      id_createur,
      datasets: selectedDatasets.map((d) => d.id),
      models: selectedModels.map((m) => m.id),
      collaborators: collaboratorsFinal.map((u) => ({ id: u.id, admin: u.admin })),
    };

    console.log("Sending projectDTO:", JSON.stringify(projectDTO));

    try {
      const response = await fetch("http://localhost:8080/api/projects/full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectDTO),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création du projet");
      }
      setMessage("Projet créé avec succès !");
      // Réinitialiser le formulaire et les sélections
      setNom("");
      setDescription("");
      setTypeProjet("Analyse");
      setSelectedDatasets([]);
      setSelectedModels([]);
      setSelectedCollaborators([]);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white text-gray-800 p-6 rounded shadow-md w-96 max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Créer un Projet</h2>

        {message && (
          <div className="bg-green-100 text-green-700 border border-green-400 p-2 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="mb-4">
            <label htmlFor="projectName" className="block font-semibold mb-1">
              Nom du Projet *
            </label>
            <input
              id="projectName"
              type="text"
              className="w-full p-2 border rounded"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="projectDescription" className="block font-semibold mb-1">
              Description du Projet *
            </label>
            <textarea
              id="projectDescription"
              className="w-full p-2 border rounded"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {/* Type de projet */}
          <div className="mb-4">
            <label htmlFor="projectType" className="block font-semibold mb-1">
              Type de Projet *
            </label>
            <select
              id="projectType"
              className="w-full p-2 border rounded"
              value={typeProjet}
              onChange={(e) => {
                setTypeProjet(e.target.value);
                setSelectedModels([]); // Réinitialiser les modèles si changement de type
              }}
            >
              <option value="Analyse">Analyse</option>
              <option value="Expérience">Expérience</option>
            </select>
          </div>
          {/* Sélection du Dataset */}
          <div className="mb-4">
            <label htmlFor="datasetSelector" className="block font-semibold mb-1">
              Sélectionner le Dataset *
            </label>
            <button
              id="datasetSelector"
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => setShowDatasetSelector(true)}
            >
              Explorer les Datasets
            </button>
            <div className="mt-2">
              {selectedDatasets.length > 0 ? (
                selectedDatasets.map((ds) => (
                  <div
                    key={ds.id}
                    className="p-1 border rounded mb-1 flex justify-between items-center"
                  >
                    <span>{ds.nom}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDatasets(
                          selectedDatasets.filter((d) => d.id !== ds.id)
                        )
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                ))
              ) : (
                <p>Aucun dataset sélectionné</p>
              )}
            </div>
          </div>
          {/* Sélection du Modèle */}
          <div className="mb-4">
            <label htmlFor="modelSelector" className="block font-semibold mb-1">
              Sélectionner modèle(s) *{" "}
              {typeProjet === "Expérience" && "(1 seul modèle)"}
            </label>
            <button
              id="modelSelector"
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => setShowModelSelector(true)}
            >
              Explorer les Modèles
            </button>
            <div className="mt-2">
              {selectedModels.length > 0 ? (
                selectedModels.map((m) => (
                  <div
                    key={m.id}
                    className="p-1 border rounded mb-1 flex justify-between items-center"
                  >
                    <span>{m.nom}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedModels(
                          selectedModels.filter((model) => model.id !== m.id)
                        )
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                ))
              ) : (
                <p>Aucun modèle sélectionné</p>
              )}
            </div>
          </div>
          {/* Sélection des Collaborateurs */}
          <div className="mb-4">
            <label htmlFor="collaboratorSelector" className="block font-semibold mb-1">
              Sélectionner collaborateur(s)
            </label>
            <button
              id="collaboratorSelector"
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => setShowCollaboratorSelector(true)}
            >
              Explorer les Collaborateurs
            </button>
            <div className="mt-2">
              {selectedCollaborators.length > 0 ? (
                selectedCollaborators.map((c) => (
                  <div
                    key={c.id}
                    className="p-1 border rounded mb-1 flex justify-between items-center"
                  >
                    <span>
                      {c.nom} {c.prenom}
                    </span>
                    {/* Checkbox pour définir le rôle admin */}
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={c.admin}
                        onChange={() => toggleCollaboratorAdmin(c.id)}
                        className="form-checkbox"
                      />
                      <span className="text-xs">Admin</span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCollaborators(
                          selectedCollaborators.filter(
                            (collab) => collab.id !== c.id
                          )
                        )
                      }
                      className="ml-2 text-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                ))
              ) : (
                <p>Aucun collaborateur sélectionné</p>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
              id="cancelButton"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              id="submitButton"
            >
              Créer
            </button>
          </div>
        </form>
      </div>

      {/* Modaux d'exploration */}
      {showDatasetSelector && (
        <DatasetSelectorModal
          onClose={() => setShowDatasetSelector(false)}
          onSelect={(dataset) => {
            if (!selectedDatasets.find((d) => d.id === dataset.id)) {
              setSelectedDatasets([...selectedDatasets, dataset]);
            }
          }}
        />
      )}
      {showModelSelector && (
        <ModelSelectorModal
          typeProjet={typeProjet}
          onClose={() => setShowModelSelector(false)}
          onSelect={(model) => {
            if (typeProjet === "Expérience" && selectedModels.length >= 1) {
              alert("Pour un projet de type Expérience, vous ne pouvez sélectionner qu'un seul modèle.");
              return;
            }
            if (!selectedModels.find((m) => m.id === model.id)) {
              setSelectedModels([...selectedModels, model]);
            }
          }}
        />
      )}
      {showCollaboratorSelector && (
        <CollaboratorSelectorModal
          onClose={() => setShowCollaboratorSelector(false)}
          onSelect={(user) => {
            if (!selectedCollaborators.find((c) => c.id === user.id)) {
              // Par défaut, admin est false pour les collaborateurs sélectionnés
              setSelectedCollaborators([...selectedCollaborators, { ...user, admin: false }]);
            }
          }}
        />
      )}
    </div>
  );
}

export default CreateProjectModal;
import { useState } from "react";

function CreateDatasetModal({ onClose }) {
  const [nom, setNom] = useState("");
  const [fichier, setFichier] = useState("");
  const [message, setMessage] = useState("");

  // Gestion de la sélection d'un fichier JSON
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.includes("json")) {
        setMessage("Veuillez sélectionner un fichier JSON valide.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFichier(event.target.result);
      };
      reader.onerror = (error) => {
        console.error("Erreur lors de la lecture du fichier:", error);
        setMessage("Erreur lors de la lecture du fichier.");
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedFichier = fichier
      .replace(/\u00A0/g, "")
      .replace(/\u202F/g, "");

    try {
      JSON.parse(cleanedFichier);
    } catch (error) {
      setMessage("Le contenu du fichier n'est pas un JSON valide.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/datasets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          fichier: cleanedFichier, 
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création du dataset");
      }
      // Fermer la modale et afficher un message de succès
      onClose();
      window.alert("Dataset créé avec succès !");
      window.location.reload();

    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Ajouter un Dataset</h2>

        {message && (
          <div className="bg-green-100 text-green-700 border border-green-400 p-2 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Nom du Dataset</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Fichier JSON</label>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="mb-2"
            />
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              value={fichier}
              onChange={(e) => setFichier(e.target.value)}
              placeholder='{"exemple": "valeur"}'
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDatasetModal;

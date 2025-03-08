import { useState } from "react";

function CreateProjectModal({ onClose }) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [typeProjet, setTypeProjet] = useState("Analyse");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          description,
          typeProjet,
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création du projet");
      }
      setMessage("Projet créé avec succès !");
      setNom("");
      setDescription("");
      setTypeProjet("Analyse");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Créer un Projet</h2>

        {message && (
          <div className="bg-green-100 text-green-700 border border-green-400 p-2 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Nom du Projet</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Type de Projet</label>
            <select
              className="w-full p-2 border rounded"
              value={typeProjet}
              onChange={(e) => setTypeProjet(e.target.value)}
            >
              <option value="Analyse">Analyse</option>
              <option value="Expérience">Expérience</option>
            </select>
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

export default CreateProjectModal;

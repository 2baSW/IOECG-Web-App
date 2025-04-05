import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ModelSelectorModal from "../components/ModelSelectorModal";
import DatasetSelectorModal from "../components/DatasetSelectorModal";
import CollaboratorSelectorModal from "../components/CollaboratorSelectorModal";

function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedUserId = parseInt(sessionStorage.getItem("userId"));

  // Contrôle des modaux pour assigner de nouveaux éléments
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showDatasetSelector, setShowDatasetSelector] = useState(false);
  const [showCollaboratorSelector, setShowCollaboratorSelector] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/projects/${id}/full`);
        if (!response.ok) throw new Error("Projet introuvable ou serveur indisponible");
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id]);

  if (loading) return <div className="p-8">Chargement du projet...</div>;
  if (error) return <div className="p-8 bg-red-100 text-red-700">{error}</div>;
  if (!project) return <div className="p-8">Projet introuvable</div>;

  // Détermine si l'utilisateur connecté est le créateur ou un collaborateur admin
  const isCreator = project.createurId && loggedUserId === project.createurId;
  let isAdmin = isCreator;
  if (!isAdmin && project.collaborators) {
    const me = project.collaborators.find((c) => c.id === loggedUserId);
    if (me && me.admin) isAdmin = true;
  }

  // Filtrer les collaborateurs pour ne pas afficher l'utilisateur connecté
  const displayedCollaborators = project.collaborators
    ? project.collaborators.filter((c) => c.id !== loggedUserId)
    : [];

  const handleRemoveModel = async (modelId) => {
    if (!window.confirm("Supprimer ce modèle du projet ?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${project.id}/models/${modelId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression du modèle");
      setProject({
        ...project,
        modeles: project.modeles.filter((m) => m.id !== modelId),
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAssignModel = async (model) => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${project.id}/models`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId: model.id }),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout du modèle");
      setProject({ ...project, modeles: [...project.modeles, model] });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRemoveDataset = async (datasetId) => {
    if (!window.confirm("Supprimer ce dataset du projet ?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${project.id}/datasets/${datasetId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression du dataset");
      setProject({
        ...project,
        datasets: project.datasets.filter((ds) => ds.id !== datasetId),
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAssignDataset = async (dataset) => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${project.id}/datasets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datasetId: dataset.id }),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout du dataset");
      setProject({ ...project, datasets: [...project.datasets, dataset] });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRemoveCollaborator = async (collabId) => {
    if (!window.confirm("Supprimer ce collaborateur du projet ?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/project-collaborators/${project.id}/${collabId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression du collaborateur");
      setProject({
        ...project,
        collaborators: project.collaborators.filter((c) => c.id !== collabId),
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAssignCollaborator = async (user) => {
    try {
      const payload = { utilisateurId: user.id, admin: false };
      const response = await fetch(`http://localhost:8080/api/projects/${project.id}/collaborators`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout du collaborateur");
      setProject({
        ...project,
        collaborators: [...project.collaborators, { ...user, admin: false }],
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleCollaboratorAdmin = async (collabId, currentAdmin) => {
    if (collabId === project.createurId) {
      alert("Vous ne pouvez pas modifier les droits du créateur.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/project-collaborators/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projetId: project.id,
          utilisateurId: collabId,
          admin: !currentAdmin
        }),
      });
      if (!response.ok) throw new Error("Impossible de mettre à jour le droit admin");
      setProject({
        ...project,
        collaborators: project.collaborators.map((c) =>
          c.id === collabId ? { ...c, admin: !currentAdmin } : c
        ),
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProject = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce projet ?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${project.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression du projet");
      alert("Projet supprimé avec succès");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8">
      <Link to="/" className="underline text-blue-600 mb-4 inline-block">← Retour</Link>
      <h1 className="text-2xl font-bold mb-4">{project.nom}</h1>
      <p className="mb-2"><strong>Créateur :</strong> {project.createurNom} {project.createurPrenom}</p>
      <p className="mb-2"><strong>Date de création :</strong> {new Date(project.dateCreation).toLocaleDateString()}</p>
      <p className="mb-2"><strong>Type :</strong> {project.typeProjet}</p>
      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2">Description :</h2>
        <p>{project.description}</p>
      </div>

      {/* Collaborateurs */}
      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2">Collaborateurs :</h2>
        {displayedCollaborators && displayedCollaborators.length > 0 ? (
          <ul>
            {displayedCollaborators.map((c) => (
              <li key={c.id} className="flex items-center space-x-2">
                <span>{c.nom} {c.prenom} - {c.email}</span>
                <span>({c.admin ? "Admin" : "Collaborateur"})</span>
                {isAdmin && (
                  <>
                    <button
                      onClick={() => handleToggleCollaboratorAdmin(c.id, c.admin)}
                      className="underline text-blue-600 text-xs"
                    >
                      {c.admin ? "Retirer admin" : "Rendre admin"}
                    </button>
                    <button
                      onClick={() => handleRemoveCollaborator(c.id)}
                      className="underline text-red-600 text-xs"
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun collaborateur</p>
        )}
        {isAdmin && (
          <button
            onClick={() => setShowCollaboratorSelector(true)}
            className="mt-2 px-4 py-2 bg-gray-200 rounded"
          >
            Ajouter un collaborateur
          </button>
        )}
      </div>

      {/* Modèles */}
      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2">Modèles :</h2>
        {project.modeles && project.modeles.length > 0 ? (
          <ul>
            {project.modeles.map((m) => (
              <li key={m.id} className="flex items-center space-x-2">
                <span>{m.nom} {m.version && `- v${m.version}`}</span>
                {isAdmin && (
                  <button
                    onClick={() => handleRemoveModel(m.id)}
                    className="underline text-red-600 text-xs"
                  >
                    Supprimer
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun modèle</p>
        )}
        {isAdmin && (
          <button
            onClick={() => setShowModelSelector(true)}
            className="mt-2 px-4 py-2 bg-gray-200 rounded"
          >
            Ajouter un modèle
          </button>
        )}
      </div>

      {/* Datasets */}
      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2">Datasets :</h2>
        {project.datasets && project.datasets.length > 0 ? (
          <ul>
            {project.datasets.map((ds) => (
              <li key={ds.id} className="flex items-center space-x-2">
                <span>{ds.nom}</span>
                {isAdmin && (
                  <button
                    onClick={() => handleRemoveDataset(ds.id)}
                    className="underline text-red-600 text-xs"
                  >
                    Supprimer
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun dataset</p>
        )}
        {isAdmin && (
          <button
            onClick={() => setShowDatasetSelector(true)}
            className="mt-2 px-4 py-2 bg-gray-200 rounded"
          >
            Ajouter un dataset
          </button>
        )}
      </div>

      {isAdmin && (
        <div className="mt-6">
          <button
            onClick={handleDeleteProject}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Supprimer le projet
          </button>
        </div>
      )}

      {/* Modaux d'assignation */}
      {showModelSelector && (
        <ModelSelectorModal
          onClose={() => setShowModelSelector(false)}
          onSelect={(model) => {
            if (!project.modeles.some((m) => m.id === model.id)) {
              handleAssignModel(model);
            }
            setShowModelSelector(false);
          }}
        />
      )}
      {showDatasetSelector && (
        <DatasetSelectorModal
          onClose={() => setShowDatasetSelector(false)}
          onSelect={(dataset) => {
            if (!project.datasets.some((ds) => ds.id === dataset.id)) {
              handleAssignDataset(dataset);
            }
            setShowDatasetSelector(false);
          }}
        />
      )}
      {showCollaboratorSelector && (
        <CollaboratorSelectorModal
          onClose={() => setShowCollaboratorSelector(false)}
          onSelect={(user) => {
            if (!project.collaborators.some((c) => c.id === user.id)) {
              handleAssignCollaborator(user);
            }
            setShowCollaboratorSelector(false);
          }}
        />
      )}
    </div>
  );
}

export default ProjectDetailsPage;

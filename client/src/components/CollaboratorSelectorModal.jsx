import { useState, useEffect } from "react";

function CollaboratorSelectorModal({ onClose, onSelect }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const loggedUserId = parseInt(sessionStorage.getItem("userId"));
  const filteredUsers = users
    .filter((user) => user.id !== loggedUserId)
    .filter((user) =>
      `${user.nom} ${user.prenom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-11/12 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Explorer les Collaborateurs</h2>
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => { onSelect(user); onClose(); }}
                >
                  {user.nom} {user.prenom} - {user.email}
                </div>
              ))
            ) : (
              <p>Aucun utilisateur trouvé</p>
            )}
          </div>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded">Fermer</button>
      </div>
    </div>
  );
}

export default CollaboratorSelectorModal;

import { useState, useEffect } from "react";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const email = localStorage.getItem("userEmail");
            if (!email) {
                setError("Utilisateur non connecté.");
                return;
            }
            try {
                const response = await fetch(`http://localhost:8080/api/users/email/${email}`);
                if (!response.ok) throw new Error("Impossible de récupérer les données de l'utilisateur");
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    const handleUpdatePassword = async () => {
        if (!user) return;

        try {
            const response = await fetch(`http://localhost:8080/api/users/${user.id}/password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour du mot de passe");

            setSuccess("Mot de passe mis à jour avec succès !");
            setError(null);
            setNewPassword("");
        } catch (err) {
            setSuccess(null);
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-4 border rounded shadow-md bg-white">
            <h1 className="text-2xl font-bold text-center mb-4">Mon Profil</h1>

            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{success}</div>}

            {user && (
                <div>
                    <label className="block font-semibold mb-1">Nom</label>
                    <input type="text" className="w-full p-2 border rounded mb-4" value={user.nom} disabled />

                    <label className="block font-semibold mb-1">Prénom</label>
                    <input type="text" className="w-full p-2 border rounded mb-4" value={user.prenom} disabled />

                    <label className="block font-semibold mb-1">Email</label>
                    <input type="email" className="w-full p-2 border rounded mb-4" value={user.email} disabled />

                    <label className="block font-semibold mb-1">Nouveau mot de passe</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded mb-4"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Entrez un nouveau mot de passe"
                    />

                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        onClick={handleUpdatePassword}
                    >
                        Mettre à jour
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

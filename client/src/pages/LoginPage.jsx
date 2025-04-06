import { useState } from "react";
import { useNavigate } from "react-router-dom";
import irdLogo from "../assets/IRD.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const user = await response.json();

      // Stocker l'email et l'ID pour l'authentification
      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("userId", user.id);

      // Rediriger vers la page d'accueil
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 border rounded shadow-md bg-white">
      {/* Affichage du logo IRD */}
      <div className="text-center mb-4">
        <img src={irdLogo} alt="Logo IRD" className="mx-auto" style={{ height: "80px" }} />
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 p-2 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

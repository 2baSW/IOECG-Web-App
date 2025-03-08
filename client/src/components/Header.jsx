import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/IRD.png";

import {
    HomeIcon,
    FolderIcon,
    InformationCircleIcon,
    LifebuoyIcon,
    SunIcon,
    MoonIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
    // État pour le mode sombre
    const [darkMode, setDarkMode] = useState(false);
    // État pour le menu utilisateur
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    // État pour savoir si l'utilisateur est authentifié
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Récupérer la localisation (pour éventuellement adapter la navigation)
    const location = useLocation();

    // Vérifier à chaque rendu si l'utilisateur est connecté
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        setIsAuthenticated(email !== null);
    }, [location]); // si la localisation change, on recalcule

    // Bascule mode clair / sombre
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    // Ouvrir / fermer le menu utilisateur
    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    // Logique de déconnexion
    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        window.location.href = "/login";
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                {/* Bloc gauche : logo + titre */}
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                </div>

                {/* Bloc droit : boutons Thème et menu utilisateur */}
                <div className="flex items-center space-x-4 relative">
                    {/* Bouton Thème */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Changer de thème"
                    >
                        {darkMode ? (
                            <SunIcon className="h-6 w-6 text-yellow-400" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
                        )}
                    </button>

                    {isAuthenticated && (
                        // Bouton profil + menu déroulant
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                                title="Menu utilisateur"
                            >
                                <UserIcon className="h-5 w-5 mr-1" />
                                AF
                            </button>
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-md rounded z-10">
                                    <ul className="py-2">
                                        <li>
                                            <Link
                                                to="/profil"
                                                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                Mon Profil
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* --- Seconde rangée : Barre de navigation --- */}
            <nav className="bg-gray-100 dark:bg-gray-700">
                <div className="max-w-7xl mx-auto px-4">
                    <ul className="flex justify-evenly py-2">
                        {isAuthenticated ? (
                            <>
                                {/* Accueil */}
                                <li className="flex flex-col items-center text-gray-600 dark:text-gray-200">
                                    <Link
                                        to="/"
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex flex-col items-center"
                                    >
                                        <HomeIcon className="h-6 w-6 mb-1" />
                                        Accueil
                                    </Link>
                                </li>

                                {/* Mes Projets */}
                                <li className="flex flex-col items-center text-gray-600 dark:text-gray-200">
                                    <Link
                                        to="/mes-projets"
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex flex-col items-center"
                                    >
                                        <FolderIcon className="h-6 w-6 mb-1" />
                                        Mes Projets
                                    </Link>
                                </li>

                                {/* À propos */}
                                <li className="flex flex-col items-center text-gray-600 dark:text-gray-200">
                                    <Link
                                        to="/a-propos"
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex flex-col items-center"
                                    >
                                        <InformationCircleIcon className="h-6 w-6 mb-1" />
                                        À propos
                                    </Link>
                                </li>

                                {/* Support */}
                                <li className="flex flex-col items-center text-gray-600 dark:text-gray-200">
                                    <Link
                                        to="/support"
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex flex-col items-center"
                                    >
                                        <LifebuoyIcon className="h-6 w-6 mb-1" />
                                        Support
                                    </Link>
                                </li>
                            </>
                        ) : (
                            // Si non authentifié, on propose uniquement un lien vers la connexion
                            <li className="flex flex-col items-center text-gray-600 dark:text-gray-200">
                                <Link
                                    to="/login"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex flex-col items-center"
                                >
                                    Se connecter
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import ProfilPage from "./pages/ProfilPage";
import CreateProjectPage from "./pages/CreateProjectPage";

// Import du composant PrivateRoute
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Header />
        <main className="flex-grow container mx-auto px-4">
          <Routes>
            {/* Route publique : /login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Routes protégées : on enveloppe chaque page avec <PrivateRoute> */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/a-propos"
              element={
                <PrivateRoute>
                  <AboutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/support"
              element={
                <PrivateRoute>
                  <SupportPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/creer-projet"
              element={
                <PrivateRoute>
                  <CreateProjectPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profil"
              element={
                <PrivateRoute>
                  <ProfilPage />
                </PrivateRoute>
              }
            />
          </Routes>
          
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

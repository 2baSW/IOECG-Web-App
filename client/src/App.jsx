import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import ProfilPage from "./pages/ProfilPage";
import ExploreModels from "./pages/ExploreModels";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Router>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-4">
          <Routes>
            {/* Route publique pour /login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Routes privées */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/explore-models"
              element={
                <PrivateRoute>
                  <ExploreModels />
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


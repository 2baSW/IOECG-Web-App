import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CreateProjectButton from "./components/CreateProjectButton";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Header />
        <main className="flex-grow container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mes-projets" element={<div>Page Mes Projets</div>} />
            <Route path="/a-propos" element={<div>Page À propos</div>} />
            <Route path="/support" element={<div>Page Support</div>} />
          </Routes>
        </main>
        <Footer style={{ position: "relative" }}>
          <CreateProjectButton />
        </Footer>
      </Router>
      <CreateProjectButton />
    
    </div>
  );
}

export default App;

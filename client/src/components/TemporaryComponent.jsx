import { useState } from "react";
import AnalysePage from "../pages/AnalysePage"

const TemporaryComponent = () => {
    const [show, setShow] = useState(false);
  
    return show ? (
      <AnalysePage />
    ) : (
      <button onClick={() => setShow(true)}>Cliquez pour afficher la page d'analyse</button>
    );
  };

export default TemporaryComponent;

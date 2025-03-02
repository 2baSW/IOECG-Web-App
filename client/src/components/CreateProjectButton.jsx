import plus from "../assets/plus.png";
import { useState } from "react";
import FormCreatingProject from "./FormCreatingProject";

const CreateProjectButton = () => {
  const [showForm, setShowForm] = useState(false);

  const AfficherFormulaire = () => {
    setShowForm(!showForm);
  };
  const position = 
  {
    position: "absolute",
    right: "20px",
    bottom: "120px",
    width: "60px",
  };

  return (
    <>
      <input type="image" src={plus} alt="Créer Projet" style={position} onClick={AfficherFormulaire}/>
      {showForm && <FormCreatingProject />}
    </>
  );
};

export default CreateProjectButton;

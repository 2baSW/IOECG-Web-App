const FormCreatingProject = () => 
    {
    const ArrierePlan = {
      '--form-width': '400px',
      '--form-bg-color': 'white',
      '--overlay-bg-color': 'rgba(0, 0, 0, 0.6)', 
    };
  
    return (
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--overlay-bg-color)', ...ArrierePlan }}
      >
        <div
          className="p-6 shadow-lg rounded-lg"
          style=
          {{
            width: 'var(--form-width)',
            backgroundColor: 'var(--form-bg-color)',
          }}
        >
          <form>
            <div className="grid grid-cols-2 gap-3">
                <div className="text-xl font-extrabold text-gray-500">Nouveau Projet</div>
                <div className="text-[12px] font-extrabold text-gray-500 text-right">  <span className="text-red-500">*</span>champs obligatoire</div>
            </div>
            
            <br></br>
          
            {/*PARTIE CHAMPS*/}
            <label htmlFor="fname"className="text-blue-400">Nom du Projet <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Nom du projet" className="border p-2 w-full mb-2 rounded-lg" />

            <label htmlFor="fname"className="text-blue-600">Description du Projet <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Description du projet" className="border p-2 w-full mb-2 rounded-lg" />

            <label htmlFor="fname"className="text-blue-600">Sélectionner dans le catalogue de modèle</label>
            <br></br>
            {/*https://flowbite.com/docs/components/buttons/#icon-buttons*/}
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                <span className="sr-only">Icon description</span>
            </button>
            <br></br>
            <label htmlFor="fname"className="text-blue-600">Sélectionner le Dataset <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Dataset" className="border p-2 w-full mb-2 rounded-lg" />

            {/*PARTIE BOUTON*/}
            <div className="flex justify-end space-x-4 mt-auto">
                <button type="submit" className="bg-red-500 text-white p-2 rounded-lg w-32">
                  Annuler
                </button>
                <button type="button" className="bg-blue-700 text-white p-2 rounded-lg w-32">
                  Creer
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default FormCreatingProject;
  
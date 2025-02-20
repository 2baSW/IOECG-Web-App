import PropTypes from "prop-types";

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {project.name}
            </h3>
            <p className="text-gray-700">Créateur : {project.creator || "Non spécifié"}</p>
            <p className="text-gray-500 mb-4">Type : {project.type || "Non spécifié"}</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Plus d informations
            </button>
        </div>
    );
};


ProjectCard.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        creator: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProjectCard;

import React from "react";
import PropTypes from "prop-types";

const TechItem = ({ tech, onDelete }) => {
  return (
    <li>
      {tech}
      <button type="button" onClick={onDelete}>
        Remover
      </button>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TechItem;

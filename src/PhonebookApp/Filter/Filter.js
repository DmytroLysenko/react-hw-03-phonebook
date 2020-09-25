import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

const Filter = ({ filter, onFilter }) => {
  return (
    <div>
      <label className={styles.label}>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={onFilter}
          autoComplete="off"
        />
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func,
};

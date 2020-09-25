import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = ({ list, removeItem }) => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <li key={item.id}>
            <div className={styles.itemContainer}>
              {item.name}: {item.number}
              <button
                className={styles.deleteBtn}
                onClick={() => removeItem(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeItem: PropTypes.func.isRequired,
};

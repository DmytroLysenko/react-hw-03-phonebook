import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";
const uuid = require("uuid");

export default class ContactForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: uuid.v4(),
      name: name.split(" ").join(" "),
      number,
    };
    if (!contact.name || !contact.number) {
      alert("Enter the number and name of contact");
      return;
    }
    this.props.onSubmit(contact);
    this.reset();
  };

  reset = () =>
    this.setState({
      name: "",
      number: "",
    });

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <div>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              autoComplete="off"
              autoFocus
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Number
            <input
              className={styles.input}
              type="phone"
              name="number"
              value={number}
              onChange={this.handleChange}
              autoComplete="off"
            />
          </label>
        </div>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

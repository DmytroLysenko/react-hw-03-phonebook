import React from "react";

import LocalStorage from "../utils/localStorageAPI";
import styles from "./PhonebookApp.module.css";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

const CONTACTS = "contacts";

export default class PhonebookApp extends React.Component {
  static defaultProps = {};
  static propTypes = {};

  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    this.setState({
      contacts: LocalStorage.get(CONTACTS),
    });
  }

  componentDidUpdate() {
    const oldContacts = JSON.stringify(LocalStorage.get(CONTACTS));
    const newContacts = JSON.stringify(this.state.contacts);

    if (oldContacts !== newContacts) {
      LocalStorage.set(CONTACTS, newContacts);
    }
  }

  addContact = (contact) => {
    if (this.isPresent(contact)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState((state) => {
      return { contacts: [...state.contacts, contact] };
    });
  };

  isPresent = (contact) => {
    const callback = (item) =>
      item.name.toLowerCase().includes(contact.name.toLowerCase());
    return this.state.contacts.some(callback);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  makeFilterList = () => {
    const allContacts = this.state.contacts;
    const filter = this.state.filter;

    return allContacts.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleRemoveListItem = (id) => {
    this.setState((state) => {
      return { contacts: state.contacts.filter((item) => item.id !== id) };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        {contacts.length > 1 && (
          <Filter onFilter={this.handleChange} value={filter} />
        )}
        {contacts.length > 0 && (
          <ContactList
            list={this.makeFilterList()}
            removeItem={this.handleRemoveListItem}
          />
        )}
      </div>
    );
  }
}

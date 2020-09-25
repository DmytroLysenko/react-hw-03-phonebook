import React from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import styles from "./PhonebookApp.module.css";

export default class PhonebookApp extends React.Component {
  static defaultProps = {};
  static propTypes = {};

  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    this.setState({
      contacts: localStorage.getItem("contacts")
        ? JSON.parse(localStorage.getItem("contacts"))
        : [],
    });
  }

  componentDidUpdate() {
    const savedContacts = localStorage.getItem("contacts");
    const currentContacts = JSON.stringify(this.state.contacts);

    if (savedContacts !== currentContacts) {
      localStorage.setItem("contacts", currentContacts);
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
    const totalList = this.state.contacts;
    const filter = this.state.filter;

    return totalList.filter((item) =>
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

        <h2 className={styles.title}>Contacts</h2>
        {contacts.length > 1 && (
          <Filter onFilter={this.handleChange} value={filter} />
        )}

        <ContactList
          list={this.makeFilterList()}
          removeItem={this.handleRemoveListItem}
        />
      </div>
    );
  }
}

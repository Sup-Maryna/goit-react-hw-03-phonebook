import './App.css';
import React, { Component } from 'react';
import ContactList from './Components/ContactList/ContactList';
import ContactForm from './Components/ContactForm/ContactForm';
import Filter from './Components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  isInContact = name => {
    const { contacts } = this.state;
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
  };

  addContact = contact => {
    if (!this.isInContact(contact.name)) {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    } else {
      alert(`${contact.name} is already in contact)`);
    }
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    console.log(contacts);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  removeContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      console.log(this.state.contacts);
    }
  }

  render() {
    return (
      <div className="App-header">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} />
        <ContactList
          contacts={this.getFilteredContact()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;

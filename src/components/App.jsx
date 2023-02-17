import { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import styles from './common.module.scss';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const isDuplicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const duplicate = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(duplicate);
  }

  const addContact = ({ name, number }) => {
    if (isDuplicate(name, number)) {
      return alert(`${name} (${number}) is already in your contacts!`);
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevContacts]
    });
  }

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  }

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter handleChange={handleFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );

}

export default App;

/*
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("saved-contacts"));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('saved-contacts', JSON.stringify(contacts));
    }
  }

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: updatedContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDuplicate(name, number)) {
      return alert(`${name} (${number}) is already in your contacts!`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
  };

  isDuplicate(name, number) {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const { contacts } = this.state;
    const duplicate = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLocaleLowerCase() === normalizedNumber
      );
    });
    return Boolean(duplicate);
  }

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  render() {
    const { addContact, handleFilter, deleteContact } = this;
    const contacts = this.getFilteredContacts();

    //console.log(contactInfo);
    return (
      <div className={styles.mainWrapper}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter handleChange={handleFilter} />
        <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
      </div>
    );
  }
}
*/


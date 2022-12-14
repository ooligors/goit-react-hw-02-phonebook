import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Form.module.css';

export class Form extends Component {
static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    name: '',
    number: '',
  };

  onInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    console.log(event.target.elements.name.value);

    const contact = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };

    this.props.onSubmit(contact);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.onFormSubmit}>
        <label className={css.label} htmlFor="name">
          Name
        </label>

        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={this.onInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label className={css.label} htmlFor="number">
          Number
        </label>

        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={this.onInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button className={css.btn} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}


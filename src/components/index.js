import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          user_id: null,
          name: "",
          contacts: [
            { contact_id: null, name: "", phone_number: "", email_address: "" },
          ],
        },
      ],
      name: "",
      contact_name: "",
      phone_number: "",
      email_address: "",      
      user_id: null,
    };
  }

  //post user
  createUser = () => {
    var data = {
      name: this.state.name,
    };
    api.post("users", data);
  };

  //post contact
  createContact = () => {
    var data = {
      name: this.state.contact_name,
      phone_number: this.state.phone_number,
      email_address: this.state.email_address,
    };
    api.post("/contacts/" + this.state.user_id, data);
  };

  //get users
  getUsers = () => {
    api.get("users").then((res) =>
      this.setState({
        users: res.data,
      })
    );
  };

  //set startup state
  componentDidMount() {
    this.getUsers();
  }

  //catch user name input
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  //catch contact name input
  handleContactNameChange = (e) => {
    this.setState({
      contact_name: e.target.value,
    });
  };

  //catch contact phone_number input
  handlePhoneNumberChange = (e) => {
    this.setState({
      phone_number: e.target.value,
    });
  };

  //catch contact email_address input
  handleEmailAddressChange = (e) => {
    this.setState({
      email_address: e.target.value,
    });
  };

  //catch user_id input
  handleUserIdChange = (e) => {
    this.setState({
      user_id: e.target.value,
    });
  };

  //delete user
  deleteUser = (id) => {
    api.delete(`/users/${id}`);
  };

  //delete contact
  deleteContact = (id) => {
    api.delete(`/contacts/${id}`);
  };

  //patch user
  updateUser = (id) => {
    var data = {
      name: this.state.name,
    };
    api.patch(`/users/${id}`, data);
  };

  //patch contact
  updateContact = (id) => {
    var data = {
      name: this.state.contact_name,
      phone_number: this.state.phone_number,
      email_address: this.state.email_address,
    };
    api.patch(`/contacts/${id}`, data);
  };

  //set state after update
  componentWillUpdate() {
    this.getUsers();
  }

  render() {
    return (
      <body> 
                  <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
          User Contacts
          </a>
        </nav>
        </div>
        <section id="menu">
              <h3>Add and edit</h3>
              <button class = "btn btn-secondary" onClick={this.createUser}>Add user</button>
              <h4>User</h4>
              <h5>User name:</h5>
              <input onChange={this.handleNameChange} type="text" />
              <br></br>
              <br></br>
              <button class = "btn btn-secondary" onClick={this.createContact}>Add contact</button>              
              <h4>Contact</h4>
              <h5>Contact name:</h5>
              <input onChange={this.handleContactNameChange} type="text" />
              <h5>Phone number:</h5>
              <input onChange={this.handlePhoneNumberChange} type="text" />
              <h5>Email address:</h5>
              <input onChange={this.handleEmailAddressChange} type="text" />
              <h5>User ID:</h5>
              <input onChange={this.handleUserIdChange} type="text" />
          </section>

          <section>
          <h3>Users Contacts List</h3>
          <ol>
              {this.state.users.map(user =>
                  <li class="list-group-item list-group-item-action list-group-item-primary" key={user.user_id}>
                    <pre>{["Name: ", user.name, "          User ID: ", user.user_id]}
                      <button class = "btn btn-secondary btn-sm" onClick={() => this.updateUser(user.user_id)}>Edit</button>
                      <button class = "btn btn-secondary btn-sm" onClick={() => this.deleteUser(user.user_id)}>Delete</button></pre>
                      <ol>
                          {user.contacts.map(contact =>
                              <li class="list-group-item list-group-item-action list-group-item-warning" key={contact.contact_id}>
                                <pre>{["Name: ", contact.name, "          Phone number: ", contact.phone_number, "          Email address: ", contact.email_address]}
                                  <button class = "btn btn-secondary btn-sm" onClick={() => this.updateContact(contact.contact_id)}>Edit</button>
                                  <button class = "btn btn-secondary btn-sm" onClick={() => this.deleteContact(contact.contact_id)}>Delete</button></pre>
                              </li>
                          )}
                      </ol>
                  </li>
              )}
          </ol>
          </section>
      </body>
    );
  }
}

export default HomePage;

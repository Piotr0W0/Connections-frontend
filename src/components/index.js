import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/'
})

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [{ user_id: null, name: "", contacts: [{ contact_id: null, name: "", phone_number: null, email_address: null }] }],
            name: null,
            contact_name: null,
            phone_number: null,
            email_address: null,
            user_id: null
        }
    }

    //post user
    createUser = () => {
        var data = {
            name: this.state.name,
        }
        api.post('users', data)
    }

    //post contact
    createContact = () => {
        var data = {
            name: this.state.contact_name,
            phone_number: this.state.phone_number,
            email_address: this.state.email_address,
        }
        api.post(`/contacts/${this.state.user_id}`, data)
    }

    //get user
    getUsers = () => {
        api.get('users')
            .then(res =>
                this.setState({
                    users: res.data
                })
            )
    }

    //set startup state
    componentDidMount() {
        this.getUsers()
    }

    //catch user name input
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    //catch contact name input
    handleContactNameChange = (e) => {
        this.setState({
            contact_name: e.target.value
        });
    }

    //catch contact phone_number input
    handlePhoneNumberChange = (e) => {
        this.setState({
            phone_number: e.target.value
        });
    }

        //catch contact email_address input
        handleEmailAddressChange = (e) => {
            this.setState({
                email_address: e.target.value
            });
        }

    //catch user id input
    handleUserIdChange = (e) => {
        this.setState({
            user_id: e.target.value
        });
    }

    //delete user
    deleteUser = (id) => {
        api.delete(`/users/${id}`)
    }

    //delete contact
    deleteContact = (id) => {
        api.delete(`/contacts/${id}`)
    }

    //patch user
    updateUser = (id) => {
        var data = {
            name: this.state.name        }
        api.patch(`/users/${id}`, data)
    }

    //patch contact
    updateContact = (id) => {
        var data = {
            name: this.state.contact_name,
            phone_number: this.state.phone_number,
            email_address: this.state.email_address
        }
        api.patch(`/contacts/${id}`, data)
    }

    //set state after update
    componentWillUpdate() {
        this.getUsers()
    }

    render() {
        return (
            <body>
                <section>
                <h2>Users contacts</h2>
                <ol class = "rounded-list">
                    {this.state.users.map(user =>
                        <li key={user.user_id}>{["Name: ", user.name, " User ID: ", user.user_id]}
                        <NavLink to={{
                            pathname:"/details",
                            aboutProps:{
                                user_id: user.user_id,
                                name: user.name
                            }
                        }}
                        exact
                        ><button class = "btn-dtl">Details</button>
                        </NavLink>
                            <button class = "btn-patch" onClick={() => this.updateUser(user.user_id)}>Edit</button>
                            <button class = "btn-del" onClick={() => this.deleteUser(user.user_id)}>Delete</button>
                            <ol>
                                {user.contacts.map(contact =>
                                    <li key={contact.contact_id}>{["Name: ", contact.name, " Phone number: ", contact.phone_number, " Email address: ", contact.email_address]}
                                        <button class = "btn-patch" onClick={() => this.updateContact(contact.contact_id)}>Edit</button>
                                        <button class = "btn-del" onClick={() => this.deleteContact(contact.contact_id)}>Delete</button>
                                    </li>
                                )}
                            </ol>
                        </li>
                    )}
                </ol>
                </section>
                <aside>
                    <h2>Add and edit</h2>
                    User name:
                    <input onChange={this.handleNameChange} type="text" />
                    <br></br>
                    <button class = "btn-post" onClick={this.createUser}>Add user</button>
                    <br></br><br></br><br></br>
                    Contact name:
                    <input onChange={this.handleContactNameChange} type="text" />
                    <br></br>
                    Phone number:
                    <input onChange={this.handlePhoneNumberChange} type="text" />
                    <br></br>
                    Email address:
                    <input onChange={this.handleEmailAddressChange} type="text" />
                    <br></br>
                    User ID:
                    <input onChange={this.handleUserIdChange} type="text" />
                    <br></br>
                    <button class = "btn-post" onClick={this.createContact}>Add contact</button>
                </aside>
            </body>
        );
    }
}

export default HomePage;
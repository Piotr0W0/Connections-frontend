import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/'
})

class DetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [{contact_id: null, name: "", phone_number: null, email_address: null }],
            name: null,
            phone_number: null, 
            email_address: null,
            user: props.location.aboutProps,
        } 
    }

    //get passed faculty id from main page
    getUserId () {
        return this.state.user.user_id
    }
 
    //get passed faculty name from main page
    getName () {
        return this.state.user.name
    }

    //get institute
    getContacts = () => {
        api.get(`contacts/user/1`)
            .then(res =>
                   this.setState({
                       contacts: res.data
                   })   
            )
    }

    //post institute
    createContact = () => {
        var data = {
            name: this.state.name,
            phone_number: this.state.phone_number,
            email_address: this.state.email_address
               }
        api.post(`/contacts/${this.getUserId()}`, data)
    }

    //set startup state
    componentDidMount() {
        this.getContacts()
    }

    //catch institute name input
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    //catch institute workers_count input
    handlePhoneNumberChange = (e) => {
        this.setState({
            phone_number: e.target.value
        });
    }

        //catch institute workers_count input
        handleEmailAddressChange = (e) => {
            this.setState({
                email_address: e.target.value
            });
        }

    //delete institute
    deleteContact = (id) => {
        api.delete(`/contacts/${id}`)
    }

    //patch institute
    updateContact = (id) => {
        var data = {
            name: this.state.name,
            phone_number: this.state.phone_number,
            email_address: this.state.email_address
        }
        api.patch(`/contacts/${id}`, data)
    }

    //set state after update
    componentWillUpdate() {
        this.getContacts()
    }

    render() {
        return (
            <body>
                <section>
                <h2>User contacts {this.getName()}</h2>
                <h2>{this.state.user_id}</h2>
                            <ol class = "rounded-list">
                                {this.state.contacts.map(contact =>
                                    <li key={contact.contact_id}>{["Name: ", contact.name, " Phone number : ", contact.phone_number, " Email address : ", contact.email_address]}
                                        <button class = "btn-patch" onClick={() => this.updateContact(contact.contact_id)}>Edit</button>
                                        <button class = "btn-del" onClick={() => this.deleteContact(contact.contact_id)}>Delete</button>
                                    </li>
                                )}
                            </ol>
                </section>
                <aside>
                    <h2>Add end edit </h2>
                    Contact name:
                    <input onChange={this.handleNameChange} type="text" />
                    <br></br>
                    Phone number:
                    <input onChange={this.handlePhoneNumberChange} type="text" />
                    <br></br>
                    Email address:
                    <input onChange={this.handleEmailAddressChange} type="text" />
                    <br></br>
                    <button class = "btn-post" onClick={this.createContact}>Add contact</button>
                    <br></br>
                    <NavLink to = "/"><button class = "btn-dtl" >Homepage</button></NavLink>
                </aside>
            </body>
        );
    }
}

export default DetailsPage;
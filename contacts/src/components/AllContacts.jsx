import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import { toast } from "react-toastify"

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/contacts');
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
          setFilteredContacts(data); 
        } else {
          console.log('Error fetching contacts');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id,name) => {
    try {
      const response = await fetch(`http://localhost:5000/contact/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Contact deleted successfully');
        const updatedContacts = contacts.filter((contact) => contact._id !== id);
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts); 
        toast.error("Contact deleted")
      } else {
        console.log('Error deleting contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.phone.toLowerCase().includes(term)
    );
    setFilteredContacts(filtered);
  };

  const handleEdit = (contact) => {
    setEditMode(true);
    setEditFormData({
      id: contact._id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/contact/${editFormData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editFormData.name,
          email: editFormData.email,
          phone: editFormData.phone,
        }),
      });
      if (response.ok) {
        toast.success("Contact edited")
        const updatedContacts = contacts.map((contact) =>
          contact._id === editFormData.id ? { ...contact, ...editFormData } : contact
        );
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts); 
        setEditMode(false);
        setEditFormData({
          id: '',
          name: '',
          email: '',
          phone: '',
        });
      } else {
        console.log('Error updating contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    toast.error("Cancelled")
    setEditFormData({
      id: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div>
      <Header/>
      <h1>Contact List</h1>
      <div className='search'><input type="text" placeholder="Search by name, email, or phone..."  value={searchTerm}  onChange={handleSearch} />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      {editMode ? (
        <form onSubmit={handleEditSubmit}>
          <input type="text" name="name"  value={editFormData.name}  onChange={handleEditChange}  placeholder="Name" required />
          <input type="email" name="email" value={editFormData.email}  onChange={handleEditChange} placeholder="Email" required />
          <input  type="text"  name="phone" value={editFormData.phone} onChange={handleEditChange} placeholder="Phone" required />
          <button type="submit">Save</button> <button type="button" onClick={cancelEdit}>Cancel</button>
        </form>
      ) : (
        filteredContacts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <button onClick={() => handleDelete(contact._id)}> <FontAwesomeIcon icon={faTrashAlt} className="icon" /> Delete</button> <button onClick={() => handleEdit(contact)}>
                    <FontAwesomeIcon icon={faEdit} className="icon" /> Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No contacts found</h1>
        )
      )}
    </div>
  );
};

export default AllContacts;

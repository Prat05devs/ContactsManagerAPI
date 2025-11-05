// Example React Component - Contact List
// Place this in your luxe-client-view project, e.g., src/components/ContactList.jsx

import React, { useState, useEffect } from 'react';
import { contactService } from '../services/contactService';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Fetch all contacts
  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAllContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Create or update contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update existing contact
        await contactService.updateContact(editingId, formData);
        setEditingId(null);
      } else {
        // Create new contact
        await contactService.createContact(formData);
      }
      
      // Reset form and reload contacts
      setFormData({ name: '', email: '', phone: '' });
      loadContacts();
    } catch (err) {
      setError('Failed to save contact');
      console.error(err);
    }
  };

  // Delete contact
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(id);
        loadContacts();
      } catch (err) {
        setError('Failed to delete contact');
        console.error(err);
      }
    }
  };

  // Edit contact
  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
    setEditingId(contact._id);
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '' });
    setEditingId(null);
  };

  if (loading) return <div>Loading contacts...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Manager</h1>
      
      {/* Contact Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <h2>{editingId ? 'Edit Contact' : 'Add New Contact'}</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', marginRight: '10px' }}>
          {editingId ? 'Update' : 'Add'} Contact
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel} style={{ padding: '8px 16px' }}>
            Cancel
          </button>
        )}
      </form>

      {/* Contact List */}
      <h2>Contacts ({contacts.length})</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {contacts.map((contact) => (
          <div
            key={contact._id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h3>{contact.name}</h3>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              <strong>Created:</strong> {new Date(contact.createdAt).toLocaleDateString()}
            </p>
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleEdit(contact)}
                style={{ padding: '5px 10px', marginRight: '10px' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <p>No contacts found. Add your first contact above!</p>
      )}
    </div>
  );
}

export default ContactList;

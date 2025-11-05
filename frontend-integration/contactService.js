// API Service for connecting luxe-client-view frontend with mycontacts-backend
// Place this file in your frontend project, e.g., src/services/contactService.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const CONTACTS_ENDPOINT = `${API_BASE_URL}/api/contacts`;

/**
 * Contact Service - Handles all API calls for contact management
 * No authentication required - simple dashboard API
 */
export const contactService = {
  /**
   * Get all contacts
   * @returns {Promise<Array>} Array of contact objects
   */
  getAllContacts: async () => {
    try {
      const response = await fetch(CONTACTS_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  /**
   * Get a single contact by ID
   * @param {string} id - Contact ID
   * @returns {Promise<Object>} Contact object
   */
  getContact: async (id) => {
    try {
      const response = await fetch(`${CONTACTS_ENDPOINT}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new contact
   * @param {Object} contactData - Contact data {name, email, phone}
   * @returns {Promise<Object>} Created contact object
   */
  createContact: async (contactData) => {
    try {
      const response = await fetch(CONTACTS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  /**
   * Update an existing contact
   * @param {string} id - Contact ID
   * @param {Object} contactData - Updated contact data {name, email, phone}
   * @returns {Promise<Object>} Updated contact object
   */
  updateContact: async (id, contactData) => {
    try {
      const response = await fetch(`${CONTACTS_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating contact ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a contact
   * @param {string} id - Contact ID
   * @returns {Promise<Object>} Deleted contact object
   */
  deleteContact: async (id) => {
    try {
      const response = await fetch(`${CONTACTS_ENDPOINT}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error deleting contact ${id}:`, error);
      throw error;
    }
  },
};

export default contactService;

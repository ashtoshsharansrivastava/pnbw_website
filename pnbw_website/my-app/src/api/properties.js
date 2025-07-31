// src/api/properties.js
import { sites } from '../data/frontend.js'; // Assuming your property data is exported as 'sites'

/**
 * Fetches a list of all properties.
 * @returns {Promise<Array>} A promise that resolves to an array of property objects.
 */
export function list() {
  // Simulate an API call delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sites);
    }, 100); // Small delay to mimic network request
  });
}

/**
 * Fetches a single property by its ID.
 * @param {string} id The ID of the property to fetch.
 * @returns {Promise<Object|undefined>} A promise that resolves to the property object
 * or undefined if not found.
 */
export function getById(id) {
  // Ensure ID is treated as a string for comparison, as useParams() gives strings
  const property = sites.find(p => String(p.id) === String(id));
  
  // Simulate an API call delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(property);
    }, 100); // Small delay to mimic network request
  });
}

// You might also have other API functions here, e.g.,
// export function postEnquiry(data, token) { /* ... */ }

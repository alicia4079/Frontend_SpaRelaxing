/* const API_URL = 'https://backend-spas.vercel.app/api/v1'; 

export const fetchService = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`; 
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
 */
const API_URL = 'https://backend-spas.vercel.app/api/v1';

export const fetchService = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`; 
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const BASE_URL = 'https://gutendex.com/books/';

/**
 * Fetch books from Gutendex API
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} API response
 */
export const fetchBooks = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.search) {
    queryParams.append('search', params.search);
  }

  if (params.topic) {
    queryParams.append('topic', params.topic);
  }

  if (params.page) {
    queryParams.append('page', params.page);
  }

  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

/**
 * Fetch a single book by ID
 * @param {number} id - Book ID
 * @returns {Promise<Object>} Book data
 */
export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

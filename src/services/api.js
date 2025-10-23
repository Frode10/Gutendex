const BASE_URL = 'https://gutendex.com/books/';

/**
 * Fetch with timeout
 * @param {string} url - URL to fetch
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Response>}
 */
const fetchWithTimeout = async (url, timeout = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - API-et tar for lang tid å svare');
    }
    throw error;
  }
};

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
    const response = await fetchWithTimeout(url);
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
    const response = await fetchWithTimeout(`${BASE_URL}${id}`);
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

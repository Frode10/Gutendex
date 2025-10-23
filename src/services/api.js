import { mockBooks, getMockBook, filterMockByTopic, searchMockBooks } from './mockData';

const BASE_URL = 'https://gutendex.com/books/';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK === 'true';

/**
 * Fetch with timeout
 * @param {string} url - URL to fetch
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Response>}
 */
const fetchWithTimeout = async (url, timeout = 10000) => {
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
  // Use mock data if enabled or as fallback
  if (USE_MOCK_DATA) {
    console.log('Using mock data (VITE_USE_MOCK=true)');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    if (params.search) {
      return searchMockBooks(params.search);
    }
    if (params.topic) {
      return filterMockByTopic(params.topic);
    }
    return mockBooks;
  }

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
    console.error('Error fetching books from API, falling back to mock data:', error);
    // Fallback to mock data if API fails
    if (params.search) {
      return searchMockBooks(params.search);
    }
    if (params.topic) {
      return filterMockByTopic(params.topic);
    }
    return mockBooks;
  }
};

/**
 * Fetch a single book by ID
 * @param {number} id - Book ID
 * @returns {Promise<Object>} Book data
 */
export const fetchBookById = async (id) => {
  // Use mock data if enabled or as fallback
  if (USE_MOCK_DATA) {
    console.log('Using mock data for book:', id);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    return getMockBook(id);
  }

  try {
    const response = await fetchWithTimeout(`${BASE_URL}${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book from API, falling back to mock data:', error);
    // Fallback to mock data if API fails
    return getMockBook(id);
  }
};

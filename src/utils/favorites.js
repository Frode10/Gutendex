const FAVORITES_KEY = 'gutendex_favorites';

/**
 * Get all favorites from localStorage
 * @returns {Array} Array of favorite books
 */
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

/**
 * Save favorites to localStorage
 * @param {Array} favorites - Array of favorite books
 */
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

/**
 * Add a book to favorites
 * @param {Object} book - Book object
 * @returns {Array} Updated favorites array
 */
export const addToFavorites = (book) => {
  const favorites = getFavorites();
  if (!favorites.find(fav => fav.id === book.id)) {
    const updatedFavorites = [...favorites, book];
    saveFavorites(updatedFavorites);
    return updatedFavorites;
  }
  return favorites;
};

/**
 * Remove a book from favorites
 * @param {number} bookId - Book ID
 * @returns {Array} Updated favorites array
 */
export const removeFromFavorites = (bookId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(fav => fav.id !== bookId);
  saveFavorites(updatedFavorites);
  return updatedFavorites;
};

/**
 * Check if a book is in favorites
 * @param {number} bookId - Book ID
 * @returns {boolean} True if book is in favorites
 */
export const isFavorite = (bookId) => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === bookId);
};

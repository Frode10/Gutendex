import { useState, useEffect } from 'react';
import { getFavorites, removeFromFavorites } from '../utils/favorites';
import BookGrid from '../components/BookGrid';
import './Page.css';
import './Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();

    // Listen for storage changes (if user opens multiple tabs)
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  const handleRemoveFavorite = (bookId) => {
    removeFromFavorites(bookId);
    loadFavorites();
  };

  if (favorites.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <h2 className="page-title">Mine favoritter</h2>
          <div className="no-favorites">
            <p>Du har ingen favorittbøker ennå.</p>
            <p>Søk etter bøker og legg dem til i favorittene dine!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Mine favoritter</h2>
        <p className="page-subtitle">{favorites.length} bøker i favorittene</p>
        <BookGrid books={favorites} />
      </div>
    </div>
  );
}

export default Favorites;

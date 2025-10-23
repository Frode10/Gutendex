import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const CATEGORIES = [
  'Fiction',
  'Mystery',
  'Thriller',
  'Romance',
  'Fantasy',
  'Morality',
  'Society',
  'Power',
  'Justice',
  'Adventure',
  'Tragedy',
  'War',
  'Philosophy'
];

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>Gutendex</h1>
          </Link>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Søk etter bøker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Søk
            </button>
          </form>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <div className="nav-section">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Hjem
            </Link>
            <Link to="/favorites" className="nav-link favorites-link" onClick={() => setMenuOpen(false)}>
              Favoritter
            </Link>
          </div>

          <div className="nav-section categories">
            <h3 className="nav-title">Kategorier</h3>
            <div className="category-links">
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="nav-link category-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

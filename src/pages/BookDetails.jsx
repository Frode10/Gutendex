import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookById } from '../services/api';
import { addToFavorites, removeFromFavorites, isFavorite } from '../utils/favorites';
import './BookDetails.css';

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookById(id);
      setBook(data);
      setFavorite(isFavorite(data.id));
    } catch (err) {
      setError('Kunne ikke laste bokdetaljer. Vennligst prøv igjen senere.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(book.id);
      setFavorite(false);
    } else {
      addToFavorites(book);
      setFavorite(true);
    }
  };

  if (loading) {
    return <div className="loading">Laster bokdetaljer...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!book) {
    return <div className="error">Bok ikke funnet</div>;
  }

  const coverImage = book.formats['image/jpeg'] || '/placeholder-book.png';
  const author = book.authors && book.authors.length > 0
    ? book.authors.map(a => a.name).join(', ')
    : 'Ukjent forfatter';
  const languages = book.languages ? book.languages.join(', ').toUpperCase() : 'Ukjent';
  const subjects = book.subjects || [];
  const downloadLinks = [];

  if (book.formats['text/html']) {
    downloadLinks.push({ format: 'HTML', url: book.formats['text/html'] });
  }
  if (book.formats['application/epub+zip']) {
    downloadLinks.push({ format: 'EPUB', url: book.formats['application/epub+zip'] });
  }
  if (book.formats['text/plain']) {
    downloadLinks.push({ format: 'Plain Text', url: book.formats['text/plain'] });
  }

  return (
    <div className="book-details-page">
      <div className="container">
        <Link to="/" className="back-link">← Tilbake</Link>

        <div className="book-details">
          <div className="book-details-image">
            <img src={coverImage} alt={book.title} />
          </div>

          <div className="book-details-content">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">av {author}</p>

            <div className="book-info">
              <div className="book-info-item">
                <span className="book-info-label">Nedlastninger:</span>
                <span className="book-info-value">{book.download_count}</span>
              </div>

              <div className="book-info-item">
                <span className="book-info-label">Språk:</span>
                <span className="book-info-value">{languages}</span>
              </div>

              {subjects.length > 0 && (
                <div className="book-info-item">
                  <span className="book-info-label">Kategorier:</span>
                  <div className="book-subjects">
                    {subjects.slice(0, 5).map((subject, index) => (
                      <span key={index} className="book-subject">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {downloadLinks.length > 0 && (
              <div className="book-downloads">
                <h3>Last ned boken:</h3>
                <div className="download-links">
                  {downloadLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      {link.format}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleToggleFavorite}
              className={`favorite-button ${favorite ? 'favorite-active' : ''}`}
            >
              {favorite ? '★ Fjern fra favoritter' : '☆ Legg til i favoritter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import BookGrid from '../components/BookGrid';
import Pagination from '../components/Pagination';
import './Page.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    if (query) {
      setCurrentPage(1);
      loadBooks(1, query);
    }
  }, [query]);

  useEffect(() => {
    if (query && currentPage > 1) {
      loadBooks(currentPage, query);
    }
  }, [currentPage]);

  const loadBooks = async (page, searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks({ search: searchQuery, page });
      setBooks(data.results);
      setHasNext(!!data.next);
      setHasPrevious(!!data.previous);
    } catch (err) {
      setError('Kunne ikke søke etter bøker. Vennligst prøv igjen senere.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!query) {
    return (
      <div className="page">
        <div className="container">
          <p className="page-message">Vennligst skriv inn et søk i søkefeltet.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Søker etter bøker...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Søkeresultater for "{query}"</h2>
        <p className="page-subtitle">{books.length} bøker funnet</p>
        <BookGrid books={books} />
        {(hasNext || hasPrevious) && (
          <Pagination
            currentPage={currentPage}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;

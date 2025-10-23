import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';
import BookGrid from '../components/BookGrid';
import Pagination from '../components/Pagination';
import './Page.css';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    loadBooks(currentPage);
  }, [currentPage]);

  const loadBooks = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks({ page });
      setBooks(data.results);
      setHasNext(!!data.next);
      setHasPrevious(!!data.previous);
    } catch (err) {
      setError('Kunne ikke laste bøker. Vennligst prøv igjen senere.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="loading">Laster bøker...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Populære bøker</h2>
        <BookGrid books={books} />
        <Pagination
          currentPage={currentPage}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Home;

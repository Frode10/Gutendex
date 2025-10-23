import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import BookGrid from '../components/BookGrid';
import Pagination from '../components/Pagination';
import './Page.css';

function CategoryPage() {
  const { category } = useParams();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    loadBooks(1, category);
  }, [category]);

  useEffect(() => {
    if (currentPage > 1) {
      loadBooks(currentPage, category);
    }
  }, [currentPage]);

  const loadBooks = async (page, topic) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks({ topic, page });
      setBooks(data.results);
      setHasNext(!!data.next);
      setHasPrevious(!!data.previous);
    } catch (err) {
      setError('Kunne ikke laste bøker fra denne kategorien. Vennligst prøv igjen senere.');
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

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">{categoryTitle}</h2>
        <p className="page-subtitle">{books.length} bøker i denne kategorien</p>
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

export default CategoryPage;

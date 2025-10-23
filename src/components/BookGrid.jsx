import BookCard from './BookCard';
import './BookGrid.css';

function BookGrid({ books }) {
  if (!books || books.length === 0) {
    return <div className="no-books">Ingen bøker funnet</div>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;

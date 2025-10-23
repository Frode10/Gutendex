import { Link } from 'react-router-dom';
import './BookCard.css';

function BookCard({ book }) {
  const coverImage = book.formats['image/jpeg'] || '/placeholder-book.png';
  const author = book.authors && book.authors.length > 0
    ? book.authors.map(a => a.name).join(', ')
    : 'Ukjent forfatter';

  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-card-image">
        <img src={coverImage} alt={book.title} />
      </div>
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{author}</p>
        <div className="book-card-meta">
          <span className="book-card-downloads">
            {book.download_count} nedlastninger
          </span>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;

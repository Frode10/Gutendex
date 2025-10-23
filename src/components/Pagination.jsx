import './Pagination.css';

function Pagination({ currentPage, hasNext, hasPrevious, onPageChange }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="pagination-button"
      >
        Forrige
      </button>

      <span className="pagination-info">
        Side {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="pagination-button"
      >
        Neste
      </button>
    </div>
  );
}

export default Pagination;

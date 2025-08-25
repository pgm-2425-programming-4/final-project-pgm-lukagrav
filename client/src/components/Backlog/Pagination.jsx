export default function Pagination({
  currentPage = 1,
  pageCount = 1,
  onPageChanged,
}) {
  if (isNaN(currentPage) || isNaN(pageCount)) return null;

  let pageNumberArray = [];

  if (pageCount <= 6) {
    for (let i = 1; i <= pageCount; i++) pageNumberArray.push(i);
  } else if (currentPage > 3 && currentPage < pageCount - 2) {
    pageNumberArray = [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      pageCount,
    ];
  } else if (currentPage <= 3) {
    pageNumberArray = [1, 2, 3, 4, null, pageCount];
  } else {
    pageNumberArray = [
      1,
      null,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  }

  const pageLinks = pageNumberArray.map((pageNumber, index) =>
    pageNumber === null ? (
      <li key={index}>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    ) : (
      <li key={index}>
        <button
          className={`pagination-link ${pageNumber === currentPage ? "is-current" : ""}`}
          aria-label={`Go to page ${pageNumber}`}
          onClick={() => onPageChanged(pageNumber)}
        >
          {pageNumber}
        </button>
      </li>
    ),
  );

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="pagination-previous button"
        disabled={currentPage === 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="pagination-next button"
        disabled={currentPage === pageCount}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Next page
      </button>
      <ul className="pagination-list">{pageLinks}</ul>
    </nav>
  );
}

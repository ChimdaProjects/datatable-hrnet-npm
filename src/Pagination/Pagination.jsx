import React, { useEffect } from "react";
import "./pagination.scss";

/**
   * Generates an array of numbers within a specified range.
   *
   * @param {number} from - The starting value of the range.
   * @param {number} to - The ending value of the range.
   * @param {number} [step=1] - The step size between numbers in the range.
   * @returns {number[]} - An array of numbers within the specified range.
   */
function Pagination(props) {
  const {
    entriesPerPage,
    totalEntries,
    paginate,
    start,
    end,
    currentPage,
    setCurrentPage,
  } = props;

  // Calculates the total number of pages.
  const numberPages = Math.ceil(totalEntries / entriesPerPage);
  // calculate number of pages from the first page
  const distanceFromStart = currentPage - 1;
  // calculate number of pages to the final page
  const distanceFromEnd = numberPages - currentPage;
  // array of pages
  let pages = [];

  const startingPage = distanceFromStart >= 4 ? currentPage - 1 : 2;
  const endingPage = distanceFromEnd >= 4 ? currentPage + 1 : numberPages - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  /**
   * Generates an array of numbers within a specified range.
   *
   * @param {number} from - The starting value of the range.
   * @param {number} to - The ending value of the range.
   * @param {number} [step=1] - The step size between numbers in the range.
   * @returns {number[]} - An array of numbers within the specified range.
   */
  const range = (from, to, step = 1) => {
    let i = from;
    const numberpages = [];
    while (i <= to) {
      numberpages.push(i);
      i += step;
    }
    return numberpages;
  };

  if (currentPage <= 4) {
    const rangePages = range(
      startingPage,
      numberPages > 4 ? numberPages : numberPages - 1,
    );
    pages = rangePages.slice(0, 4);
  } else if (currentPage >= 5 && currentPage < numberPages - 3) {
    const rangePages = range(startingPage, endingPage);
    pages = rangePages;
  } else if (currentPage >= numberPages - 4) {
    const rangePages = range(numberPages - 4, numberPages - 1);
    pages = rangePages;
  }
  // Calculates the index of the last entry.
  const entryEnd = numberPages === currentPage ? totalEntries : end;

  return (
    <div className="pagination">
      <div className="pagination-details">
        <p className="pagination-details-content">
          Showing {start + 1} to {entryEnd} of {totalEntries} entries 
        </p>
      </div>
      <nav className="pagination-nav">
        <ul className="pagination-list">
          <li className="pagination-list-item">
            <button
              type="button"
              className="pagination-list-item-btn prev"
              disabled={currentPage === 1 ? true : false}
              onClick={() => (currentPage > 1 ? setCurrentPage(currentPage - 1) : "")}
            >
              Previous
            </button>
          </li>
          {numberPages > 1 && (
            <li className="pagination-list-item">
              <button
                type="button"
                onClick={() => (paginate(1))}
                className={
                  currentPage === 1
                    ? "pagination-list-item-btn pagination-active"
                    : "pagination-list-item-btn"
                }
              >
                1
              </button>
            </li>
          )}
          {currentPage >= 5 && (
            <li className="pagination-list-item">
              <button type="button" className="pagination-list-item-dots">...</button>
            </li>
          )}
          {pages.map((number) => (
            <li key={number} className="pagination-list-item">
              <button
                type="button"
                onClick={() => paginate(number)}
                className={
                  currentPage === number
                    ? "pagination-list-item-btn pagination-active"
                    : "pagination-list-item-btn"
                }
              >
                {number}
              </button>
            </li>
          ))}
          {currentPage < numberPages - 3 && (
            <li className="pagination-list-item">
              <button type="button" className="pagination-list-item-dots">...</button>
            </li>
          )}

          <li className="pagination-list-item">
            <button
              type="button"
              onClick={() => paginate(numberPages)}
              className={
                currentPage === numberPages
                  ? "pagination-list-item-btn pagination-active"
                  : "pagination-list-item-btn"
              }
            >
              {numberPages}
            </button>
          </li>
          <li className="pagination-list-item">
            <button
              type="button"
              className="pagination-list-item-btn next "
              disabled={currentPage === numberPages ? true : false}
              onClick={() => (currentPage === numberPages.length
                ? ""
                : setCurrentPage(currentPage + 1)
              )}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

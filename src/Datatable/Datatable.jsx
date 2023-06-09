import React, { useState, useEffect } from "react";
import "./datatable.scss";
import Pagination from "../Pagination/Pagination";
import { FaSort } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa"
import { FaSortDown } from "react-icons/fa"

/**
 * This component represents a data table.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.columnTitle - The array of column titles for the table.
 * @param {Array} props.datas - The array of data objects to display in the table.
 * @returns {JSX.Element} - The data table component.
 */
function Datatable({ columnTitle, datas }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [clickCount, setClickCount] = useState(0);
  const [clickedColumnIndex, setClickedColumnIndex] = useState(null);
  const [indexColumn, setIndexColumn] = useState(null);
  const [dataList, setDataList] = useState(datas);
  const [searchTerm, setSearchTerm] = useState("");
  const [indexOfLastEntry, setIndexOfLastEntry] = useState(10);
  const [indexOfFirstEntry, setIndexOfFirstEntry] = useState(0);

  const getRowClass = (index) => (index % 2 === 0 ? "even-row" : "odd-row");

  const columnName = [
    "firstname",
    "lastname",
    "startDate",
    "department",
    "dateOfBirth",
    "street",
    "city",
    "state",
    "code",
  ];

  useEffect(() => {
    let newResults = [...datas];

    if (searchTerm) {
      newResults = newResults.filter((data) => {
      return Object.values(data).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (indexColumn !== null) {
      const column = columnName[indexColumn];
      switch (clickCount) {
        case 1:
          if (column === "startDate" || column === "dateOfBirth") {
            newResults.sort((a, b) => {
              const dateA = new Date(a[column]);
              const dateB = new Date(b[column]);
              return dateA - dateB;
            });
          } else {
            newResults.sort((a, b) => (a[column] < b[column] ? -1 : 1));
          }

          break;
        case 2:
          if (column === "startDate" || column === "dateOfBirth") {
            newResults.sort((a, b) => {
              const dateA = new Date(a[column]);
              const dateB = new Date(b[column]);
              return dateB - dateA;
            });
          } else {
            newResults.sort((a, b) => (a[column] > b[column] ? -1 : 1));
          }
          break;
        default:
          break;
      }
    }

    setDataList(newResults);
  }, [searchTerm, indexColumn, clickCount, currentPage, entriesPerPage]);

  useEffect(() => {
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = (currentPage - 1) * entriesPerPage;

    setIndexOfLastEntry(indexOfLastEntry);
    setIndexOfFirstEntry(indexOfFirstEntry);
  }, [currentPage, entriesPerPage]);

  /**
   *  Displays the page change.
   * @param {String} pageNumber the number page selected
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Displays the number of rows in the datatable based on the number of selected entries.
   * @param {Event} e 
   */
  const handleClickSelect = (e) => {
    const value = e.target.value;
    setEntriesPerPage(parseInt(value));
    setCurrentPage(1);
  };

  /**
   *  Displays the corresponding icon based on the number of clicks.
   * @param {String} index 
   */
  const handleClickIcon = (index) => {
    // if index is the index of the clicked column
    if (index === clickedColumnIndex) {
      // if the click counter is equal to 2, we reset it to 0 otherwise we add 1
      const newClickCount = clickCount === 2 ? 0 : clickCount + 1;
      setClickCount(newClickCount);
    } else {
      setClickCount(1);
      setClickedColumnIndex(index);
    }
    setCurrentPage(1);
    setIndexColumn(index);
  };

  /**
   * Diplays the results based on the term entered.
   * @param {Event} e 
   */
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  return (
    <>
      <h2 className="datatable-title">Current Employee</h2>
      <div className="datatable-features">
        <div className="datatable-sort">
          <p>
            Show
            <select onChange={handleClickSelect}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </p>
        </div>
        <div className="datatable-search">
          <label htmlFor="search">
            Search :
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search by keywords..."
          />
        </div>
      </div>
      <table className="table">
        <thead className="table-head">
          <tr className="table-head-row">
            {columnTitle.map((elt, index) => {
              let iconElement;
              if (index !== clickedColumnIndex || clickCount === 0) {
                iconElement = (
                  <FaSort 
                    id={index}
                    style={{ color: "#e1e2e5" }}
                  />
                );
              } else if (clickCount === 1) {
                iconElement = (
                  <FaSortUp 
                    id={index}
                    style={{ color: "##888EE0" }}
                  />
                );
              } else if (clickCount === 2) {
                iconElement = (
                  <FaSortDown 
                    id={index}
                    style={{ color: "#888EE0" }}
                  />
                );
              }
              return (
                <th className="table-head-row-title" key={`${index}-${elt}`}>
                  {elt}
                  <span
                    className="table-icon"
                    id={index}
                    value={elt}
                    onClick={() => handleClickIcon(index)}
                    aria-hidden
                  >
                    {iconElement}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table-body">
          {dataList
            ?.filter(
              (_, index) => index >= indexOfFirstEntry && index < indexOfLastEntry,
            )
            .map((data, index) => (
              <tr key={`data-${index}`} className={getRowClass(index)}>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.startDate}</td>
                <td>{data.department}</td>
                <td>{data.dateOfBirth}</td>
                <td>{data.street}</td>
                <td>{data.city}</td>
                <td>{data.state}</td>
                <td>{data.code}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        entriesPerPage={entriesPerPage}
        totalEntries={dataList.length}
        paginate={handlePageChange}
        start={indexOfFirstEntry}
        end={indexOfLastEntry}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}


export default Datatable;

"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.parse-int.js");
var _react = _interopRequireWildcard(require("react"));
require("./datatable.scss");
var _Pagination = _interopRequireDefault(require("../Pagination/Pagination"));
var _fa = require("react-icons/fa");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This component represents a data table.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.columnTitle - The array of column titles for the table.
 * @param {Array} props.datas - The array of data objects to display in the table.
 * @returns {JSX.Element} - The data table component.
 */
function Datatable(_ref) {
  let {
    columnTitle,
    datas
  } = _ref;
  const [currentPage, setCurrentPage] = (0, _react.useState)(1);
  const [entriesPerPage, setEntriesPerPage] = (0, _react.useState)(10);
  const [clickCount, setClickCount] = (0, _react.useState)(0);
  const [clickedColumnIndex, setClickedColumnIndex] = (0, _react.useState)(null);
  const [indexColumn, setIndexColumn] = (0, _react.useState)(null);
  const [dataList, setDataList] = (0, _react.useState)(datas);
  const [searchTerm, setSearchTerm] = (0, _react.useState)("");
  const [indexOfLastEntry, setIndexOfLastEntry] = (0, _react.useState)(10);
  const [indexOfFirstEntry, setIndexOfFirstEntry] = (0, _react.useState)(0);
  const getRowClass = index => index % 2 === 0 ? "even-row" : "odd-row";
  const columnName = ["firstname", "lastname", "startDate", "department", "dateOfBirth", "street", "city", "state", "code"];
  (0, _react.useEffect)(() => {
    let newResults = [...datas];
    if (searchTerm) {
      newResults = newResults.filter(data => {
        return Object.values(data).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
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
            newResults.sort((a, b) => a[column] < b[column] ? -1 : 1);
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
            newResults.sort((a, b) => a[column] > b[column] ? -1 : 1);
          }
          break;
        default:
          break;
      }
    }
    setDataList(newResults);
  }, [searchTerm, indexColumn, clickCount, currentPage, entriesPerPage]);
  (0, _react.useEffect)(() => {
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = (currentPage - 1) * entriesPerPage;
    setIndexOfLastEntry(indexOfLastEntry);
    setIndexOfFirstEntry(indexOfFirstEntry);
  }, [currentPage, entriesPerPage]);

  /**
   *  Displays the page change.
   * @param {String} pageNumber the number page selected
   */
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  /**
   * Displays the number of rows in the datatable based on the number of selected entries.
   * @param {Event} e 
   */
  const handleClickSelect = e => {
    const value = e.target.value;
    setEntriesPerPage(parseInt(value));
    setCurrentPage(1);
  };

  /**
   *  Displays the corresponding icon based on the number of clicks.
   * @param {String} index 
   */
  const handleClickIcon = index => {
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
  const handleChange = e => {
    const {
      value
    } = e.target;
    setSearchTerm(value);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "datatable-title"
  }, "Current Employee"), /*#__PURE__*/_react.default.createElement("div", {
    className: "datatable-features"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "datatable-sort"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Show", /*#__PURE__*/_react.default.createElement("select", {
    onChange: handleClickSelect
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "10"
  }, "10"), /*#__PURE__*/_react.default.createElement("option", {
    value: "25"
  }, "25"), /*#__PURE__*/_react.default.createElement("option", {
    value: "50"
  }, "50"), /*#__PURE__*/_react.default.createElement("option", {
    value: "100"
  }, "100")), "entries")), /*#__PURE__*/_react.default.createElement("div", {
    className: "datatable-search"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "search"
  }, "Search :"), /*#__PURE__*/_react.default.createElement("input", {
    id: "search",
    type: "text",
    value: searchTerm,
    onChange: handleChange,
    placeholder: "Search by keywords..."
  }))), /*#__PURE__*/_react.default.createElement("table", {
    className: "table"
  }, /*#__PURE__*/_react.default.createElement("thead", {
    className: "table-head"
  }, /*#__PURE__*/_react.default.createElement("tr", {
    className: "table-head-row"
  }, columnTitle.map((elt, index) => {
    let iconElement;
    if (index !== clickedColumnIndex || clickCount === 0) {
      iconElement = /*#__PURE__*/_react.default.createElement(_fa.FaSort, {
        id: index,
        style: {
          color: "#e1e2e5"
        }
      });
    } else if (clickCount === 1) {
      iconElement = /*#__PURE__*/_react.default.createElement(_fa.FaSortUp, {
        id: index,
        style: {
          color: "##888EE0"
        }
      });
    } else if (clickCount === 2) {
      iconElement = /*#__PURE__*/_react.default.createElement(_fa.FaSortDown, {
        id: index,
        style: {
          color: "#888EE0"
        }
      });
    }
    return /*#__PURE__*/_react.default.createElement("th", {
      className: "table-head-row-title",
      key: "".concat(index, "-").concat(elt)
    }, elt, /*#__PURE__*/_react.default.createElement("span", {
      className: "table-icon",
      id: index,
      value: elt,
      onClick: () => handleClickIcon(index),
      "aria-hidden": true
    }, iconElement));
  }))), /*#__PURE__*/_react.default.createElement("tbody", {
    className: "table-body"
  }, dataList === null || dataList === void 0 ? void 0 : dataList.filter((_, index) => index >= indexOfFirstEntry && index < indexOfLastEntry).map((data, index) => /*#__PURE__*/_react.default.createElement("tr", {
    key: "data-".concat(index),
    className: getRowClass(index)
  }, /*#__PURE__*/_react.default.createElement("td", null, data.firstname), /*#__PURE__*/_react.default.createElement("td", null, data.lastname), /*#__PURE__*/_react.default.createElement("td", null, data.startDate), /*#__PURE__*/_react.default.createElement("td", null, data.department), /*#__PURE__*/_react.default.createElement("td", null, data.dateOfBirth), /*#__PURE__*/_react.default.createElement("td", null, data.street), /*#__PURE__*/_react.default.createElement("td", null, data.city), /*#__PURE__*/_react.default.createElement("td", null, data.state), /*#__PURE__*/_react.default.createElement("td", null, data.code))))), /*#__PURE__*/_react.default.createElement(_Pagination.default, {
    entriesPerPage: entriesPerPage,
    totalEntries: dataList.length,
    paginate: handlePageChange,
    start: indexOfFirstEntry,
    end: indexOfLastEntry,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage
  }));
}
var _default = Datatable;
exports.default = _default;
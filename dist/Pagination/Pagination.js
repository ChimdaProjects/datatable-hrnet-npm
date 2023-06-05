"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./pagination.scss");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Pagination(props) {
  const {
    entriesPerPage,
    totalEntries,
    paginate,
    start,
    end,
    currentPage,
    setCurrentPage
  } = props;
  const numberPages = Math.ceil(totalEntries / entriesPerPage);
  const distanceFromStart = currentPage - 1;
  const distanceFromEnd = numberPages - currentPage;
  let pages = [];
  const startingPage = distanceFromStart >= 4 ? currentPage - 1 : 2;
  const endingPage = distanceFromEnd >= 4 ? currentPage + 1 : numberPages - 1;
  (0, _react.useEffect)(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [currentPage]);
  const range = function range(from, to) {
    let step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    let i = from;
    const numberpages = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return numberpages;
  };
  if (currentPage <= 4) {
    const rangePages = range(startingPage, numberPages > 4 ? numberPages : numberPages - 1);
    pages = rangePages.slice(0, 4);
  } else if (currentPage >= 5 && currentPage < numberPages - 3) {
    const rangePages = range(startingPage, endingPage);
    pages = rangePages;
  } else if (currentPage >= numberPages - 4) {
    const rangePages = range(numberPages - 4, numberPages - 1);
    pages = rangePages;
  }
  const entryEnd = numberPages === currentPage ? totalEntries : end;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination-details"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "pagination-details-content"
  }, "Showing ", start + 1, " to ", entryEnd, " of ", totalEntries, " entries")), /*#__PURE__*/_react.default.createElement("nav", {
    className: "pagination-nav"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "pagination-list"
  }, /*#__PURE__*/_react.default.createElement("li", {
    className: "pagination-list-item"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "pagination-list-item-btn prev",
    disabled: currentPage === 1 ? true : false,
    onClick: () => currentPage > 1 ? setCurrentPage(currentPage - 1) : ""
  }, "Previous")), numberPages > 1 && /*#__PURE__*/_react.default.createElement("li", {
    className: "pagination-list-item"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: () => paginate(1),
    className: currentPage === 1 ? "pagination-list-item-btn pagination-active" : "pagination-list-item-btn"
  }, "1")), currentPage >= 5 && /*#__PURE__*/_react.default.createElement("li", {
    className: "pagination-list-item"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "pagination-list-item-dots"
  }, "...")), pages.map(number => /*#__PURE__*/_react.default.createElement("li", {
    key: number,
    className: "pagination-list-item"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: () => paginate(number),
    className: currentPage === number ? "pagination-list-item-btn pagination-active" : "pagination-list-item-btn"
  }, number))), currentPage < numberPages - 3 && /*#__PURE__*/_react.default.createElement("li", {
    className: "pagination-list-item"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "pagination-list-item-dots"
  }, "...")), /*#__PURE__*/_react.default.createElement("li", {
    className: "pagination-list-item"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: () => paginate(numberPages),
    className: currentPage === numberPages ? "pagination-list-item-btn pagination-active" : "pagination-list-item-btn"
  }, numberPages)), /*#__PURE__*/_react.default.createElement("li", {
    className: "pagination-list-item"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "pagination-list-item-btn next ",
    disabled: currentPage === numberPages ? true : false,
    onClick: () => currentPage === numberPages.length ? "" : setCurrentPage(currentPage + 1)
  }, "Next")))));
}
var _default = Pagination;
exports.default = _default;
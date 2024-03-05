import React, { useState } from "react";
import { SearchResult } from './SearchResult.jsx';
import "./SearchResultsList.css";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export const SearchResultsList = ({ results }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueResults = results.reduce((accumulator, result) => {
    if (!accumulator[result.Lot_id]) {
      accumulator[result.Lot_id] = true;
      accumulator.uniqueResults.push(result);
    }
    return accumulator;
  }, { uniqueResults: [] });

  const totalPages = Math.ceil(uniqueResults.uniqueResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = uniqueResults.uniqueResults.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log("uniqueResults.length:", uniqueResults.uniqueResults.length);
  console.log("itemsPerPage:", itemsPerPage);

  return (
    <div className="results-list">
      {uniqueResults.uniqueResults.length === 0 && (
        <div style={{display: 'flex', height: '100%', fontSize: '50px',fontFamily:'Arial Black', justifyContent: "center", alignItems: "center", color:  '#ffffff', textShadow: '4px 4px 12px #d9d9d9, -4px -4px 12px #ffffff', cursor:'default', animation: 'appear 3s forwards'}}>
          Search Lot ID
        </div>
      )}

      {currentResults.map((result, id) => (
        <SearchResult result={result} key={id} />
      ))}
      {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ArrowCircleLeftIcon 
                  style={{ fontSize: '30px', justifyContent: "center", color: currentPage === 1 ? "disabled" : "inherit" }}
                />
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ArrowCircleRightIcon 
                  style={{ fontSize: '30px', justifyContent: "center", color: currentPage === totalPages ? "disabled" : "inherit" }}
                />
              </button>
            </div>
          )}
    </div>
  );
};
